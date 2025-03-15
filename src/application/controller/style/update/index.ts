import { styleFindParams } from '@data/search';
import { updateStyleSchema } from '@data/validation';
import { Role } from '@domain/enum';
import type { Controller } from '@domain/protocols';
import { ColorEntity } from '@entity/color';
import { StyleEntity } from '@entity/style';
import { messages } from '@i18n/index';
import { DataSource } from '@infra/database';
import { errorLogger, forbidden, messageErrorResponse, notFound, ok, toNumber } from '@main/utils';
import type { Request, Response } from 'express';

interface Body {
  name: string;
  color: {
    primary: string;
    textPrimary: string;
    secondary: string;
    textSecondary: string;
    text: string;
    background: string;
  };
}

/**
 * @typedef {object} UpdateColorBody
 * @property {string} primary.required
 * @property {string} textPrimary.required
 * @property {string} secondary.required
 * @property {string} textSecondary.required
 * @property {string} background.required
 * @property {string} text.required
 */

/**
 * @typedef {object} UpdateStyleBody
 * @property {string} name.required
 * @property {UpdateColorBody} color.required
 */

/**
 * PUT /style/{id}
 * @summary Update Style
 * @tags Style
 * @security BearerAuth
 * @param {UpdateStyleBody} request.body
 * @param {integer} id.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const updateStyleController: Controller =
  () =>
  async ({ lang, user, ...request }: Request, response: Response) => {
    let err = 0;

    try {
      await updateStyleSchema.validate(request, { abortEarly: false });

      const {
        name,
        color: { background, primary, secondary, text, textPrimary, textSecondary }
      } = request.body as Body;

      await DataSource.transaction(async (manager) => {
        const style = await manager.findOne(StyleEntity, {
          select: { ...styleFindParams, companyId: true },
          where: { id: toNumber(request.params.id) }
        });

        if (!style) {
          err = 1;
          throw new Error();
        }

        if (style.companyId !== user.company.id && user.role !== Role.ADMIN) {
          err = 2;
          throw new Error();
        }

        style.name = name;

        await manager.update(
          ColorEntity,
          { id: style.color.id },
          {
            background,
            primary,
            secondary,
            text,
            textPrimary,
            textSecondary
          }
        );

        await manager.save(style);
      });

      return ok({ payload: messages[lang].default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      if (err === 1) return notFound({ entity: messages[lang].entity.style, lang, response });

      if (err === 2) return forbidden({ lang, response });

      return messageErrorResponse({ error, lang, response });
    }
  };

import { insertStyleSchema } from '@data/validation';
import { Role } from '@domain/enum';
import type { Controller } from '@domain/protocols';
import { ColorEntity } from '@entity/color';
import { StyleEntity } from '@entity/style';
import { DataSource } from '@infra/database';
import { created, errorLogger, messageErrorResponse } from '@main/utils';
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
 * @typedef {object} InsertColorBody
 * @property {string} primary.required
 * @property {string} textPrimary.required
 * @property {string} secondary.required
 * @property {string} textSecondary.required
 * @property {string} background.required
 * @property {string} text.required
 */

/**
 * @typedef {object} InsertStyleBody
 * @property {string} name.required
 * @property {InsertColorBody} color.required
 */

/**
 * POST /style
 * @summary Insert Style
 * @tags Style
 * @security BearerAuth
 * @param {InsertStyleBody} request.body.required - application/json
 * @return {CreatedResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertStyleController: Controller =
  () =>
  async ({ lang, user, ...request }: Request, response: Response) => {
    try {
      await insertStyleSchema.validate(request, { abortEarly: false });

      const {
        name,
        color: { background, primary, secondary, text, textPrimary, textSecondary }
      } = request.body as Body;

      await DataSource.transaction(async (manager) => {
        const color = manager.create(ColorEntity, {
          background,
          primary,
          secondary,
          text,
          textPrimary,
          textSecondary
        });

        await manager.save(color);

        const style = manager.create(StyleEntity, {
          name,
          color,
          company: { id: user.company.id },
          generic: user.role === Role.ADMIN
        });

        await manager.save(style);
      });

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };

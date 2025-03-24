import { finishedAt } from '@application/helper';
import { addressFindParams, clientFindParams, orderFindParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { errorLogger, messageErrorResponse, notFound, ok } from '@main/utils';
import { clientRepository } from '@repository/client';
import { orderRepository } from '@repository/order';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindMeClientResponse
 * @property {string} message
 * @property {string} status
 * @property {Client} payload
 */

/**
 * GET /client
 * @summary Find Client Logged
 * @tags Client
 * @security BearerAuth
 * @param {integer} id.path.required
 * @return {FindOneClientResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {NotFoundRequest} 404 - Not found response - application/json
 */
export const findMeClientController: Controller =
  () =>
  async ({ lang, client }: Request, response: Response) => {
    try {
      const data = await clientRepository.findOne({
        select: {
          ...clientFindParams,
          clientAddressList: { id: true, address: addressFindParams }
        },
        relations: { clientAddressList: { address: true } },
        where: { id: client.id, finishedAt }
      });

      if (data === null) return notFound({ entity: messages[lang].entity.table, lang, response });

      const { clientAddressList, ...rest } = data;

      const orderList = await orderRepository.find({
        select: orderFindParams,
        where: { finishedAt, clientId: client.id },
        take: 5,
        order: { id: 'ASC' }
      });

      return ok({
        payload: {
          ...rest,
          addressList: clientAddressList?.map((item) => item.address) ?? [],
          orderList
        },
        lang,
        response
      });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };

import { finishedAt } from '@application/helper';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { errorLogger, messageErrorResponse, notFound, ok, toNumber } from '@main/utils';
import { addressRepository } from '@repository/address';
import { clientAddressRepository } from '@repository/client-address';
import type { Request, Response } from 'express';

/**
 * DELETE /client/address/{id}
 * @summary Delete Client Address
 * @tags Client Address
 * @security BearerAuth
 * @param {integer} id.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const deleteClientAddressController: Controller =
  () =>
  async ({ lang, client, ...request }: Request, response: Response) => {
    try {
      const clientAddress = await clientAddressRepository.findOne({
        select: { id: true, addressId: true },
        where: { finishedAt, addressId: toNumber(request.params.id), clientId: client.id }
      });

      if (!clientAddress)
        return notFound({ lang, entity: messages[lang].entity.address, response });

      await addressRepository.delete({ id: clientAddress.addressId });

      return ok({ payload: messages[lang].default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };

import {
  deleteClientAddressController,
  insertClientAddressController,
  updateClientAddressController
} from '@application/controller/address/client';
import {
  deleteClientController,
  findMeClientController,
  updateClientController
} from '@application/controller/client';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('/', findMeClientController());
  router.put('/', updateClientController());
  router.delete('/', deleteClientController());

  router.post('/address', insertClientAddressController());
  router.put('/address/:id', updateClientAddressController());
  router.delete('/address/:id', deleteClientAddressController());

  inputRouter.use('/', router);
};

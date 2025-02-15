import {
  findOneRegisterRequestController,
  insertRegisterRequestController
} from '@application/controller/register-request';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/', insertRegisterRequestController());
  router.get('/:code', findOneRegisterRequestController());

  inputRouter.use('/register-request', router);
};

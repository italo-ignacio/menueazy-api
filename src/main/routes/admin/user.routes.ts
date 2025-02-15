import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  inputRouter.use('/', router);
};

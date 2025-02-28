import {
  deleteStyleController,
  insertStyleController,
  updateStyleController
} from '@application/controller/style';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/', insertStyleController());
  router.put('/:id', updateStyleController());
  router.delete('/:id', deleteStyleController());

  inputRouter.use('/style', router);
};

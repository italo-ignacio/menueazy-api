import {
  deleteStyleController,
  findOneStyleController,
  findStyleController,
  insertStyleController,
  updateStyleColorController,
  updateStyleController
} from '@application/controller/style';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('/', findStyleController());
  router.get('/:id', findOneStyleController());
  router.post('/', insertStyleController());
  router.delete('/', deleteStyleController());
  router.put('/:id', updateStyleController());
  router.put('/color/:id', updateStyleColorController());

  inputRouter.use('/style', router);
};

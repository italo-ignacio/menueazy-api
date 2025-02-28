import {
  deleteTableController,
  insertTableController,
  updateTableController
} from '@application/controller/table';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/', insertTableController());
  router.put('/:id', updateTableController());
  router.delete('/:id', deleteTableController());

  inputRouter.use('/restaurant/:restaurantId/table', router);
};

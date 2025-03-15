import {
  deleteProductImageController,
  insertProductImageController,
  updateProductImageController
} from '@application/controller/product-image';
import { handleMulterError, insertImage, uploadFilesMiddleware } from '@main/utils';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post(
    '/:productId/image',
    uploadFilesMiddleware,
    handleMulterError,
    insertImage(),
    insertProductImageController()
  );
  router.put('/:productId/image/:id', updateProductImageController());
  router.delete('/:productId/image/:id', deleteProductImageController());

  inputRouter.use('/restaurant/:restaurantId/product', router);
};

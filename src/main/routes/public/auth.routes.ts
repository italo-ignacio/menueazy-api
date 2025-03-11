import { userLoginController } from '@application/controller/auth';
import { env } from '@main/config';
import { hash } from 'bcrypt';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/generate-password', async (req, res) => {
    const password = await hash(req?.body?.password ?? '', env.HASH_SALT);

    res.json({ password });
  });

  // User Login
  router.post('/user/login', userLoginController());

  inputRouter.use('/auth', router);
};

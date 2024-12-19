import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import * as userSchema from '../validation/auth.js';
import * as userController from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.post(
  '/register',
  validateBody(userSchema.registerUserSchema),
  ctrlWrapper(userController.registerUserController),
);
router.post(
  '/login',
  validateBody(userSchema.loginUserSchema),
  ctrlWrapper(userController.loginUserController),
);
router.post('/logout', ctrlWrapper(userController.logoutUserController));
router.post(
  '/refresh',
  ctrlWrapper(userController.refreshUserSessionController),
);

export default router;

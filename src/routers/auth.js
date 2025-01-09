import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import * as userSchema from '../validation/auth.js';
import * as userController from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { getGoogleOAuthUrlController } from '../controllers/auth.js';

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
router.post(
  '/send-reset-email',
  validateBody(userSchema.requestResetEmailSchema),
  ctrlWrapper(userController.requestResetEmailController),
);
router.post(
  '/reset-pwd',
  validateBody(userSchema.resetPasswordSchema),
  ctrlWrapper(userController.resetPasswordController),
);
router.post(
  '/confirm-oauth',
  validateBody(userSchema.loginWithGoogleOAuthSchema),
  ctrlWrapper(userController.loginWithGoogleController),
);
router.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

export default router;

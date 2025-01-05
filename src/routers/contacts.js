import { Router } from 'express';
import * as contactController from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../validation/isValidId.js';
import * as contactValidator from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(contactController.getAllContactsController));
router.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactController.getContactByIdController),
);
router.post(
  '/',
  upload.single('photo'),
  validateBody(contactValidator.createContactSchema),
  ctrlWrapper(contactController.createContactController),
);
router.put(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(contactValidator.createContactSchema),
  ctrlWrapper(contactController.upsertContactController),
);
router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(contactValidator.updateContactSchema),
  ctrlWrapper(contactController.patchContactController),
);
router.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactController.deleteContactController),
);

export default router;

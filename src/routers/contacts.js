import { Router } from 'express';
import * as contactController from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../validation/isValidId.js';
import * as contactValidator from '../validation/contacts.js';

const router = Router();

router.get('/', ctrlWrapper(contactController.getAllContactsController));
router.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactController.getContactByIdController),
);
router.post(
  '/',
  validateBody(contactValidator.createContactSchema),
  ctrlWrapper(contactController.createContactController),
);
router.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactController.deleteContactController),
);
router.put(
  '/:contactId',
  isValidId,
  validateBody(contactValidator.createContactSchema),
  ctrlWrapper(contactController.upsertContactController),
);
router.patch(
  '/:contactId',
  isValidId,
  validateBody(contactValidator.updateContactSchema),
  ctrlWrapper(contactController.patchContactController),
);


export default router;

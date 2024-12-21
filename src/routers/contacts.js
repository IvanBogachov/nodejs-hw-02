import { Router } from 'express';
import * as contactController from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../validation/isValidId.js';
import * as contactValidator from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
// import { checkRoles } from '../middlewares/checkRoles.js';
// import { ROLES } from '../constants/index.js';

const router = Router();

router.use(authenticate);

router.get(
  '/',
  // checkRoles(ROLES.TEACHER),
  ctrlWrapper(contactController.getAllContactsController),
);
router.get(
  '/:contactId',
  // checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  ctrlWrapper(contactController.getContactByIdController),
);
router.post(
  '/',
  // checkRoles(ROLES.TEACHER),
  validateBody(contactValidator.createContactSchema),
  ctrlWrapper(contactController.createContactController),
);
router.delete(
  '/:contactId',
  // checkRoles(ROLES.TEACHER),
  isValidId,
  ctrlWrapper(contactController.deleteContactController),
);
router.put(
  '/:contactId',
  // checkRoles(ROLES.TEACHER),
  isValidId,
  validateBody(contactValidator.createContactSchema),
  ctrlWrapper(contactController.upsertContactController),
);
router.patch(
  '/:contactId',
  // checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  validateBody(contactValidator.updateContactSchema),
  ctrlWrapper(contactController.patchContactController),
);

export default router;

import { model, Schema } from 'mongoose';
import { typeList } from '../constants.js';
import { handleSaveError, setUpdateSettings } from '../db/models/hooks.js';


const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      required: true,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: typeList,
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
contactsSchema.post("save", handleSaveError);
contactsSchema.pre("findOneAndUpdate", setUpdateSettings);
contactsSchema.post("findOneAndUpdate", handleSaveError);

export const ContactsCollection = model('contacts', contactsSchema);

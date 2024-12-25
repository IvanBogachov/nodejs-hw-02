import { model, Schema } from 'mongoose';
import { handleSaveError, setUpdateSettings } from '../../db/models/hooks.js';
import { emailRegexp } from '../../constants/index.js';

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: emailRegexp },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

usersSchema.post('save', handleSaveError);
usersSchema.pre('findOneAndUpdate', setUpdateSettings);
usersSchema.post('findOneAndUpdate', handleSaveError);

export const UsersCollection = model('users', usersSchema);

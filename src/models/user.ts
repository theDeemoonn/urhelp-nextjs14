import mongoose, { Model, Schema } from 'mongoose';

interface IUser {

	email: string
	password: string
	surname: string
	name: string
	age: string
	phone: string
	description: string
	avatar: string
	banned: boolean
	banReason: string

	
	role: string
}

interface IUserModel extends Model<IUser>, IUser {}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
    },
    age: {
      type: String,
    },
    phone: {
      type: String,
    },
    description: {
      type: String,
    },
    avatar: {
      type: String,
    },
    banned: {
      type: Boolean,
      default: false,
    },
    banReason: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUserModel>('User', userSchema);
export default User;

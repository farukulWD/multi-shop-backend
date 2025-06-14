import mongoose, { Schema } from "mongoose";
import { IUser, IUserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const ShopSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const userSchema = new Schema<IUser, IUserModel>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  shops: [ShopSchema],
});

// Pre-save hook to hash password before saving
userSchema.pre("save", async function (next) {

  const user = this as IUser;
  console.log(user)
  user.password = await bcrypt.hash(
    user.password,
    Number(config.BYCRIPT_SALT_ROUNDS)
  );

  next();
});

// Static method to password match
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// static method to hash password before saving
userSchema.statics.hashPassword = async function (password: string) {
  if (!password) {
    throw new Error("Password is required to hash.");
  }
  return await bcrypt.hash(password, Number(config.BYCRIPT_SALT_ROUNDS));
};

// static method to find user by username

export const User = mongoose.model<IUser, IUserModel>("User", userSchema);

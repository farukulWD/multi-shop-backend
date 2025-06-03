import { Model } from "mongoose";

export interface IUser {
  _id?: string;
  username: string;
  password: string;
  shops: string[];
}

export interface IUserModel extends Model<IUser> {


  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;


  hashPassword(plainTextPassword: string): Promise<string>;
}
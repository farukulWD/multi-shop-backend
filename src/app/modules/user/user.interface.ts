import { Model } from "mongoose";

export interface IUser {
  username: string;
  password: string;
  shops: string[];
}

export interface IUserModel extends Model<IUser> {
  userFindByUserName(username: string): Promise<IUser | null>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;


  hashPassword(plainTextPassword: string): Promise<string>;
}
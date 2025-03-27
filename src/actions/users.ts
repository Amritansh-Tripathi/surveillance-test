// filepath: /my-mongoose-app/actions/users.ts
import mongoose from "mongoose";
import { UserProps } from "@/types";
import User from "@/models/User"; // Import the User model

export async function createBulkUsers(users: UserProps[]) {
  try {
    await User.insertMany(users);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUsers() {
  try {
    await User.deleteMany({});
  } catch (error) {
    console.log(error);
  }
}

export async function getUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.log(error);
  }
}
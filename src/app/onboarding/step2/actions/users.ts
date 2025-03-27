import User from "@/models/User";
import { UserProps } from "@/types";

export async function createUser(data: UserProps) {
  try {
    const user = new User({
      name: data.name,
      age: data.age,
      profilePic: data.profilePic, // Save profilePic
    });
    await user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function createBulkUsers(users: UserProps[]) {
  try {
    await User.insertMany(users);
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

export async function deleteUsers() {
  try {
    await User.deleteMany({});
  } catch (error) {
    console.log(error);
  }
}

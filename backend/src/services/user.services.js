import userModel from "../models/user.model.js";



export async function createUser(firstname, lastname, email, password) {
  if (!firstname || !lastname || email || password) {
    throw new Error('All field are required');
  };

  //Creating/adding new user to user model
  const user = await userModel.create({
    fullname: {
      firstname,
      lastname,
      email,
      password
    }
  });
};
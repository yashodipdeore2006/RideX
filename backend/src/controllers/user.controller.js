import { validationResult } from 'express-validator';


import userModel from '../models/user.model.js';
import { hash } from 'bcrypt';


//================== Controllers =====================

export async function registerUser(req, res) {
  try {
    //Check if their is error in req validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    };

    //Input from user
    const { fullname, email, password } = req.body;

    //Find user if exists
    const isUserAlreadyExists = await userModel.findOne({ email: email });

    //Error is user already exists
    if (isUserAlreadyExists) {
      return res.status(400).json({
        errors: 'User already exists'
      });
    };

    //Hashing the password
    const hashedPassword = await userModel.hashedPassword(password);

    //Creating new user using create user service
    const user = await createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email: email,
      password: hashedPassword
    });


    //Generating user's token
    const token = userModel.generateAuthToken();


    re.status(200).json({
      user,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(
      {
        error: 'Something went wrong'
      }
    )
  }
}
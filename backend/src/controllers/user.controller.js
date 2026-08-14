import { validationResult } from 'express-validator';
import { hash } from 'bcrypt';

//=== Local Modules ====
import userModel from '../models/user.model.js';
import { createUser } from '../services/user.services.js';

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
    const hashedPassword = await hash(password, 10);


    //Creating new user using create user service
    const user = await userModel.create({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname
      },
      email,
      password
    });


    //Generating user's token
    const token = user.generateAuthToken();


    res.status(200).json({
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



export async function loginUser(req, res) {
  try {

    //Check there is any error in "loginUser" validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        errors: errors.array()
      });
    };

    const { email, password } = req.body;

    //Find user in userModel
    const user = await userModel.findOne({ email: email }).select('+password');

    //Error is user does not exists
    if (!user) {
      return res.status(400).json(
        {
          error: 'User does not exists'
        }
      );
    };

    //Comparing entered password with stored one
    const isMatched = await user.comparePassword(password);

    //Error is password wrong 
    if (!isMatched) {
      return res.status(
        {
          error: 'Invalid credentials'
        }
      );
    };


    //Generating the token
    const token = user.generateAuthToken();

    //Set cookie
    res.cookie("token", token);

    res.status(200).json(
      {
        user,
        token
      }
    );

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Something went wrong'
    });
  };
};

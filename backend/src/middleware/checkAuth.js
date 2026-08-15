import jwt from 'jsonwebtoken';

//=== Local Modules ===
import userModel from "../models/user.model.js";
import captainModel from '../models/captain.model.js';


export default async function checkAuth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(404).json({
        error: 'Unauthorized user'
      });
    };

    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    const user = await userModel.findById(decoded._id).select('-password');

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    };


    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Something went wrong'
    });
  };
};


export async function checkAuthCaptain(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(404).json({
        error: 'Unauthorized Captain/user'
      });
    };

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const captain = await captainModel.findById(decoded._id).select('-password');

    if (!captain) {
      return res.status(404).json({
        error: 'User not found'
      });
    };

    req.captain = captain;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Something went wrong'
    })
  };
};
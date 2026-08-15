import { validationResult } from "express-validator";

//=== Local Module ===
import captainModel from "../models/captain.model.js";
import { createCaptain } from "../services/captain.services.js";



export async function registerCaptain(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    };

    const { fullname, email, password, socketId, vehicles, location } = req.body;

    const isCaptainAlreadyExists = await captainModel.findOne({ email: email });

    if (isCaptainAlreadyExists) {
      return res.status(400).json({
        error: "User already exists"
      });
    };


    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await createCaptain(fullname.firstname, fullname.lastname, email, hashedPassword, socketId, vehicles.color, vehicles.plate, vehicles.capacity, vehicles.vehicleType, location.ltd, location.lng)

    const token = captain.generateAuthToken();

    res.status(200).json({
      message: "Captain registered successfully",
      captain,
      token
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong"
    });
  };
};


export async function loginCaptain(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    };

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email: email }).select('+password');

    if (!captain) {
      return res.status(404).json(
        {
          error: 'Captain/user not found'
        }
      );
    };

    const isMatched = await captain.comparePassword(password);

    if (!isMatched) {
      return res.status({
        error: 'Invalid credentials'
      });
    };


    const token = await captain.generateAuthToken();


    res.cookie('token', token);

    res.status(200).json({
      message: `Hii, 🚕${captain.fullname.firstname}`,
      captain,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Something went wrong'
    });
  };
};


export async function logoutCaptain(req, res) {
  try {
    res.clearCookie('token');
    res.status(200).json({
      message: 'Logout successful'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Something went wrong'
    });
  };
}



export async function profilerCaptain(req, res) {
  try {
    const captain = req.captain;

    res.status(200).json({
      message: 'Profile found successfully',
      captain
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something went wrong'
    });
  };
};
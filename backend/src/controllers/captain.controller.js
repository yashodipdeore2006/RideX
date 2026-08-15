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
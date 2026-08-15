import { body } from "express-validator";

export const captainRegisterValidator = [
  body("fullname.firstname")
    .trim()
    .notEmpty()
    .withMessage("Firstname is required")
    .isLength({ min: 2 })
    .withMessage("Firstname should be at least 2 characters long"),

  body("fullname.lastname")
    .trim()
    .notEmpty()
    .withMessage("Lastname is required")
    .isLength({ min: 3 })
    .withMessage("Lastname should be at least 3 characters long"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("vehicles.color")
    .trim()
    .notEmpty()
    .withMessage("Vehicle color is required")
    .isLength({ min: 3 })
    .withMessage("Color should be at least 3 characters long"),

  body("vehicles.plate")
    .trim()
    .notEmpty()
    .withMessage("Vehicle plate is required")
    .isLength({ min: 3 })
    .withMessage("Plate should be at least 3 characters long"),

  body("vehicles.capacity")
    .notEmpty()
    .withMessage("Vehicle capacity is required")
    .isInt({ min: 1 })
    .withMessage("Capacity must be at least 1"),

  body("vehicles.vehicleType")
    .notEmpty()
    .withMessage("Vehicle type is required")
    .isIn(["bike", "scooter", "auto", "car"])
    .withMessage("Invalid vehicle type")
];
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minLength: [2, 'Firstname should be at least 2 characters long']
    },
    lastname: {
      type: String,
      minLength: [3, 'Lastname should be at least 3 characters long']
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minLength: [5, 'Email should be at least 5 characters long'],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    select: false,
    minLength: [6, 'Password must be at least 6 characters long']
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive',
  },
  vehicles: {
    color: {
      type: String,
      required: true,
      minLength: [3, 'Color should be atleast 3 characters long']
    },
    plate: {
      type: String,
      required: true,
      minLength: [3, 'Plate should be atleast 3 characters long']
    },
    capacity: {
      type: Number,
      required: true,
      minLength: [1, 'capacity should be atleast 1']
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ['bike', 'scooter', 'auto', 'car']
    },
  },
  location: {
    ltd: {
      type: Number
    },
    lng: {
      type: Number
    }
  }
});


//========== Methods ==============

captainSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '24h'
    }
  );

  return token;
};

captainSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};


captainSchema.methods.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
}


const captainModel = mongoose.model('captainModel', captainModel);

export default captainModel;
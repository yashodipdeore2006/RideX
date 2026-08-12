import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minLength: [2, 'First name should be at least 2 characters long'],
    },
    lastname: {
      type: String,
      minLength: [3, 'Last name should be at least 3 characters long']
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, 'Email should be at least 5 characters long'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  }
});


//Generates token for the specif user.
// Ex: const user1 = userModel.findByID(1); 
//     user1.generateAuthToken();

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h"
    }
  );
  return token;
};


userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}


userSchema.method.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
}


const userModel = mongoose.model('UserModel', userSchema);

export default userModel;

import captainModel from "../models/captain.model.js";



export async function createCaptain(firstname, lastname, email, password, color, plate, capacity, vehicleType) {
  if (
    !firstname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }

  const captain = await captainModel.create({
    fullname: {
      firstname: firstname,
      lastname: lastname ?? null
    },
    email: email,
    password: password,
    vehicles: {
      color: color,
      plate: plate,
      capacity: capacity,
      vehicleType: vehicleType,
    },
  });

  return captain;
}; 
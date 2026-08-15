import captainModel from "../models/captain.model.js";



export async function createCaptain(firstname, lastname, email, password, socketId, color, plate, capacity, vehicleType, ltd, lng) {
  if (
    !firstname ||
    !email ||
    !password ||
    !socketId ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType ||
    ltd === undefined ||
    lng === undefined
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
    socketId: socketId,
    status: 'active',
    vehicles: {
      color: color,
      plate: plate,
      capacity: capacity,
      vehicleType: vehicleType,
    },

    location: {
      ltd: ltd,
      lng: lng
    }
  });

  return captain;
}; 
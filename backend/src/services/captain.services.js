import captainModel from "../models/captain.model.js";



export async function createCaptain(firstname, lastname, email, password, socketId, status, color, plate, capacity, vehicleType, ltd, lng) {
  if (!firstname || !lastname || !email || !password || !socketId || !status || !color || !plate || !capacity || !vehicleType || !ltd || !lng
  ) {
    throw new Error('All fields are required');
  };

  const captain = await captainModel.create({
    fullname: {
      firstname: firstname,
      lastname: lastname
    },
    email: email,
    password: password,
    socketId: socketId,
    status: status,
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
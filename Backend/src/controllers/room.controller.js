import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponses } from '../utils/ApiResponses.js';
import { ApiError } from '../utils/ApiError.js';
import { Room } from '../models/room.model.js';
import { Property } from '../models/property.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';



const addNewRoom = asyncHandler(async (req, res) => { 
  console.log("entered in add new room controller")
    const {
        roomNumber,
        roomType,
        tenantType,
        floor,
        rentAmount,
        maxOccupancy,
        currentOccupants,
        isFurnitured,
        hasAttachedBath,
        description,
        propertyId
    } = req.body;

    if (!roomNumber || !roomType || !tenantType || !floor || !rentAmount) {
        throw new ApiError(400, "Required fields are missing");
    }

    if (!req.files || !req.files.roomImages || req.files.roomImages.length === 0) {
        throw new ApiError(400, "At least one image is required. Please upload valid image files.");
    }

    const existedRoom = await Room.findOne({
        propertyId,
        roomNumber: roomNumber
    });

    if (existedRoom) {
        throw new ApiError(409, "Room with this number already exists in the property");
    }

    const roomImages = [];
    for (const file of req.files.roomImages) {
        const result = await uploadOnCloudinary(file.path);
        if (result?.url) {
            roomImages.push(result.url);
        }
    }

    if (roomImages.length === 0) {
        throw new ApiError(500, "Failed to upload room images");
    }

    const room = await Room.create({
        property_id: propertyId,
        roomNumber,
        roomType,
        tenantType,
        floor,
        rentAmount,
        maxOccupancy,
        currentOccupants,
        isFurnitured,
        hasAttachedBath,
        roomImages,
        description,
        isOccupied: false
    });

    if (!room) {
        throw new ApiError(500, "Failed to create room");
    }

    return res.status(201).json(
        new ApiResponses(201, room, "Room created successfully")
    );
});


const getRoomsByProperty = asyncHandler(async (req, res) => {
  const propertyId = req.params.id;

  if (!propertyId) {
      throw new ApiError(400, "Property ID is required");
  }

  const rooms = await Room.find({ property_id: propertyId });

  if (!rooms || rooms.length === 0) {
      throw new ApiError(404, "No rooms found for this property");
  }

  return res.status(200).json(
      new ApiResponses(200, rooms, "Rooms retrieved successfully")
  );
});


const getRooms = asyncHandler(async (req, res, next) => {
  
  const rooms = await Property.aggregate([
    {
      $lookup: {
        from: "rooms", // collection name in MongoDB (lowercase + plural by default)
        localField: "_id",     // property _id
        foreignField: "propertyId", // matches Room.propertyId
        as: "rooms"            // output array field
      }
    },
    {
      $project: {
        title: 1,
        city: 1,
        propertyType: 1,
        rooms: {
          roomNumber: 1,
          rent: 1,
          isOccupied: 1
        }
      }
    }
  ]);

  if (!rooms || rooms.length === 0) {
    throw new ApiError(404, "No room found for the verified user");
  }

  return res
  .json(
    new ApiResponses(
      200, 
      rooms, 
      "Rooms retrieved successfully"
  ));
});



export { 
    addNewRoom, 
    getRooms, 
    getRoomsByProperty,
    
};
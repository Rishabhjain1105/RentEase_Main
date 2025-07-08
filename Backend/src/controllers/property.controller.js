import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponses } from '../utils/ApiResponses.js';
import { ApiError } from '../utils/ApiError.js';
import { Property } from '../models/property.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const addNewProperty = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    street,
    city,
    state,
    pincode,
    landmark,
    amenities,
    propertyType,
  } = req.body;

  // ✅ Validate required text fields
  if (
    [
      title, description, street, city, state,
      pincode, amenities, 
      propertyType
    ].some(field => typeof field === "string" && field.trim() === "")
  ) {
    throw new ApiError(401, "All fields are required");
  }

  // ✅ Validate images
  if (!req.files || !req.files.propertyImages || req.files.propertyImages.length === 0) {
    throw new ApiError(400, "At least one image is required");
  }

  // ✅ Check for duplicate property
  const existedProperty = await Property.findOne({
    $and: [{ title }, { description }]
  });

  if (existedProperty) {
    throw new ApiError(400, "Property already exists");
  }

  // ✅ Upload images to Cloudinary and get URLs
  // const  = [];
  
  let propertyImageLocalPath = "";
  if (
      Array.isArray(req?.files?.propertyImages) &&
        req.files.propertyImages.length > 0
      ) {
      propertyImageLocalPath = req.files.propertyImages[0].path;
  }
  // console.log(propertyImageLocalPath);
  // console.log(req.files);

  if(!propertyImageLocalPath){
    throw new ApiError(500, "Local path is required");
  }

  const propertyImage = await uploadOnCloudinary(propertyImageLocalPath);

  // ✅ Create property in DB
  const property = await Property.create({
    owner: req.user._id,
    title,
    description,
    street,
    city,
    state,
    pincode,
    landmark,
    amenities,
    propertyType,
    propertyImages: propertyImage?.url
  });

  if (!property) {
    throw new ApiError(500, "Error while adding new property");
  }

  return res.json(new ApiResponses(200, property, "New property added successfully"));
});

const getProperties = asyncHandler(async (req, res, next) => {
  // console.log("Entered")
  const properties = await Property.find({ owner: req.user._id })
  .populate('owner').lean();
  // const properties = await Property.aggregate([
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "owner",
  //       foreignField: "_id",
  //       as: "ownerDetails"
  //     }
  //   }, 
  //   { $unwind: "$ownerDetails" },
  //   {
  //     $project: {
  //       title:1,
  //       description:1,
  //       street:1,
  //       city:1,
  //       state:1,
  //       pincode:1,
  //       landmark:1,
  //       amenities:1,
  //       propertyType:1,
  //       propertyImages:1,
  //       isAvailable: 1,
  //       "ownerDetails.username": 1,
  //       "ownerDetails.fullName": 1,
  //       "ownerDetails.email": 1
  //     }
  //   }
  // ])

  if (!properties || properties.length === 0) {
    throw new ApiError(404, "No properties found for the verified user");
  }

  return res
  .json(
    new ApiResponses(
      200, 
      properties, 
      "Properties retrieved successfully"
    ));
  });
  
  
const deleteProperty = asyncHandler(async (req, res, next) => {
  const { propertyId } = req.body;

  if (!propertyId) {
    throw new ApiError(400, "Property ID is required");
  }

  const deletedProperty = await Property.findOneAndDelete({
    _id: propertyId,
    owner: req.user._id
  });

  if (!deletedProperty) {
    throw new ApiError(404, "Property not found or you are not authorized to delete it");
  }

  return res.json(
    new ApiResponses(
      200,
      deletedProperty,
      "Property deleted successfully"
    )
  );
});   


const deleteAllProperty = asyncHandler(async (req, res, next) => {
  const deletedProperties = await Property.deleteMany({ owner: req.user._id });

  if (deletedProperties.deletedCount === 0) {
    throw new ApiError(404, "No properties found to delete for the verified user");
  }

  return res.json(
    new ApiResponses(
      200,
      null,
      "All properties deleted successfully"
    )
  );
});


export { addNewProperty, getProperties, deleteAllProperty, deleteProperty };


import mongoose, { Schema } from 'mongoose';

const propertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true,
      index: true
    },

    description: {
      type: String,
      required: true
    },

    
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    landmark: { type: String },
    

    amenities: {
      type: [String],
      required: true
    },

    // isFurnitured: {
    //   type: Boolean,
    //   validate: {
    //     validator: function (value) {
    //       if (this.rentType === 'entire') {
    //         return typeof value === 'boolean';
    //       }
    //       return true; // Not required for roomwise
    //     },
    //     message: "isFurnitured must be specified if rentType is 'entire'"
    //   }
    // },

    
    // rentType: {
    //   type: String,
    //   enum: ["entire", "roomwise"],
    //   required: true,
    // },
    
    propertyType: {
      type: String,
        // e.g., 1BHK, Villa, etc.
    },
    // totalBHK: String,       // show only if rentType = "entire"
    // totalRooms: Number,     // show only if rentType = "roomwise"

    // rentAmount: {
    //   type: Number,
    //   min: 0,
    //   validate: {
    //     validator: function (value) {
    //       if (this.rentType === 'entire') {
    //         return value != null && value > 0;
    //       }
    //       return true; // optional for roomwise
    //     },
    //     message: "Rent amount is required when rentType is 'entire'"
    //   }
    // },

    propertyImages: {
      type: [String], // Cloudinary URLs
      required: true  
    },

    isFullyRented: {
      type: Boolean,
      default: false,
      immutable: true, //  control this via logic (not user)
    },

    isAvailable: {
      type: Boolean,
      default: true,
      immutable: true, // Controlled by backend
    }
  },
  {
    timestamps: true
  }
);

export const Property = mongoose.model("Property", propertySchema);

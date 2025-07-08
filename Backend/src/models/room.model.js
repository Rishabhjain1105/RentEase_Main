import mongoose, {Schema} from 'mongoose'

const roomSchema = new Schema({
  property_id: {
    type: Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },

  roomNumber: {
    type: String,
    required: true
  },

  roomType: {
    type: String,
    // enum: ['Single', 'Double', 'Shared'],
    required: true
  },
  
  tenantType: {
    type: String,
    // enum: ['Family', 'Bachelors', 'Others'],
    required: true
  },

//   roomSize: {
//     type: Number,
//     required: true
//   },
  floor: {
    type: Number,
    required: true
  },

  rentAmount: {
    type: Number,
    required: true
  },

  maxOccupancy: {
    type: Number,
    required: true  
  },
  
  currentOccupants: {
    type: Number,
    default: 0
  },
  isFurnitured: {
    type: Boolean,
    // enum: ['Furnished', 'Semi-Furnished', 'Unfurnished'],
    required: true
  },
  hasAttachedBath: {
    type: Boolean,
    default: false
  },
  roomImages: {
    type: [String], // Array of URLs or image filenames
    required: true
  },
  description: {
    type: String
  },
  roomStatus: {
    type: String,
    enum: ['Available', 'Occupied', 'Maintenance'],
    default: 'Available',
    immutable: true,

  },
}, {
  timestamps: true
});

// Auto-update roomStatus based on occupancy
roomSchema.pre('save', function (next) {
  if (this.currentOccupants >= this.maxOccupancy) {
    this.roomStatus = 'Occupied';
  } else if (this.roomStatus !== 'Maintenance') {
    this.roomStatus = 'Available';
  }
  next();
});

export const Room = mongoose.model('Room', roomSchema);
import mongoose, { Schema } from 'mongoose';

const BillSchema = new mongoose.Schema({
  propertyId: {
    type: Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  tenantId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  billDate: {
    type: Date,
    required: true,
  },
  bills: [
    {
      billType: {
        type: String,
        required: true,
        enum: [
          'Rent Bill',
          'Electricity Bill',
          'Water Bill',
          'Gas Bill',
          'Maintenance Bill',
          'Internet and Cable Bill',
          'Security Bill',
          'Property Tax',
          'Parking Fee',
          'Other',
        ],
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
}, { timestamps: true });

export const Bill  = mongoose.model('Bill', BillSchema);
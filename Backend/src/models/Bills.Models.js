const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
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

module.exports = mongoose.model('Bill', BillSchema);
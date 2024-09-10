import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  licensePlateNumber: {
    type: String,
    required: true,
    unique: true
  },
  color: {
    type: String
  },
  seatsAvailable: {
    type: Number,
    default: 4
  },
  vehicleImage: {
    type: String // URL or file path
  }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);

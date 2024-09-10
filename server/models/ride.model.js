import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    passengers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    startLocation: {
      type: String,
      required: true
    },
    endLocation: {
      type: String,
      required: true
    },
    startTime: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['Scheduled', 'Ongoing', 'Completed', 'Cancelled'],
      default: 'Scheduled'
    },
    cost: {
      type: Number
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Ride', rideSchema);
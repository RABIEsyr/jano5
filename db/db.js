const mongoose = require("mongoose");

const schema = mongoose.Schema;

const bookingSchema = new schema({
  place: String,
  location: String,
  department: String,
  floor: String,
  price: Number,

  ownerName: String,
  ownerMobile: Number,
  tenantName: String,
  tenantMobile: Number,

  start: {type: Date, default: Date.now},
  days: Number,

  notes: String,
  createdAt: { type: Date, default: Date.now },

  expirayDate: { type: Date, default: Date.now }
});



module.exports.bookingSchema = mongoose.model("bookingSchema", bookingSchema);

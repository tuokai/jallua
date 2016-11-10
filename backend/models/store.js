const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
  storeNumber: String,
  streetAddress: String,
  zipCode: String,
  postOffice: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Sets the created_at parameter equal to the current time
storeSchema.pre('save', (next) => {
  const now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

module.exports = mongoose.model('Store', storeSchema);


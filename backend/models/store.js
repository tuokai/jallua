const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
  storeNumber: String,
  streetAddress: String,
  zipCode: String,
  postOffice: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number], // [Long, Lat]
  },
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

// Index this schema in 2dsphere format (critical for running proximity searches)
storeSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Store', storeSchema);


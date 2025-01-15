const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phone: { type: String, required: true, unique: true },
    otp: { type: String }, // Not required by default
    otpExpires: { type: Date },
    isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);

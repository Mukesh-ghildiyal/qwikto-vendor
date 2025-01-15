const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema({
    phoneId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    panNo: { type: String, required: true, unique: true },
    gst: { type: String, required: true, unique: true },
    bankName: { type: String, required: true },
    ifscCode: { type: String, required: true },
    fssaiNo: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('UserDetails', UserDetailsSchema);

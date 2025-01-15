const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    userDetailsId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserDetails', required: true },
    aadharFront: { type: String },
    aadharBack: { type: String },
    voterFront: { type: String },
    voterBack: { type: String },
    panCard: { type: String, required: true },
    fssaiPhoto: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Document', DocumentSchema);

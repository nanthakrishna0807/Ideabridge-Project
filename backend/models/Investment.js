const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    investorID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    projectID: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    collaborationStatus: {
        type: String,
        enum: ['Requested', 'Accepted', 'Rejected'],
        default: 'Requested'
    },
    message: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Investment', investmentSchema);

const mongoose = require('mongoose');

const ndaSchema = new mongoose.Schema({
    founderName: { type: String, required: true },
    startupName: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    approvalDate: { type: Date },
    developerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('NDA', ndaSchema);

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    problemStatement: { type: String, required: true },
    solution: { type: String, required: true },
    techStack: { type: String, required: true },
    marketPotential: { type: String, required: true },
    demoURL: { type: String },
    pptURL: { type: String },
    ownerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    NDAstatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    investorsInterested: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    collaborationRequests: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);

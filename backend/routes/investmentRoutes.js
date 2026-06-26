const express = require('express');
const router = express.Router();
const Investment = require('../models/Investment');
const Project = require('../models/Project');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/request', protect, authorize('entrepreneur', 'investor'), async (req, res) => {
    try {
        const { projectID, message } = req.body;
        const investment = new Investment({
            investorID: req.user._id,
            projectID,
            message,
        });
        const savedInvestment = await investment.save();
        res.status(201).json(savedInvestment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/my-investments', protect, authorize('entrepreneur', 'investor'), async (req, res) => {
    try {
        const investments = await Investment.find({ investorID: req.user._id }).populate('projectID');
        res.json(investments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/project/:projectId', protect, async (req, res) => {
    try {
        const investments = await Investment.find({ projectID: req.params.projectId }).populate('investorID', 'name email profileDetails');
        res.json(investments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id/status', protect, authorize('student', 'emerging', 'admin'), async (req, res) => {
    try {
        const { status } = req.body;
        const investment = await Investment.findById(req.params.id);
        if (!investment) return res.status(404).json({ message: 'Investment request not found' });

        investment.collaborationStatus = status;
        const updatedInvestment = await investment.save();
        res.json(updatedInvestment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

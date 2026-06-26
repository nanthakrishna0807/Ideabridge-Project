const express = require('express');
const router = express.Router();
const NDA = require('../models/NDA');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/apply', protect, authorize('student', 'emerging', 'entrepreneur', 'investor'), async (req, res) => {
    try {
        const { founderName, startupName, description } = req.body;
        const nda = new NDA({
            founderName, startupName, description, developerId: req.user._id
        });
        const savedNDA = await nda.save();
        res.status(201).json(savedNDA);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/', protect, async (req, res) => {
    try {
        // Admin sees all, users see their own
        let ndas;
        if (req.user.role === 'admin') {
            ndas = await NDA.find().populate('developerId', 'name email');
        } else {
            ndas = await NDA.find({ developerId: req.user._id });
        }
        res.json(ndas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id/status', protect, authorize('admin'), async (req, res) => {
    try {
        const { status } = req.body;
        const nda = await NDA.findById(req.params.id);
        if (!nda) return res.status(404).json({ message: 'NDA not found' });

        nda.status = status;
        nda.approvalDate = status === 'Approved' ? new Date() : undefined;
        const updatedNDA = await nda.save();
        res.json(updatedNDA);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

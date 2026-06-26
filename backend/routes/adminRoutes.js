const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Project = require('../models/Project');
const NDA = require('../models/NDA');
const Investment = require('../models/Investment');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/stats', protect, authorize('admin'), async (req, res) => {
    try {
        const studentCount = await User.countDocuments({ role: 'student' });
        const emergingCount = await User.countDocuments({ role: 'emerging' });
        const entrepreneurCount = await User.countDocuments({ role: 'entrepreneur' });
        const investorCount = await User.countDocuments({ role: 'investor' });
        const projectCount = await Project.countDocuments();
        const ndaCount = await NDA.countDocuments();
        const collabCount = await Investment.countDocuments();

        res.json({
            studentCount,
            emergingCount,
            entrepreneurCount,
            investorCount,
            projectCount,
            ndaCount,
            collabCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/logs', protect, authorize('admin'), async (req, res) => {
    // Return some mock activity logs for now 
    res.json([
        { id: 1, message: "Investor John viewed details for RocketDev", time: "2 mins ago", type: "info" },
        { id: 2, message: "Founder Mark signed NDA for HealthTrack AI", time: "15 mins ago", type: "success" },
        { id: 3, message: "Student Jane Doe created a new project", time: "1 hour ago", type: "info" },
        { id: 4, message: "Investor Michael sent a collaboration request", time: "2 hours ago", type: "warning" }
    ]);
});

// Admin User Management routes
router.get('/users', protect, authorize('admin'), async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/users/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        await Project.deleteMany({ ownerID: user._id });
        await User.findByIdAndDelete(req.params.id);
        
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

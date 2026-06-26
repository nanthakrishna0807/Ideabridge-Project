const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('student', 'emerging', 'admin', 'entrepreneur'), async (req, res) => {
    try {
        const { title, problemStatement, solution, techStack, marketPotential, demoURL, pptURL } = req.body;
        const project = new Project({
            title, problemStatement, solution, techStack, marketPotential, demoURL, pptURL, ownerID: req.user._id
        });
        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/', protect, async (req, res) => {
    try {
        const projects = await Project.find().populate('ownerID', 'name email profileDetails').populate('collaborationRequests.user', 'name role email');
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/my', protect, async (req, res) => {
    try {
        const projects = await Project.find({ ownerID: req.user._id }).populate('collaborationRequests.user', 'name role email');
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', protect, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('ownerID', 'name email profileDetails').populate('collaborationRequests.user', 'name role email');
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Request Collaboration
router.post('/:id/request', protect, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        const alreadyRequested = project.collaborationRequests.find(r => r.user.toString() === req.user._id.toString());
        if (alreadyRequested) return res.status(400).json({ message: 'Already sent a request for this project' });

        project.collaborationRequests.push({ user: req.user._id, status: 'Pending' });
        await project.save();

        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Accept/Reject Collaboration
router.put('/:id/request/:userId', protect, async (req, res) => {
    try {
        const { status } = req.body; // 'Accepted' or 'Rejected'
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        if (project.ownerID.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const request = project.collaborationRequests.find(r => r.user.toString() === req.params.userId);
        if (!request) return res.status(404).json({ message: 'Request not found' });

        request.status = status;
        await project.save();
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

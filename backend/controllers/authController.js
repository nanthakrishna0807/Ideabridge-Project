const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'ideabridge_super_secret_key_1234', {
        expiresIn: '30d',
    });
};

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'student', // Default fallback
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
                profileDetails: user.profileDetails
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.authUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Hardcoded admin check first to retain original demo access if needed
        if (email === "admin@ib.com" && password === "admin123") {
            return res.json({
                _id: "admin_id",
                token: generateToken("admin_id"),
                role: "admin",
                email: email,
                name: "Admin User",
            });
        }

        // Hardcoded developer check
        if (email === "developer@ib.com" && password === "developer123") {
            return res.json({
                _id: "dev_id",
                token: generateToken("dev_id"),
                role: "student",
                email: email,
                name: "Developer Demo",
            });
        }
        
        // Hardcoded entrepreneur check
        if (email === "entrepreneur@ib.com" && password === "entrepreneur123") {
            return res.json({
                _id: "ent_id",
                token: generateToken("ent_id"),
                role: "entrepreneur",
                email: email,
                name: "Entrepreneur Demo",
            });
        }

        // Hardcoded investor check
        if (email === "investor@ib.com" && password === "investor123") {
            return res.json({
                _id: "inv_id",
                token: generateToken("inv_id"),
                role: "investor",
                email: email,
                name: "Investor Demo",
            });
        }

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
                profileDetails: user.profileDetails
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.socialAuth = async (req, res) => {
    try {
        const { email, name, provider, password, role } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            // User exists, log them in
            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
                profileDetails: user.profileDetails
            });
        }

        // User doesn't exist, if password and role are provided, create them
        if (password && role) {
            user = await User.create({
                name,
                email,
                password,
                role,
                provider: provider || 'social'
            });

            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
                profileDetails: user.profileDetails
            });
        }

        // Otherwise, ask the frontend to show the onboarding modal
        res.status(404).json({
            message: 'User account not found. Please complete your registration.',
            isNewUser: true,
            email: email,
            name: name
        });

    } catch (error) {
        console.error("Social Auth Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileDetails: user.profileDetails
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

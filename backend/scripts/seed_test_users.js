const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const users = [
    {
        name: 'Student Test',
        email: 'student_test@ib.com',
        password: 'pass123',
        role: 'student',
        profileDetails: { startupName: 'Student Project', domain: 'Education' }
    },
    {
        name: 'Emerging Test',
        email: 'emerging_test@ib.com',
        password: 'pass123',
        role: 'emerging',
        profileDetails: { startupName: 'Emerging Tech', domain: 'AI' }
    },
    {
        name: 'Entrepreneur Test',
        email: 'entrepreneur_test@ib.com',
        password: 'pass123',
        role: 'entrepreneur',
        profileDetails: { ventureName: 'Venture Alpha', industry: 'Cleantech' }
    },
    {
        name: 'Investor Test',
        email: 'investor_test@ib.com',
        password: 'pass123',
        role: 'investor',
        profileDetails: { company: 'Investor Group', investmentDomain: 'Fintech' }
    }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ideabridge')
    .then(async () => {
        console.log('Connected to MongoDB for testing.');

        for (const userData of users) {
            // Delete if exists, then create
            await User.deleteMany({ email: userData.email });
            await User.create(userData);
            console.log(`User created: ${userData.email}`);
        }

        console.log('Test Users Seeded Successfully!');
        process.exit();
    })
    .catch(err => {
        console.error('Error seeding test users:', err);
        process.exit(1);
    });

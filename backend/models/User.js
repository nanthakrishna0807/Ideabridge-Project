const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['student', 'emerging', 'entrepreneur', 'investor', 'admin'],
        required: true
    },
    profileDetails: {
        startupName: String,
        domain: String,
        skills: String,
        description: String,
        company: String,
        investmentDomain: String,
        budgetRange: String
    }
}, { timestamps: true });

/* ==============================
   Hash password before saving
============================== */
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

/* ==============================
   Compare password
============================== */
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
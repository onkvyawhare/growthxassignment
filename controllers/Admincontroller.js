const Admin = require('../models/Admin');
const Assignment = require('../models/Assignment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Admin
exports.registerAdmin = async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hashedPassword });

    try {
        await admin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login Admin
exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

// View Assignments
exports.viewAssignments = async (req, res) => {
    const assignments = await Assignment.find({ admin: req.admin.username });
    res.json(assignments);
};

// Accept Assignment
exports.acceptAssignment = async (req, res) => {
    const { id } = req.params;

    try {
        await Assignment.findByIdAndUpdate(id, { status: 'accepted' });
        res.json({ message: 'Assignment accepted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Reject Assignment
exports.rejectAssignment = async (req, res) => {
    const { id } = req.params;

    try {
        await Assignment.findByIdAndUpdate(id, { status: 'rejected' });
        res.json({ message: 'Assignment rejected' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const User=require("../models/user");
const Assignment=require("../models/Assignment");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.registerUser=async(req,res)=>{
    const{username,password}=req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    
    try {
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};


exports.uploadAssignment = async (req, res) => {
    const { userId, task, admin } = req.body;
    const assignment = new Assignment({ userId, task, admin });

    try {
        await assignment.save();
        res.status(201).json({ message: 'Assignment uploaded successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


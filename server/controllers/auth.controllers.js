import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/user.model.js"


export const handleSignup=async(req,res)=>{
    const { name, email, phoneNumber, password } = req.body;
    
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new User({
            name,
            email,
            phoneNumber,
            password: hashedPassword
        });

        // Save the user in the database
        await newUser.save();
        // Create a JWT token
        const token = jwt.sign({ userId: newUser._id },process.env.JWT_SECRETE, { expiresIn: '1h' });

        res.status(201).json({ token, userId: newUser._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}


export const handleLogin=async(req,res)=>{
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETE, { expiresIn: '1h' });

        res.status(200).json({ token, userId: user._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}

export const handleUpdate=async(req,res)=>{
    const { name, phoneNumber, profilePicture} = req.body;

    try {
        // Find user by ID and update
        const updatedUser = await User.findByIdAndUpdate(
            req.user,  // The user ID is set in the authenticate middleware
            {
                name,
                phoneNumber,
                profilePicture
            },
            { new: true } // Return the updated user
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}

export const handleDelete=async (req,res)=>{
    try {
        // Find user by ID and delete
        const deletedUser = await User.findByIdAndDelete(req.user);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}
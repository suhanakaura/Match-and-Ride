import express from "express"
import { handleDelete, handleLogin,handleSignup, handleUpdate } from "../controllers/auth.controllers.js";
import authenticate from "../middleware/auth.middleware.js";
const router=express.Router();
const tokenBlacklist = new Set();
// Signup route
router.post('/signup',handleSignup);
// login route
router.post('/login', handleLogin);
// Update User Information Route
router.put('/update', authenticate, handleUpdate);
// Delete User Route
router.delete('/delete', authenticate, handleDelete);
// logout
router.post('/logout', authenticate, (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    // Add the token to the blacklist
    tokenBlacklist.add(token);
    res.status(200).json({ message: 'User logged out successfully.' });
});

export default router;
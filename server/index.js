import express from "express"
import connectDB from "./database/db.js"
import authRoutes from "./routes/auth.routes.js"
import authenticate from "./middleware/auth.middleware.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
dotenv.config({path:"./.env"});
const app=express();
connectDB();

//middlewares 
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
// Protected route example

app.get('/api/protected', authenticate, (req, res) => {
    res.status(200).json({ message: `Hello user ${req.user}` });
});

app.listen(5001,()=>{
    console.log("server started on port 5000");
})
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import BookRouter from './Routes/BookRoutes.js';
import userRouter from './Routes/userRoutes.js';
import authRouter from './Routes/authRoutes.js';

const app = express();
app.use(cors({origin: "http://localhost:5173"}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api', BookRouter);
app.use('/api', userRouter);
app.use('/api', authRouter);


mongoose.connect(process.env.MONGO_URL, {dbName:process.env.DB})
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running at ${process.env.PORT}`);
    })
})
.catch((err)=>{
   console.log("Server is failed to connect database", err);
})
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import BookRouter from './Routes/BookRoutes.js';

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api', BookRouter);


mongoose.connect(process.env.MONGO_URL, {dbName:process.env.DB})
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running at ${process.env.PORT}`);
    })
})
.catch((err)=>{
   console.log("Server is failed to connect database", err);
})
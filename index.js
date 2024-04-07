import express  from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from './Routes/auth.js';
import user from './Routes/user.js';
import doctor from './Routes/doctor.js';

dotenv.config();

const app = express();
const port = process.env.PORT|| 8000
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST','PUT','DELETE','PATCH','FETCH'],
    allowedHeaders: ['Content-Type'],
}));


const corsOptions = {
    origin:true,}

    app.get('/',(req,res)=>{
        res.send('API is running....')
    });
    mongoose.set('strictQuery' ,false)
    const connetDB = async()=>{
        try{
    await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        })
        console.log('MongoDB connection SUCCESS')
    }
    catch(error){
            console.error('MongoDB connection FAIL')
    }
    }
    
  


    app.use(cookieParser());
    app.use(cors(corsOptions));
    app.use('/api/v1/auth',authRoute)
    app.use('/api/v1/users',user)
    app.use('/api/v1/doctor',doctor)
     
 


    app.listen(port,()=>{
        connetDB();
        console.log(`Server is running on port ${port}`)
    })
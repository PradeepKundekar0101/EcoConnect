import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";

import { registerUser } from './controllers/authUser.js';
import userRouter from './routes/userRoutes.js'
import ngoRouter from './routes/ngoRoutes.js'
import eventRouter from './routes/eventRoutes.js'
import { registerNgo } from './controllers/authNgo.js';
import { createEvent } from './controllers/event.js';
dotenv.config();
const PORT = process.env.PORT || 6001;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());

// Serve static files from the public/assets folder
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* Connection to DataBase */
mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(PORT,()=>{
        console.log("Server running at Port "+PORT);
    });
    
}).catch((e)=>{
    console.log(e.message)
});

/*Configure Multer */
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
            cb(null,"public/assets");
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})
const upload = multer({storage});

/* Routes Accepting Images */

app.post("/user/register",upload.single("profile"),registerUser);
app.post("/ngo/register",upload.single("profile"),registerNgo);
app.post("/event/create",upload.single("image"),createEvent);

/*Routes */
app.use("/user",userRouter);
app.use("/ngo",ngoRouter);
app.use("/event",eventRouter);



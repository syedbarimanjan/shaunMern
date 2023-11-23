const express = require("express");
const cors=require("cors");
const mongoose = require("mongoose");

const app = express();

const workoutRoutes = require("./routes/workout.js");

require("dotenv").config();



//middleware
app.use(cors())
app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})

//routes
app.use("/api/workouts",workoutRoutes);

//connect to the db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log(`port ${process.env.PORT}`);
        })
    })
    .catch(error => console.log(error))
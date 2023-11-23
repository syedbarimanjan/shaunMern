const Workout = require("../models/workoutModel.js");
const mongoose = require("mongoose");

//get all workouts
const getAllWorkouts = async (req,res)=>{
    try {
        const workouts = await Workout.find({});
        res.status(200).json(workouts);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

//get a single workout
const getSingleWorkout = async (req,res)=>{
    const {id} = req.params;
    let workout;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"workout id is not of type ObjectId"});
    }
    try {
        const workout = await Workout.findById(id);
        res.status(200).json(workout);
    } catch (error) {
        if(!workout){
            return res.status(404).json({error:"No such workout"});
        }
        res.status(400).json({error:error.message});
    }
}
//post a new workout
const createWorkout = async (req,res)=>{
    const {title, reps , load} = req.body;
    try {
        const workout = await Workout.create({title, reps , load});
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}
//delete a workout
const deleteWorkout = async (req,res)=>{
    const {id} = req.params;
    let workout;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"workout id is not of type ObjectId"});
    }
    try {
        const workout = await Workout.findOneAndDelete({_id:id});
        res.status(200).json(workout);
    } catch (error) {
        if(!workout){
            return res.status(404).json({error:"No such workout"});
        }
        res.status(400).json({error:error.message});
    }
}
//update a workout
const updateWorkout = async (req,res)=>{
    const {id} = req.params;
    let workout;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"workout id is not of type ObjectId"});
    }
    try {
        const workout = await Workout.findOneAndUpdate({_id:id},{
            ...req.body
        });
        res.status(200).json(workout);
    } catch (error) {
        if(!workout){
            return res.status(404).json({error:"No such workout"});
        }
        res.status(400).json({error:error.message});
    }
}

module.exports = {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout,
}
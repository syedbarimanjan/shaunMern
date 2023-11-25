const express = require("express");
const {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require("../controllers/workoutControllers.js");
const requireAuth = require("../middleware/requireAuth.js");

const router = express.Router();
//require auth for all workout routes
router.use(requireAuth);

//get all workouts
router.get("/",getAllWorkouts);

//get a single workout
router.get("/:id",getSingleWorkout);

//post a new workout
router.post("/",createWorkout);

//delete a workout
router.delete("/:id",deleteWorkout);

//update a workout
router.patch("/:id",updateWorkout);

module.exports = router;
import React, { useState } from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.jsx";
import { useAuthContext } from '../hooks/useAuthContext.jsx';
import { ACTIONS } from "../context/WorkoutContext.jsx";

const WorkoutForm = () => {
    const {dispatch}=useWorkoutsContext();
    const {authState}=useAuthContext();

    const [title,setTitle]=useState("");
    const [load,setLoad]=useState("");
    const [reps,setReps]=useState("");
    const [error,setError]=useState(null);
    const [emptyFields,setEmptyFields]=useState([]);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!authState.user){
            setError("You Must Be Logged In");
            return
        }

        const workout = {title,load,reps};
        const response = await fetch("http://localhost:4000/api/workouts",{
            method:"POST",
            body:JSON.stringify(workout),
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${authState.user.token}`
            }
        });
        const json = await response.json();
        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields);
        }
        if(response.ok){
            setEmptyFields([]);
            //workoutsDispatchFunctions.updateWorkouts(json);
            dispatch({type:ACTIONS.CREATE_WORKOUTS,payload:json});
            setTitle("")
            setLoad("")
            setReps("")
            setError(null)
            console.log("new workouts added",json)
        }
    }
  return (
    <form className="create" onSubmit={handleSubmit}>
        <h3>add a new workout</h3>
        <label>exercise title:</label>
        <input 
            type="text"
            onChange={e => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes("title") ? "error":""}
        />
        <label>load in (kg):</label>
        <input 
            type="number"
            onChange={e => setLoad(e.target.value)}
            value={load}
            className={emptyFields.includes("load") ? "error":""}
        />
        <label>reps:</label>
        <input 
            type="number"
            onChange={e => setReps(e.target.value)}
            value={reps}
            className={emptyFields.includes("reps") ? "error":""}
        />
        <button>Add Workout</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default WorkoutForm
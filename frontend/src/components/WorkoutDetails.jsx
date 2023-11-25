import { useWorkoutsContext } from "../hooks/useWorkoutsContext.jsx";
import { useAuthContext } from "../hooks/useAuthContext.jsx";

import formatDistanceToNow from "date-fns/formatDistanceToNow"

const WorkoutDetails = ({workout}) => {
  const {dispatchFunctions}=useWorkoutsContext();
  const {authState}=useAuthContext();
  const handleClick=async () => {
    if(!authState.user){
      return
    }
    const response = await fetch(`http://localhost:3001/api/workouts/${workout._id}`,{
            method:"DELETE",
            headers:{
              "Authorization":`Bearer ${authState.user.token}`
            }
    })
    const json = await response.json();
    if(response.ok){
      dispatchFunctions.deleteWorkout(json);
    }
  }
  return (
    <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>load (kg):</strong>{workout.load}</p>
        <p><strong>reps:</strong>{workout.reps}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true})}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails
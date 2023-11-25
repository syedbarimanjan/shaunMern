import {useEffect} from "react"
import WorkoutDetails from "../components/WorkoutDetails.jsx";
import WorkoutForm from "../components/WorkoutForm.jsx";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.jsx";
import { useAuthContext } from "../hooks/useAuthContext.jsx"
import { ACTIONS } from "../context/WorkoutContext.jsx";

const Home = () => {
    const {workoutsState,dispatch} = useWorkoutsContext();
    const {authState} = useAuthContext();
    useEffect(()=>{
        const fetchWorkouts = async ()=>{
            const response = await fetch("http://localhost:4000/api/workouts",{
                headers:{
                    "Authorization":`Bearer ${authState.user.token}`
                }
            });
            const json = await response.json();
            if(response.ok){
                //workoutsDispatchFunctions.setWorkouts(json)
                dispatch({type:ACTIONS.SET_WORKOUTS,payload:json})
            }
        }
        if(authState.user){
            fetchWorkouts();
        }
    },[dispatch,authState.user])
  return (
   <div className="home">
       <div className="workouts">
        {workoutsState.workouts && workoutsState.workouts.map((workout)=>(
            <WorkoutDetails key={workout._id} workout={workout}/>
        ))}
       </div>
       <WorkoutForm/>
   </div>
  )
}

export default Home
import {useEffect} from "react"
import WorkoutDetails from "../components/WorkoutDetails.jsx";
import WorkoutForm from "../components/WorkoutForm.jsx";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.jsx";

const Home = () => {
    const {state,dispatchFunctions} = useWorkoutsContext();
    useEffect(()=>{
        const fetchWorkouts = async ()=>{
            const response = await fetch("http://localhost:3001/api/workouts");
            const json = await response.json();
            if(response.ok){
                dispatchFunctions.setWorkouts(json)
            }
        }
        fetchWorkouts();
    },[dispatchFunctions.setWorkouts])
  return (
   <div className="home">
       <div className="workouts">
        {state.workouts && state.workouts.map((workout)=>(
            <WorkoutDetails key={workout._id} workout={workout}/>
        ))}
       </div>
       <WorkoutForm/>
   </div>
  )
}

export default Home
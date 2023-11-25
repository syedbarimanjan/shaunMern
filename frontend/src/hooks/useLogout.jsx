import { useAuthContext } from "./useAuthContext.jsx";
import { useWorkoutsContext } from "./useWorkoutsContext.jsx"
import { ACTIONS } from "../context/AuthContext.jsx";
import { ACTIONS as WORKOUT_ACTIONS } from "../context/WorkoutContext.jsx";

const useLogout = () => {
    const {dispatch}=useAuthContext();
    const {dispatch:workoutsDispatch}=useWorkoutsContext();

    const logout = () => {
        //remove user from localstorage
        localStorage.removeItem("user");
        //dispatch logout action
        //authDispatchFunctions.logoutUser();
        //workoutsDispatchFunctions.setWorkouts(null);
        dispatch({type:ACTIONS.LOGOUT});
        workoutsDispatch({type:WORKOUT_ACTIONS.SET_WORKOUTS,payload:null})

    }

    return {logout};
}
export default useLogout;
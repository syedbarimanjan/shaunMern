import { useAuthContext } from "./useAuthContext.jsx";
import { useWorkoutsContext } from "./useWorkoutsContext.jsx"

const useLogout = () => {
    const {authDispatchFunctions}=useAuthContext();
    const {workoutsDispatchFunctions}=useWorkoutsContext();

    const logout = () => {
        //remove user from localstorage
        localStorage.removeItem("user");
        //dispatch logout action
        authDispatchFunctions.logoutUser();
        workoutsDispatchFunctions.setWorkouts(null);
    }

    return {logout};
}
export default useLogout;
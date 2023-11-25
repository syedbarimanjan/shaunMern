import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const {dispatchFunctions}=useAuthContext();

    const logout = () => {
        //remove user from localstorage
        localStorage.removeItem("user");
        //dispatch logout action
        dispatchFunctions.logoutUser();
    }

    return {logout};
}

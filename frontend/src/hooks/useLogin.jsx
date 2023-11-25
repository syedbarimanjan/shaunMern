import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { ACTIONS } from "../context/AuthContext";

export const useLogin = () => {
    const [error,setError]=useState(null);
    const [isLoading,setIsLoading]=useState(null);
    const {dispatch}=useAuthContext();

    const login = async (email,password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch("http://localhost:4000/api/user/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email,password}),
        });

        const json = await response.json();

        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
        }
        if(response.ok){
            //save the user to localstorage
            localStorage.setItem("user",JSON.stringify(json));
            //update the auth context
            //authDispatchFunctions.loginUser(json);
            dispatch({type:ACTIONS.LOGIN,payload:json});
            setIsLoading(false);
        }

    }

    return {login,isLoading,error}
}

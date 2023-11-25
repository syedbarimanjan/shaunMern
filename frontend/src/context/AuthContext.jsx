import {createContext,useReducer,useEffect} from "react";

export const AuthContext = createContext();

const ACTIONS = {
    LOGIN:"LOGIN",
    LOGOUT:"LOGOUT"
}

export const authReducer = (state,action) => {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return {user:action.payload}
        case ACTIONS.LOGOUT:
            return {user:null}
        default:
            return state
    }
}
export const AuthContextProvider = ({children}) => {
    const [state,dispatch]=useReducer(authReducer,{
        user:null,
    })
    console.log("auth state = " ,state)

    useEffect(() => {
        const user =JSON.parse(localStorage.getItem("user"));
        if(user){
            loginUser(user);
        }
    },[])

    const loginUser = (json)=>{
        dispatch({type:ACTIONS.LOGIN,payload:json});
    }
    const logoutUser = ()=>{
        dispatch({type:ACTIONS.LOGOUT});
    }

    const dispatchFunctions = {
        loginUser,
        logoutUser,
    }
    
    return(
        <AuthContext.Provider value={{state,dispatchFunctions}}>
            {children}
        </AuthContext.Provider>
    )
}
import {createContext,useReducer,useEffect} from "react";

export const AuthContext = createContext();

export const ACTIONS = {
    LOGIN:"LOGIN",
    LOGOUT:"LOGOUT"
}

export const authReducer = (authState,action) => {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return {user:action.payload}
        case ACTIONS.LOGOUT:
            return {user:null}
        default:
            return authState
    }
}
export const AuthContextProvider = ({children}) => {
    const [authState,dispatch]=useReducer(authReducer,{
        user:null,
    })
    console.log("auth = " ,authState)

    /*const loginUser = (json)=>{
        dispatch({type:ACTIONS.LOGIN,payload:json});
    }
    const logoutUser = ()=>{
        dispatch({type:ACTIONS.LOGOUT});
    }

    const authDispatchFunctions = {
        loginUser,
        logoutUser,
    }*/
    
    useEffect(() => {
        const user =JSON.parse(localStorage.getItem("user"));
        if(user){
            dispatch({type:ACTIONS.LOGIN,payload:user});
        }
    },[])

    
    return(
        <AuthContext.Provider value={{authState,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
import {createContext,useReducer} from "react";

export const WorkoutsContext = createContext();

const ACTIONS = {
    SET_WORKOUTS:"SET_WORKOUTS",
    CREATE_WORKOUTS:"CREATE_WORKOUTS",
    DELETE_WORKOUT:"DELETE_WORKOUT"
}

export const workoutsReducer = (state,action) => {
    switch (action.type) {
        case ACTIONS.SET_WORKOUTS:
            return{
                workouts:action.payload
            }
        case ACTIONS.CREATE_WORKOUTS:
            return{
                workouts:[action.payload,...state.workouts]
            }
        case ACTIONS.DELETE_WORKOUT:
            return{
                workouts:state.workouts.filter(w=> w._id !== action.payload._id)
            }
        default:
            return state
    }
}
export const WorkoutsContextProvider = ({children}) => {
    const [state,dispatch]=useReducer(workoutsReducer,{
        workouts:null,
    })
    const setWorkouts = (data)=>{
        dispatch({type:ACTIONS.SET_WORKOUTS,payload:data})
    }
    const updateWorkouts = (data)=>{
        dispatch({type:ACTIONS.CREATE_WORKOUTS,payload:data})
    }
    const deleteWorkout = (data)=>{
        dispatch({type:ACTIONS.DELETE_WORKOUT,payload:data})
    }
    const dispatchFunctions = {
        setWorkouts,
        updateWorkouts,
        deleteWorkout,
    }
    
    return(
        <WorkoutsContext.Provider value={{state,dispatchFunctions}}>
            {children}
        </WorkoutsContext.Provider>
    )
}
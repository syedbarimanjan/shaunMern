import {createContext,useReducer} from "react";

export const WorkoutsContext = createContext();

const ACTIONS = {
    SET_WORKOUTS:"SET_WORKOUTS",
    CREATE_WORKOUTS:"CREATE_WORKOUTS",
    DELETE_WORKOUT:"DELETE_WORKOUT"
}

export const workoutsReducer = (workoutsState,action) => {
    switch (action.type) {
        case ACTIONS.SET_WORKOUTS:
            return{
                workouts:action.payload
            }
        case ACTIONS.CREATE_WORKOUTS:
            return{
                workouts:[action.payload,...workoutsState.workouts]
            }
        case ACTIONS.DELETE_WORKOUT:
            return{
                workouts:workoutsState.workouts.filter(w=> w._id !== action.payload._id)
            }
        default:
            return workoutsState
    }
}
export const WorkoutsContextProvider = ({children}) => {
    const [workoutsState,dispatch]=useReducer(workoutsReducer,{
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
        <WorkoutsContext.Provider value={{workoutsState,dispatchFunctions}}>
            {children}
        </WorkoutsContext.Provider>
    )
}
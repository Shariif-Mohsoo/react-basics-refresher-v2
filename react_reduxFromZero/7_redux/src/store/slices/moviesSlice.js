import {createSlice} from "@reduxjs/toolkit";
import {reset} from "../actions";

const moviesSlice = createSlice({
    name:"movie",
    initialState:[],
    reducers:{
        addMovie(state,action){
            state.push(action.payload)
        },
        removeMovie(state,action){
            const idx= state.indexOf(action.payload)
            state.splice(idx,1)
        },
        // reset(state,action){
        //     // state = []; //not good thing(will not work)
        //     // state.playlist=[]; applicable and will work
        //     return [];//optimal one.            
        // }
    },
    extraReducers:(builder)=>{
        builder.addCase(reset,(state,action)=>{
            return []
        })
    }
})
export const {addMovie, removeMovie} = moviesSlice.actions;
export const moviesReducer = moviesSlice.reducer;
//export default combine reducer
// export default moviesSlice.reducer;
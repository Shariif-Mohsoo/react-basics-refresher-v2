import { createSlice } from "@reduxjs/toolkit";
import {reset} from "../actions";

const songsSlice = createSlice({
    name:"song",
     initialState:[],
    reducers:{
        addSong(state,action){
            state.push(action.payload)
        },
        removeSong(state,action){
            //action.payload will be the string (name of song)
            const idx = state.indexOf(action.payload);
            state.splice(idx,1);            
        } 
    },
    extraReducers:(builder)=>{
        // builder.addCase("movie/reset",(state,action)=>{
        //     return [];
        // })
        //Better
        // const actionString = moviesSlice.actions.reset.toString();
        // builder.addCase(actionString,(state,action)=>{
        //     return []; 
        // })
        builder.addCase(reset,(state,action)=>{
            return []; 
        })
        
    }
})


export const {addSong, removeSong} = songsSlice.actions;
export const songsReducer = songsSlice.reducer;
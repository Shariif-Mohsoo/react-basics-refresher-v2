import {configureStore} from "@reduxjs/toolkit";

import {songsReducer,addSong,removeSong} from "./slices/songsSlice"
import {moviesReducer,addMovie,removeMovie} from "./slices/moviesSlice"



export const store = configureStore({
    reducer:{
        songs:songsReducer,
        movies:moviesReducer
    }
})


export {addMovie,removeMovie,addSong,removeSong};





//Old code

// const moviesSlice = createSlice({
//     name:"movie",
//     initialState:[],
//     reducers:{
//         addMovie(state,action){
//             state.push(action.payload)
//         },
//         removeMovie(state,action){
//             const idx= state.indexOf(action.payload)
//             state.splice(idx,1)
//         },
//         // reset(state,action){
//         //     // state = []; //not good thing(will not work)
//         //     // state.playlist=[]; applicable and will work
//         //     return [];//optimal one.            
//         // }
//     },
//     extraReducers:(builder)=>{
//         builder.addCase(reset,(state,action)=>{
//             return []
//         })
//     }
// })





// const songsSlice = createSlice({
//     name:"song",
//      initialState:[],
//     reducers:{
//         addSong(state,action){
//             state.push(action.payload)
//         },
//         removeSong(state,action){
//             //action.payload will be the string (name of song)
//             const idx = state.indexOf(action.payload);
//             state.splice(idx,1);            
//         } 
//     },
//     extraReducers:(builder)=>{
//         // builder.addCase("movie/reset",(state,action)=>{
//         //     return [];
//         // })
//         //Better
//         // const actionString = moviesSlice.actions.reset.toString();
//         // builder.addCase(actionString,(state,action)=>{
//         //     return []; 
//         // })
//         builder.addCase(reset,(state,action)=>{
//             return []; 
//         })
        
//     }
// })

// const store = configureStore({
//     reducer:{
//         songs: songsSlice.reducer,
//         movies: moviesSlice.reducer
//     }
// })


// export {store};

// console.log(moviesSlice.actions.reset.toString()) //console log the action sting ("movie/reset")

// Just some testing below:

// console.log(store)

// const startingState = store.getState();
// console.log(startingState)

// store.dispatch({
//     type:"song/addSong",
//     payload:"New Song"
// })

// const startingState = store.getState();
// console.log(startingState)

// console.log(songsSlice.actions)
// console.log(songsSlice.actions.addSong("Add a song"))//under the hood {payload:"Add a Song",type:"song/addSong"}

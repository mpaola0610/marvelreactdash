import {createSlice} from '@reduxjs/toolkit';
const rootSlice = createSlice({
    name: "root",
    initialState:{
        name:"classic hulk",
        description:"mean green and clean",
        height: 10,
        power:"super human strenth/rage",
        flight: "so fast",
        speed: "so, so fast",
        comics_appeared_in: 14,
        weight: "adjustable",
        series: "mvx5000"

    },
    reducers:{
        chooseName: (state,action) => {state.name = action.payload},
        chooseSpeed: (state, action) => {state.speed = action.payload}
    }
})

export const reducer = rootSlice.reducer;
export const {chooseName,chooseSpeed,} = rootSlice.actions;
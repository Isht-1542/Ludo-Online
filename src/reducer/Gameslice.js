import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    nextPos: [20, 21, 22, 23, 24, 16, 13, 10, 7, 4, 1, 2, 3, 6, 9, 12, 15, 18, 
        37, 38,39,40,41,42,48,54,53,52,51,50,49,57,60,63,66,69,72,71,70,67,64,61,58,55,
        36,35,34,33,32,31,25,19],
    safe: [67, 33, 20, 7, 6, 40, 53, 66],
    blue: [25,26,27,28,29,30,100],
    red: [2,5,8,11,14,17,100],
    green: [71,68,65,62,59,56,100],
    yellow: [48,47,46,45,44,43,100],
    color: {},
    isMoveDone: true,
    isActive: false,
    board : {"blue":[81,82,83,84],"red":[85,86,87,88],"green":[89,90,91,92],"yellow":[93,94,95,96],},
    ctoU: {},
}

const Gameslice = createSlice({
    name: "game",
    initialState: initialState,
    reducers:{
        addUser: (state, action) => {
            state.user = action.payload;
        },
        addColor: (state, action) => {
            state.color = action.payload;
        },
        changeBoard:(state, action) => {
            const co = action.payload.color;
            const val = action.payload.newid;
            const ind = action.payload.ind;
            state.board = [...state.board, state.board["blue"][ind]=val];
            console.log(state.board);
        },
        changeMoveDone:(state, action) => {
            state.isMoveDone = action.payload;
        },
        addUserToColor:(state,action) => {
            state.ctoU = action.payload;
        },
        changeisActive:(state,action) => {
            state.isActive = action.payload;
        }
    }
});

export const {
    addUser,
    addColor,
    changeBoard,
    changeMoveDone,
    addUserToColor,
    changeisActive,
} = Gameslice.actions

export default Gameslice.reducer
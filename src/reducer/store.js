import { configureStore } from "@reduxjs/toolkit";
import Gameslice from "./Gameslice";

const store = configureStore({
    reducer: {
        game: Gameslice, 
    }
})

export default store
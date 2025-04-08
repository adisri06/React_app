import { configureStore } from "@reduxjs/toolkit";
import taskreducer from '../component/Task/TaskSlice';
const store = configureStore({
    reducer: {
        task: taskreducer,
    },
    devTools: process.env.NODE_ENV !== "production",

})
export default store;
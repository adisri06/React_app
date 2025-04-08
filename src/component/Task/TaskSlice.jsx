
import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";

const fakeApi = (url) => {
return new Promise((resolve)=>{
    setTimeout(()=>{
        resolve([
            { id: '1', text: 'Learn Redux Toolkit' },
            { id: '2', text: 'Build a cool app' }
          ])
    }, 3000)
})
}
export const fetchTasks = createAsyncThunk('task/fetchTasks', async ()=>{
    const response = await fakeApi()
    return response
})
const taskAdapter = createEntityAdapter();
const initialState = taskAdapter.getInitialState({
  loading: false,
});
const taskSlice = createSlice({
 name: "task",
 initialState,
 reducers:{
    addTask: taskAdapter.addOne,
    removeTask: taskAdapter.removeOne,
    updateTask: taskAdapter.updateOne,
 },
 extraReducers:(builder)=>{
    builder.addCase(fetchTasks.pending, (state)=>{
        state.loading = true
    }
    ).addCase(fetchTasks.fulfilled, (state, action)=>{
        state.loading = false
        taskAdapter.setAll(action.payload, state)
    }).addCase(fetchTasks.rejected, (state)=>{
        state.loading = false
    })
 }

})
export const { addTask, removeTask, updateTask } = taskSlice.actions;
export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
} = taskAdapter.getSelectors((state) => state.task);
export default taskSlice.reducer;

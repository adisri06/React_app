import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addTask, removeTask, updateTask, selectAllTasks,fetchTasks } from "./TaskSlice";

const TaskList = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(selectAllTasks);
    const [taskText, setTaskText] = useState("");
const loading = useSelector((state) => state.task.loading);

const handleAdd = () => {
    if (taskText.trim()) {
      dispatch(addTask({ id: nanoid(), text: taskText }))
      setTaskText('')
    }
  }

  const handleRemove = id => {
    dispatch(removeTask(id))
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-2">Task Manager</h1>

      {loading && <p className="text-gray-600">Loading tasks...</p>}

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-grow"
          placeholder="Enter task..."
          value={taskText}
          onChange={e => setTaskText(e.target.value)}
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 rounded">
          Add
        </button>
      </div>

      <ul className="list-disc pl-5">
        {tasks.map(task => (
          <li key={task.id} className="flex justify-between items-center mb-1">
            <span>{task.text}</span>
            <button onClick={() => handleRemove(task.id)} className="text-red-500">
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList
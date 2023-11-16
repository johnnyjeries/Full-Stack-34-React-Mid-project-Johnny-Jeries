import React, { useState } from 'react';

const Todos = ({ userId, todos, addTodoApp, updateTaskApp }) => {
  const [addClicked, setAddClicked] = useState('');
  const [userTodos, getUserTodos] = useState(todos.filter((todo) => userId === todo.userId));
  const [newTask, setNewTask] = useState([]);
  const [ taskCompleted, setCompleted] = useState('');
  
    //add todos
    const addTask = (userId, newTask) => {
        const newTodo = {
            userId: userId,
            title: newTask,
            completed: false
        };
    // Call the callback function from the prop
        addTodoApp(userId, newTodo);

    // Clear the input field and close the add task section
    setNewTask('');
    setAddClicked('');
    };

    const updateTask = (userId) => {
        const updatedTask ={
            userId:userId,
            completed: taskCompleted
        }
        updateTaskApp(userId, updatedTask);
    } 

  return (
    <div className='todos container'>
      User: {userId} 
      <button className='yellow-btn add-todos' onClick={() => { setAddClicked(userId) }}> Add </button>
        {addClicked !== userId && userTodos.map((todo, index) => (
        <div className='purple-border' key={index}>
          Title: {todo.title}<br/>
          Completed: {todo.completed ? 'True' : 'False'}
          {todo.completed === false && <button onClick={() => {setCompleted(userId); updateTask(userId)}}className='yellow-btn'>Mark Completed</button>}
        </div>
      ))}
      {addClicked === userId &&(
        <div className='purple-border'>
            Title: <input type="text" placeholder='Add a new task' onChange={(e) => {setNewTask(e.target.value)}}/><br/>
            <button className='yellow-btn' onClick={() => {setAddClicked('')} }>Cancel</button>
            <button className='yellow-btn' onClick={() => {addTask(userId)}}>Add</button>
        </div>
      )}
    </div>
  );
}

export default Todos;

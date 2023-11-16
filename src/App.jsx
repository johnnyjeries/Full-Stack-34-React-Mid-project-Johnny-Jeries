import { useEffect, useState } from 'react'
import './App.css'
import  { getAll, updateItem, deleteItem, addItem } from './utils'
import UsersComp from './Users'
import 'bootstrap/dist/css/bootstrap.min.css';

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

function App() {

  const [ users, setUsers ] = useState([]);
  const [ todos, setTodos ] = useState([]);
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await getAll(USERS_URL);
      setUsers(data);
    };

    const getTodos = async () => {
      const { data } = await getAll(TODOS_URL);
      setTodos(data);
    };

    const getPosts = async () => {
      const { data } = await getAll(POSTS_URL);
      setPosts(data);
    };

    getUsers();
    getTodos();
    getPosts();
  },[]);

  const updateUserApp = async (userId, updatedUserData) => {
    await updateItem(USERS_URL, userId, updatedUserData);
    const { data } = await getAll(USERS_URL);
    console.log(data);
    setUsers(data);
  }

  const deleteUserApp = async (userId) => {
    deleteItem(USERS_URL, userId);
    const { data } = await getAll(USERS_URL);
    setUsers(data);
    
  }

  const addTodoApp = async (userId, todoData) => {
    await addItem(TODOS_URL, todoData);
    const { data } = await getAll(TODOS_URL);
    setTodos(data);
  }

  const addPostApp = async (userId, postData) => {
    await addItem(POSTS_URL, postData);
    const { data } = await getAll(POSTS_URL);
    setPosts(data);
  }

  const addUserApp = async (userData) => {
    await addItem(USERS_URL, userData);
    const { data } = await getAll(USERS_URL);
    setUsers(data);
  }

  const updateTaskApp = async (userId, updatedTaskData) => {
    await updateItem(USERS_URL, userId, updatedTaskData);
    const { data } = await getAll(TODOS_URL);
    setTodos(data);
  }




  return (
    <>
    <div className='usersWrapper'>
      <UsersComp theUsers={users} theTodos={todos} thePosts={posts} updateUserApp={updateUserApp} deleteUserApp={deleteUserApp} addTodoApp={addTodoApp} addPostApp={addPostApp} addUserApp={addUserApp} updateTaskApp={updateTaskApp}></UsersComp>
    </div>
    </>
  )
}

export default App

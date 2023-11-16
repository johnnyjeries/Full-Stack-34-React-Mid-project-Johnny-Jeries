import React, { useState, useEffect } from 'react'
import Todos from './Todos';
import Posts from './Posts';

const UsersComp = ({theUsers, theTodos, thePosts, updateUserApp, deleteUserApp, addTodoApp, addPostApp, addUserApp, updateTaskApp}) => {
    const [myUsers, getUsers ] = useState(theUsers);
    const [myTodos, getTodos ] = useState(theTodos);
    const [myPosts, getPosts ] = useState(thePosts);
    const [searchValue, setSearch ] = useState('');
    const [mouseOverId, setMouseOver ] = useState('');
    const [idClicked, setIdClicked ] = useState(false);

    const [ updatedName, setNewName ] = useState('');
    const [ updatedEmail, setNewEmail ] = useState('');
    const [ updatedStreet, setNewStreet ] = useState('');
    const [ updatedCity, setNewCity ] = useState('');
    const [ updatedZipcode, setNewZipcode ] = useState('');

    const [ newUserCLicked, setNewUserCLicked ] = useState('');
    const [ newName, setAddNewName ] = useState('');
    const [ newEmail, setAddNewEmail ] = useState('');


    //get users and todos
    useEffect(() => {
        getUsers(theUsers);
        getTodos(theTodos);
        getPosts(thePosts);
      }, [theUsers, theTodos, thePosts]);


      //task completed?
      const areTasksCompleted = (userId) => {
        const userTodos = myTodos.filter((todo) => todo.userId === userId);
        return userTodos.every((todo) => todo.completed);
      }

      //search
      const searchUsers = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearch(searchTerm);

        const filteredUsers = theUsers.filter((user) =>
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) 
        );

        getUsers(filteredUsers);

      }

    //update user
    const updateUser = (userId, user) => {
        const updatedUserData = {
            userId: userId,
            name: updatedName !== '' ? updatedName : user.name,
            email: updatedEmail !== '' ? updatedEmail : user.email,
            address: {
                street: updatedStreet !== '' ? updatedStreet : user.address.street,
                city: updatedCity !== '' ? updatedCity : user.address.city,
                zipcode: updatedZipcode !== '' ? updatedZipcode : user.address.zipcode,
            },
        }
    // Call the callback function from the prop
        updateUserApp(userId, updatedUserData);
    };
  
    const deleteUser = (userId) => {
        deleteUserApp(userId);
    }

    const addUser = () => {
        const newUserData = {
            name: newName,
            email: newEmail
        }
        addUserApp(newUserData);
        setNewUserCLicked(false);
    }



  return (
    <div className=''>
            <label htmlFor="">Search 
                <input type="text" onChange={searchUsers} />
            </label>
            <button onClick={() => {setNewUserCLicked(true); setIdClicked(false);}}className='yellow-btn add-user'>Add</button>
            <div className="">
                {myUsers.map((user, index) => {
                    return(
                        <div className="grid-container" key={index}>
                            <div className={`users grid-item ${areTasksCompleted(user.id) ? 'user-green' : 'user-red'}`} key={index} style={{ backgroundColor: idClicked === user.id ? '#f8cbad' : 'inherit' }}>
                                <label onClick={() => {setIdClicked(user.id); setNewUserCLicked(false);}}>ID: {user.id}</label>
                                <form action="" key={index}>
                                    Name: <input type="text" defaultValue={user.name} onChange={(e) => { setNewName(e.target.value) }}/>
                                    <br />
                                    Email: <input type="text" defaultValue={user.email} onChange={(e) => { setNewEmail(e.target.value) }}/>
                                </form>
                                <button className='grey-button' onMouseOver={() => setMouseOver(user.id)} onClick={() => setMouseOver(null)}>Other Data</button>
                                { mouseOverId === user.id &&(
                                <div className='other-data'>
                                    Street: <input type="text" defaultValue={user.address.street} onChange={(e) => { setNewStreet(e.target.value) }}/><br />
                                    City: <input type="text" defaultValue={user.address.city} onChange={(e) => { setNewCity(e.target.value) }}/><br />
                                    Zip Code: <input type="text" defaultValue={user.address.zipcode} onChange={(e) => { setNewZipcode(e.target.value) }}/><br />
                                </div>
                                ) }
                                <button className='yellow-btn' onClick={() => updateUser(user.id, user)}>Update</button>
                                <button className='yellow-btn' onClick={() => deleteUser(user.id)}>Delete</button>
                            </div>
                            { idClicked === user.id && (
                                <div className='posts_todos grid-item'>
                                    <div className='purple-border container'>
                                        <Todos userId = {user.id} todos={myTodos} addTodoApp={addTodoApp} updateTaskApp={updateTaskApp}></Todos>
                                    </div>
                                    <div className='purple-border container'>
                                        <Posts userId = {user.id} posts={myPosts} addPostApp={addPostApp}></Posts>
                                    </div>    
                                </div>
                            )}
                        </div>
                    )
                
                })}
            { newUserCLicked && (
                <div className='new-user purple-border'>
                    Name: <input onChange={(e)=>{setAddNewName(e.target.value)}} type="text" defaultValue='new name'/><br/>
                    Email: <input onChange={(e)=>{setAddNewEmail(e.target.value)}} type="text" defaultValue='email@email.com'/><br/>
                    <button onClick={()=>{setNewUserCLicked(false); setIdClicked(false);}} className='yellow-btn'>Cancel</button>
                    <button onClick={addUser} className='yellow-btn'>Add</button>
                </div>
            )}
        </div>
    </div>
  )
}

export default UsersComp
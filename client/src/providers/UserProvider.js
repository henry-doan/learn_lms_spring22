import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserConsumer = UserContext.Consumer;

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([])

  const navigate = useNavigate();

  useEffect( () => {
    axios.get('/api/users')
      .then( res => setUsers(res.data) )
      .catch( err => console.log(err))
  }, [])

  const addUser = (user) => {
    axios.post('/api/users', { user })
      .then( res => setUsers([...users, res.data]))
      .catch( err => console.log(err))
  }

  const updateUser = (id, user) => {
    axios.put(`/api/users/${id}`, { user } )
    .then( res => {
      const newUpdatedUsers = users.map( u => {
        if (u.id === id) {
          return res.data
        }
        return u
      })
        setUsers(newUpdatedUsers)
        navigate(`/users`)
      })
      .catch( err => console.log(err))
  }

  const deleteUser = (id) => {
    axios.delete(`/api/users/${id}`)
      .then( res => {
        setUsers(users.filter( u => u.id !== id ))
        navigate('/users')
      })
      .catch( err => console.log(err))
  }

  return (
    <UserContext.Provider value={{
      users, 
      addUser: addUser, 
      updateUser: updateUser,
      deleteUser: deleteUser,
    }}>
      { children }
    </UserContext.Provider>
  )
}

export default UserProvider;
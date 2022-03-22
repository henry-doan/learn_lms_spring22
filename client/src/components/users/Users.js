import { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './UserList';
import UserForm from './UserForm';
import { Button } from 'react-bootstrap';

const Users = () => {
  const [users, setUsers] = useState([])
  const [adding, setAdd] = useState(false)

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

  }

  const deleteUser = (id) => {

  }

  return (
    <>  
      {
        adding ?
          <>
            <UserForm 
              addUser={addUser}
              setAdd={setAdd} 
            />
            <Button onClick={() => setAdd(false)}>Cancel</Button>
          </>
        :
        <Button onClick={() => setAdd(true)}>+</Button>
      }
      <h1>All Users</h1>
      <UserList
        users={users}
      />
    </>
  )
}

export default Users;
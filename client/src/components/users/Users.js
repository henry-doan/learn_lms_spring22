import { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './UserList';

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect( () => {
    axios.get('/api/users')
      .then( res => setUsers(res.data) )
      .catch( err => console.log(err))
  }, [])

  return (
    <>
      <h1>All Users</h1>
      <UserList
        users={users}
      />
    </>
  )
}

export default Users;
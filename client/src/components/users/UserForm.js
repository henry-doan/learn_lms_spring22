import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const UserForm = ({ addUser, setAdd }) => {
  const [user, setUser] = useState({ first_name: '', last_name: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    addUser(user)
    setAdd(false)
    setUser({ first_name: '', last_name: '' })
  }

  return (
    <>
      <h1>Create User</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control 
            name='first_name'
            value={user.first_name}
            onChange={(e) => setUser({...user, first_name: e.target.value })}
            type="text" 
            placeholder="First Name" 
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control 
            name='last_name'
            value={user.last_name}
            onChange={(e) => setUser({...user, last_name: e.target.value })}
            type="text" 
            placeholder="Last Name" 
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

export default UserForm;
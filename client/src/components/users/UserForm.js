import { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { UserConsumer } from '../../providers/UserProvider';

const UserForm = ({ addUser, setAdd, id, first_name, last_name, updateUser, setEdit }) => {
  const [user, setUser] = useState({ first_name: '', last_name: '' })

  useEffect( () => {
    if (id) {
      setUser({ first_name, last_name })
    }
    // id ? setUser({ first_name, last_name }) : null
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()
    if (id) {
      updateUser(id, user)
      setEdit(false)
    } else {
      addUser(user)
      setAdd(false)
    }
    setUser({ first_name: '', last_name: '' })
  }

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <h1>{ id ? 'Edit' : 'Create' } User</h1>
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
        </Card.Body>
      </Card>
    </>
  )
}

const ConnectedUserForm = (props) => (
  <UserConsumer>
    { value => <UserForm {...props} {...value} /> }
  </UserConsumer>
)

export default ConnectedUserForm;
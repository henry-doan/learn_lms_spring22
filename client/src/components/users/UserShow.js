import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { UserConsumer } from '../../providers/UserProvider';
import UserForm from './UserForm';

const UserShow = ({ deleteUser }) => {
  const [user, setUser] = useState({ first_name: '', last_name: '' })
  const [courses, setCourses] = useState([])
  const [editing, setEdit] = useState(false)

  const { userId } = useParams()

  useEffect( () => {
    axios.get(`/api/users/${userId}`)
      .then( res => setUser(res.data))
      .catch( err => console.log(err) )
  }, [])

  useEffect( () => {
    axios.get(`/api/${userId}/courses`)
      .then( res => setCourses(res.data))
      .catch( err => console.log(err) )
  }, [])

  const { first_name, last_name } = user
  return(
    <>
      <h1>{first_name} {last_name}</h1>
      { editing ?
        <>
          <UserForm
            {...user}
            setEdit={setEdit}
          />
          <Button onClick={() => setEdit(false)}>
            Cancel
          </Button>
        </>
        :
        <Button onClick={() => setEdit(true)}>
          Edit
        </Button>
      }
      <Button onClick={() => deleteUser(user.id)}>
        Delete
      </Button>

      <h4>Current Courses</h4>
      { courses.map( c => 
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{c.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{c.subject}</Card.Subtitle>
            <Card.Text>
              {c.desc}
            </Card.Text>
            <Link to={`/courses/${c.id}`}>
              <Card.Link>Show</Card.Link>
            </Link>
          </Card.Body>
        </Card>
      )}
    </>
  )
}

const ConnectedUserShow = (props) => (
  <UserConsumer>
    { value => <UserShow {...props} {...value} />}
  </UserConsumer>
)

export default ConnectedUserShow;
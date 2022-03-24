import { Link } from 'react-router-dom';
import { ListGroup, Button } from 'react-bootstrap';
import { UserConsumer } from '../../providers/UserProvider';

const UserList = () => (
  <UserConsumer>
    { value => (
      <>
        <ListGroup>
          { value.users.map( u => 
            <ListGroup.Item key={u.id}>
              {u.first_name} {u.last_name}
              <Link to={`/users/${u.id}`}>
                <Button variant="info">Show</Button>
              </Link>
            </ListGroup.Item>
          )}
        </ListGroup>
      </>
    )}
  </UserConsumer>
)

export default UserList
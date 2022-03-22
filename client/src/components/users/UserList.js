import { Link } from 'react-router-dom';
import { ListGroup, Button } from 'react-bootstrap';

const UserList = ({ users }) => (
  <>
    <ListGroup>
      { users.map( u => 
        <ListGroup.Item>
          {u.first_name} {u.last_name}
          <Button variant="info">Show</Button>
        </ListGroup.Item>
      )}
    </ListGroup>
  </>
)

export default UserList
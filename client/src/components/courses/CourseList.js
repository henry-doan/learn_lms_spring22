import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const CourseList = ({ courses }) => (
  <>
    <Container>
      <Row>
        { courses.map( c => 
          <Col xs={6} md={3}>
            <Card style={{ width: '14rem' }}>
              <Card.Img variant="top" src="https://images.unsplash.com/photo-1537861295351-76bb831ece99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80" alt="course" />
              <Card.Body>
                <Card.Title>{c.title}</Card.Title>
                <Link to={`/courses/${c.id}`}>
                  <Button variant="primary">Show</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  </>
)

export default CourseList;
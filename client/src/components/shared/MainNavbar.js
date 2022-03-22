import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

const MainNavbar = () => (
  <>
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <Link to='/'>LearnLMS</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <Nav.Link>
              <Link to="/">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/courses">
                Courses
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/users">
                Users
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>
)

export default MainNavbar;
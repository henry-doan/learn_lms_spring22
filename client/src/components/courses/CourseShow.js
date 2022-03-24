import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, ListGroup } from 'react-bootstrap';

const CourseShow = () => {
  const [course, setCourse] = useState({ title: '', desc: '', subject: '' })
  const [enrolledUsers, setEnrollUsers] = useState([])

  const { courseId } = useParams() 

  useEffect( () => {
    axios.get(`/api/courses/${courseId}`)
      .then( res => setCourse(res.data))
      .catch( err => console.log(err))
  }, [])

  useEffect( () => {
    axios.get(`/api/${courseId}/users`)
    .then( res => setEnrollUsers(res.data))
    .catch( err => console.log(err))
  }, [])

  const { title, desc, subject } = course
  return(
    <>
      <h1>{title}</h1>
      <h3>{desc}</h3>
      <h3>{subject}</h3>
      <Button>Edit</Button>
      <Link 
        to={`/${course.id}/enrollments`}
        state={{ courseTitle: title }}
      >
        <Button>Enrollment</Button>
      </Link>
      <Button>Delete</Button>

      <h3>All users in the course of {title}</h3>
      <ListGroup>
        { enrolledUsers.map( u => 
          <Link to={`/users/${u.id}`}>
            <ListGroup.Item>
              {u.first_name} {u.last_name}
            </ListGroup.Item>
          </Link>
        )}
      </ListGroup>
    </>
  )
}

export default CourseShow;

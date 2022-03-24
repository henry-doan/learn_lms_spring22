import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const EnrollmentForm = ({ addEnrollment, setAdd, courseId }) => {
  const [enrollment, setEnroll] = useState({ role: '', user_id: 0 })
  const [unenrolled, setUnenrolled] = useState([])

  useEffect( () => {
    axios.get(`/api/courses/${courseId}/unenrolled`)
      .then( res => {
        setUnenrolled(res.data)
      })
      .catch( err => console.log(err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    addEnrollment(enrollment)
    setAdd(false)
    setEnroll({ role: '', user_id: 0 })
  }

  return (
    <>
      <h1>Create an Enrollment</h1>
      <Form onSubmit={handleSubmit}>        
        <Form.Group className="mb-3">
          <Form.Select 
            aria-label="Default select example"
            name='role'
            value={enrollment.role}
            onChange={(e) => setEnroll({ ...enrollment, role: e.target.value })}
          >
            <option>All Role</option>
            <option value="teacher">Teacher</option>
            <option value="ta">TA</option>
            <option value="student">Student</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Select 
            aria-label="Default select example"
            name='user_id'
            value={enrollment.user_id}
            onChange={(e) => setEnroll({ ...enrollment, user_id: e.target.value })}
          >
            <option>All Users</option>
            { unenrolled.map( u => (
              <option value={u.id}>{u.first_name} {u.last_name}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

export default EnrollmentForm;
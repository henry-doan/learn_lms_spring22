import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CourseForm = ({ addCourse, setAdd }) => {
  const [course, setCourse] = useState({ title: '', desc: '', subject: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    addCourse(course)
    setAdd(false)
    setCourse({ title: '', desc: '', subject: '' })
  }

  return (
    <>
      <h1>Create Course</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Course Title</Form.Label>
          <Form.Control 
            name='title'
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            type="text" 
            placeholder="title" 
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            name='desc'
            value={course.desc}
            onChange={(e) => setCourse({ ...course, desc: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Select 
          aria-label="Default select example"
          name='subject'
          value={course.subject}
          onChange={(e) => setCourse({ ...course, subject: e.target.value })}
        >
          <option>All Subject</option>
          <option value="Cooking">Cooking</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Math">Math</option>
          <option value="Writing">Writing</option>
        </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

export default CourseForm;
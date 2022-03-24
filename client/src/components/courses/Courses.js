import axios from 'axios';
import { useState, useEffect } from 'react';
import CourseList from './CourseList';
import CourseForm from './CourseForm';
import { Button } from 'react-bootstrap';

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [adding, setAdd] = useState(false)

  useEffect( () => {
    axios.get('/api/courses')
      .then( res => setCourses(res.data) )
      .catch( err => console.log(err))
  }, [])

  const addCourse = (course) => {
    axios.post('/api/courses', { course })
      .then( res => setCourses([...courses, res.data]))
      .catch( err => console.log(err))
  }

  const deleteCourse = (id) => {
    axios.delete(`/api/courses/${id}`)
      .then( res => setCourses( courses.filter( c => c.id !== id )))
      .catch( err => console.log(err))
  }

  return (
    <>
      {
        adding ?
        <>  
          <CourseForm 
            addCourse={addCourse}
            setAdd={setAdd}
          />
          <Button onClick={() => setAdd(false)}>Cancel</Button>
        </>
        :
        <Button onClick={() => setAdd(true)}>+</Button>
      }
      <h1>Courses</h1>
      <CourseList
        courses={courses}
        deleteCourse={deleteCourse}
      />
    </>
  )
}

export default Courses;
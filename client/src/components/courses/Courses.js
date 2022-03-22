import axios from 'axios';
import { useState, useEffect } from 'react';
import CourseList from './CourseList';
import CourseForm from './CourseForm';

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

  return (
    <>
      {
        adding ?
        <>  
          <CourseForm 
            addCourse={addCourse}
            setAdd={setAdd}
          />
          <button onClick={() => setAdd(false)}>Cancel</button>
        </>
        :
        <button onClick={() => setAdd(true)}>+</button>
      }
      <h1>Courses</h1>
      <CourseList
        courses={courses}
      />
    </>
  )
}

export default Courses;
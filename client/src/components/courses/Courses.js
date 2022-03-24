import { useState } from 'react';
import CourseList from './CourseList';
import CourseForm from './CourseForm';
import { Button } from 'react-bootstrap';

const Courses = () => {
  const [adding, setAdd] = useState(false)

  return (
    <>
      {
        adding ?
        <>  
          <CourseForm 
            setAdd={setAdd}
          />
          <Button onClick={() => setAdd(false)}>Cancel</Button>
        </>
        :
        <Button onClick={() => setAdd(true)}>+</Button>
      }
      <h1>Courses</h1>
      <CourseList  />
    </>
  )
}

export default Courses;
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CourseShow = () => {
  const [course, setCourse] = useState({ title: '', desc: '', subject: '' })

  const { courseId } = useParams() 

  useEffect( () => {
    axios.get(`/api/courses/${courseId}`)
      .then( res => setCourse(res.data))
      .catch( err => console.log(err))
  }, [])

  const { title, desc, subject } = course
  return(
    <>
      <h1>{title}</h1>
      <h3>{desc}</h3>
      <h3>{subject}</h3>
      <button>Edit</button>
      <button>Enrollment</button>
      <button>Delete</button>
    </>
  )
}

export default CourseShow;

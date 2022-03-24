import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import EnrollmentList from './EnrollmentList';
import EnrollmentForm from './EnrollmentForm';
import { Button, Spinner } from 'react-bootstrap';

const Enrollments = () => {
  const [students, setStudents] = useState([])
  const [tas, setTas] = useState([])
  const [teachers, setTeachers] = useState([])
  const [enrolled, setEnrolled] = useState([])
  const [adding, setAdd] = useState(false)
  const [loading, setLoaded] = useState(false)

  const { courseId } = useParams()
  const location = useLocation()
  const { courseTitle } = location.state

  useEffect( () => {
    axios.get(`/api/courses/${courseId}/enrollments`)
      .then( res => {
        setStudents(res.data.students)
        setTas(res.data.tas)
        setTeachers(res.data.teachers)
      })
      .catch( err => console.log(err))
  }, [])

  useEffect( () => {
    axios.get(`/api/courses/${courseId}/enrolled`)
      .then( res => setEnrolled( res.data ))
      .catch( err => console.log(err))
  }, [])

  const whichRole = (enrollment) => {
    const { role } = enrollment
    switch(role) {
      case 'teacher':
        setTeachers([ ...teachers, enrollment ])
        break
      case 'ta':
        setTas([ ...tas, enrollment ])
        break
      default:
        setStudents([ ...students, enrollment ])
    }
  }

  const addEnrollment = (enrollment) => {
    setLoaded(true)
    axios.post(`/api/courses/${courseId}/enrollments`, { enrollment })
      .then( res => {
        whichRole(res.data)
        setLoaded(false)
        window.location.href = `/${courseId}/enrollments`
      })
      .catch( err => console.log(err))
  }

  return (
    <>
      {
        loading ? 
          <Spinner animation="border" variant="primary" />
        :
        <>
          { adding ?
            <>
              <EnrollmentForm
                addEnrollment={addEnrollment}
                setAdd={setAdd} 
                courseId={courseId}
              />
              <Button onClick={() => setAdd(false)}>Cancel</Button>
            </>
            :
            <Button onClick={() => setAdd(true)}>+</Button>
          }
          <h1>All Enrollments for {courseTitle}</h1>
          <EnrollmentList 
            title='Teachers' 
            enrolls={teachers} 
            enrolled={enrolled}
          />
          <EnrollmentList 
            title='Tas' 
            enrolls={tas} 
            enrolled={enrolled}
          />
          <EnrollmentList 
            title='Students' 
            enrolls={students} 
            enrolled={enrolled}
          />
        </>
      }
    </>
  )
}

export default Enrollments;
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import EnrollmentList from './EnrollmentList';
import EnrollmentForm from './EnrollmentForm';
import { Button, Spinner } from 'react-bootstrap';
import { EnrollmentConsumer } from '../../providers/EnrollmentProvider';

const Enrollments = ({ getAllEnrollments, getEnrolledUsers, tas, students, teachers, enrolled}) => {
  const [adding, setAdd] = useState(false)
  const [loading, setLoaded] = useState(false)

  const { courseId } = useParams()
  const location = useLocation()
  const { courseTitle } = location.state

  useEffect( () => {
    getAllEnrollments(courseId)
    getEnrolledUsers(courseId)
  }, [])

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

const ConnectedEnrollments = (props) => (
  <EnrollmentConsumer>
    { value => <Enrollments {...props} {...value} />}
  </EnrollmentConsumer>
)

export default ConnectedEnrollments;
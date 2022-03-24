import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const EnrollmentContext = React.createContext()

export const EnrollmentConsumer = EnrollmentContext.Consumer

// const EnrollmentProvider = ({ children }) => {
//   const [enrollments, setEnrollments] = useState([])
//   const navigate = useNavigate()

//   const getAllEnrollments = (courseId) => {
//     axios.get(`/api/courses/${courseId}/enrollments`)
//       .then( res => setEnrollments(res.data))
//       .catch( err => console.log(err) )
//   }

//   const addEnrollment = (courseId, enrollment) => {
//     axios.post(`/api/courses/${courseId}/enrollments`, { enrollment })
//       .then( res => setEnrollments([...enrollments, res.data]))
//       .catch( err => console.log(err) )
//   }

//   const updateEnrollment = (courseId, id, enrollment) => {
//     axios.put(`/api/courses/${courseId}/enrollments/${id}`, { enrollment })
//       .then( res => {
//         const newUpdatedEnrollments = enrollment.map( e => {
//           if (e.id === id) {
//             return res.data
//           }
//           return e
//         })
//         setEnrollments(newUpdatedEnrollments)
//         navigate(`/${courseId}/enrollments`)
//       })
//       .catch( err => console.log(err) )
//   }

//   const deleteEnrollment = (courseId, id) => {
//     axios.delete(`/api/courses/${courseId}/enrollments/${id}`)
//       .then( res => {
//         setEnrollments(enrollments.filter( e => e.id !== id))
//         navigate(`/${courseId}/enrollments`)
//       })
//       .catch( err => console.log(err) )
//   }

//   return(
//     <EnrollmentContext.Provider value={{
//       enrollments,
//       getAllEnrollments: getAllEnrollments,
//       addEnrollment: addEnrollment,
//       updateEnrollment: updateEnrollment,
//       deleteEnrollment: deleteEnrollment,
//     }}>
//       { children }
//     </EnrollmentContext.Provider>
//   )
// }
const EnrollmentProvider = ({ children }) => {
  const [students, setStudents] = useState([])
  const [tas, setTas] = useState([])
  const [teachers, setTeachers] = useState([])
  const [enrolled, setEnrolled] = useState([])
  const navigate = useNavigate()

  const getAllEnrollments = (courseId) => {
    axios.get(`/api/courses/${courseId}/enrollments`)
    .then( res => {
       setStudents(res.data.students)
       setTas(res.data.tas)
       setTeachers(res.data.teachers)
     })
    .catch( err => console.log(err) )
  }

  const getEnrolledUsers = (courseId) => {
    axios.get(`/api/courses/${courseId}/enrolled`)
      .then( res => setEnrolled(res.data) )
      .catch( err => console.log(err) )
  }

  const whichRole = (enroll) => {
    const { role } = enroll
    switch(role) {
      case 'student':
        setStudents([...students, enroll])
        break
      case 'ta':
        setTas([...tas, enroll])
        break
      default:
        setTeachers([...teachers, enroll])
    }
  }

  const addEnrollment = (courseId, enrollment) => {
    axios.post(`/api/courses/${courseId}/enrollments`, { enrollment })
     .then( res => whichRole(res.data) )
     .catch( err => console.log(err) )
  }

  const whichArr = (enroll) => {
    const { role } = enroll
    switch(role) {
      case 'teacher':
        return teachers
      case 'ta':
        return tas
      default:
        return students
    }
  }

  const whichFunction = (enroll, updated) => {
    const { role } = enroll
    switch(role) {
      case 'teacher':
        return setTeachers(updated)
      case 'ta':
        return setTas(updated)
      default:
        return setStudents(updated)
    }
  }
 
  const updateEnrollment = (courseId, id, enrollment) => {
    axios.put(`/api/courses/${courseId}/enrollments/${id}`, { enrollment })
      .then( res => {
        const newUpdateEnrollment = whichArr(enrollment).map( e => {
          if (e.id === id) {
            return res.data
          }
          return e
        })
        whichFunction(enrollment, newUpdateEnrollment)
        navigate(`/${courseId}/enrollments`)
      })
      .catch( err => console.log(err) )
  }

  const whichDelete = (role, id) => {
    switch(role) {
      case 'teacher':
        return setTeachers(teachers.filter( e => e.id !== id ))
      case 'ta':
        return setTas(tas.filter( e => e.id !== id ))
      default:
        return setStudents(students.filter( e => e.id !== id ))
    }
  }

  const deleteEnrollment = (courseId, id, role) => {
    axios.delete(`/api/courses/${courseId}/enrollments/${id}`)
      .then( res => {
        whichDelete(role, id)
        navigate(`/${courseId}/enrollments`)
      })
      .catch( err => console.log(err) )
  }

  return (
    <EnrollmentContext.Provider value={{
       enrolled,
       students,
       tas,
       teachers,
       getAllEnrollments: getAllEnrollments,
       getEnrolledUsers: getEnrolledUsers,
       addEnrollment: addEnrollment,
       updateEnrollment: updateEnrollment,
       deleteEnrollment: deleteEnrollment,
    }}>
       { children }
    </EnrollmentContext.Provider>
  )
}

export default EnrollmentProvider;
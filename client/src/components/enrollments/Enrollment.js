const Enrollment = ({ role, user_id, enrolled }) => {

  const displayUser = (id) => {
    let fullName 
    enrolled.map( u => {
      if (u.id === id) {
        fullName = u.first_name + " " + u.last_name
      }
    })
    return fullName
  }

  return (
    <>
      <h3>{displayUser(user_id)}</h3>
    </>
  )
}

export default Enrollment;
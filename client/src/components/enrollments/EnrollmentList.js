import Enrollment from './Enrollment';

const EnrollmentList = ({ title, enrolls, enrolled }) => (
  <>
    <h1>{title}</h1>
    { enrolls.map( e => 
      <Enrollment 
        key={e.id}
        {...e}
        enrolled={enrolled}
      />
    )}
  </>
)

export default EnrollmentList
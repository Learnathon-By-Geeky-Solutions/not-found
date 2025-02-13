import PropTypes from "prop-types"

const Unassigned = ({name}) => {
  return (
    <div>
      <h2>Welcome {name}</h2>
      <h2>Your role has not been assigned yet. Please have patient.</h2>
    </div>
  )
}

Unassigned.propTypes = {
  name: PropTypes.string.isRequired
}

export default Unassigned
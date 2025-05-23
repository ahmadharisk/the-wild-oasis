import PropTypes from "prop-types";

function Empty({ resource }) {
  return <p>No {resource} could be found.</p>;
}

Empty.propTypes = {
  resource: PropTypes.string
}

export default Empty;

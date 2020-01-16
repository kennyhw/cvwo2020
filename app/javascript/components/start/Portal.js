import React from "react"
import PropTypes from "prop-types"

class Portal extends React.Component {
  render () {
    return (
      <React.Fragment>
        <h2>Welcome to CheckMark!</h2>
        <a href="/categories">{this.props.subject}</a>
      </React.Fragment>
    );
  }
}

Portal.propTypes = {
  subject: PropTypes.string
};

export default Portal

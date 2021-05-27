import React, { Component } from 'react';
import Snackbar from './Snackbar';

class UndefinedErrorSnackbar extends Component {
  render() {
    // const message = `Backend Server Problem. Error Code: ${this.props.error_code}`;
    const message = "The application has encountered an unknown error. It doesn't appear to have affected your data, but our technical staff have been automatically notified and will be looking into this with the utmost urgency.";

    return (
      <Snackbar
        place="tc"
        open
        color="danger"
        message={message}
      />
    );
  }
}
export default UndefinedErrorSnackbar;

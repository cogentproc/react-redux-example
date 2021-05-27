import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as applicationStatusActions from 'actions/ApplicationStatusActions';
import ActiveTaskComp from './ActiveTask/ActiveTaskComp';

class ActiveTask extends Component {
  render() {
    const { applicationStatus } = this.props;
    const {
      getApplicationStatus,
    } = this.props.applicationStatusActions;

    return (
      <ActiveTaskComp
        application_id={this.props.application_id}
        role_id={this.props.role_id}
        getApplicationStatus={getApplicationStatus}
        application_status_list={applicationStatus.application_status_list === undefined ? [] : applicationStatus.application_status_list}
        classes={this.props}
      />
    );
  }
}
function mapStateToProps(state) {
  return {
    applicationStatus: state.applicationStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    applicationStatusActions: bindActionCreators(applicationStatusActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ActiveTask);

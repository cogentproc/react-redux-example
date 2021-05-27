import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as applicationStatusActions from 'actions/ApplicationStatusActions';
import * as applicationActions from 'actions/ApplicationActions';
import * as defaultActions from 'actions/DefaultActions';
import UndefinedErrorSnackbar from 'components/Snackbar/UndefinedErrorSnackbar';
import ApplicationStatusComp from './ApplicationStatus/ApplicationStatusComp';

class ApplicationStatus extends Component {
  render() {
    const { classes } = this.props;
    const { applicationStatus, application, defaultStates } = this.props;
    const {
      getApplicationLog,
      getApplicationStatus,
      getRole,
      setCurrentRoleTitle,
    } = this.props.applicationStatusActions;

    const { getApplication } = this.props.applicationActions;

    return (
      <div>
        {defaultStates.unDefinedError
          ? <UndefinedErrorSnackbar error_code={defaultStates.error} /> : ''}
        <ApplicationStatusComp
          application_id={this.props.match.params.application_id}
          role_id={this.props.match.params.role_id}
          setCurrentRoleTitle={setCurrentRoleTitle}
          getApplication={getApplication}
          getRole={getRole}
          getApplicationStatus={getApplicationStatus}
          getApplicationLog={getApplicationLog}
          application_status_list={applicationStatus.application_status_list}
          application_log={applicationStatus.application_log}
          role={applicationStatus.role}
          application={application.application}
        // refreshApplicationDetailForm={applicationDetail.refreshApplicationDetailForm}
          classes={classes}
        />
      </div>

    );
  }
}
function mapStateToProps(state) {
  return {
    applicationStatus: state.applicationStatus,
    application: state.application,
    defaultStates: state.defaultStates,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    applicationStatusActions: bindActionCreators(applicationStatusActions, dispatch),
    applicationActions: bindActionCreators(applicationActions, dispatch),
    defaultActions: bindActionCreators(defaultActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationStatus);

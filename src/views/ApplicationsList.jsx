import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as applicationsListActions from 'actions/ApplicationsListActions';
import * as defaultActions from 'actions/DefaultActions';
import * as lookupActions from 'actions/LookupActions';
import UndefinedErrorSnackbar from 'components/Snackbar/UndefinedErrorSnackbar';
import ApplicationsListComp from './ApplicationsList/ApplicationsListComp';

class ApplicationsList extends Component {
  render() {
    const { classes } = this.props;
    const { applicationsList, defaultStates, lookup } = this.props;
    const {
      isAllowedToCreateApplication,
      createApplication,
      getActiveApplications,
      getArchiveApplications,
      resetApplicationDetail,
    } = this.props.applicationsListActions;
    const { getWorkflowByUser } = this.props.lookupActions;

    return (
      <div>
        {defaultStates.unDefinedError
          ? <UndefinedErrorSnackbar error_code={defaultStates.error} /> : ''}
        <ApplicationsListComp
          getWorkflowByUser={getWorkflowByUser}
          workflow={lookup.workflow === undefined ? [] : lookup.workflow}
          isAllowedToCreateApplication={isAllowedToCreateApplication}
          createApplication={createApplication}
          resetApplicationDetail={resetApplicationDetail}
          getActiveApplications={getActiveApplications}
          getArchiveApplications={getArchiveApplications}
          active_application_list={applicationsList.active_application_list === undefined ? [] : applicationsList.active_application_list}
          archive_application_list={applicationsList.archive_application_list === undefined ? [] : applicationsList.archive_application_list}
          refreshApplication={applicationsList.refreshApplication}
          isAllowed={applicationsList.isAllowed === '' ? false : applicationsList.isAllowed.is_allowed}
          requesting={applicationsList.requesting}
          message={applicationsList.message}
          classes={classes}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    applicationsList: state.applicationsList,
    defaultStates: state.defaultStates,
    lookup: state.lookup,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    applicationsListActions: bindActionCreators(applicationsListActions, dispatch),
    defaultActions: bindActionCreators(defaultActions, dispatch),
    lookupActions: bindActionCreators(lookupActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsList);

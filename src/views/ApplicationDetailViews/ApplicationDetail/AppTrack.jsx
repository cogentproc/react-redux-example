import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as applicationStatusActions from 'actions/ApplicationStatusActions';
import AppTrackComp from './AppTrack/AppTrackComp';

class AppTracking extends Component {
  render() {
    const { applicationStatus } = this.props;
    const { getApplicationLog } = this.props.applicationStatusActions;

    return (
      <AppTrackComp
        application_id={this.props.application_id}
        role_id={this.props.role_id}
        getApplicationLog={getApplicationLog}
        application_log={applicationStatus.application_log === undefined ? [] : applicationStatus.application_log}
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
export default connect(mapStateToProps, mapDispatchToProps)(AppTracking);

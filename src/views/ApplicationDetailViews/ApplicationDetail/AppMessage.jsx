import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as applicationDetailActions from 'actions/ApplicationDetailActions';
import * as applicationActions from 'actions/ApplicationActions';
import AppMessageComp from './AppMessage/AppMessageComp';

class AppMessage extends Component {
  render() {
    const { applicationDetail } = this.props;
    const { getApplicationMessages, getApplicationDetailForm } = this.props.applicationDetailActions;
    const { getApplication } = this.props.applicationActions;

    return (
      <AppMessageComp
        application_id={this.props.match.params.application_id}
        role_id={this.props.match.params.role_id}
        getApplicationMessages={getApplicationMessages}
        application_detail_messages={applicationDetail.application_detail_messages}
        getApplication={getApplication}
        getApplicationDetailForm={getApplicationDetailForm}
      />
    );
  }
}
function mapStateToProps(state) {
  return {
    applicationDetail: state.applicationDetail,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    applicationDetailActions: bindActionCreators(applicationDetailActions, dispatch),
    applicationActions: bindActionCreators(applicationActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AppMessage);

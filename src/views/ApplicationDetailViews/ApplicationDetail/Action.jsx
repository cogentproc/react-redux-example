import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as applicationDetailActions from 'actions/ApplicationDetailActions';
import * as applicationActions from 'actions/ApplicationActions';
import ActionComp from './Action/ActionComp';

class Action extends Component {
  render() {
    const { applicationDetail,application } = this.props;
    const {
        getApplicationDetailForm,
        postApplicationDetailAction,
    } = this.props.applicationDetailActions;
    const { getApplication } = this.props.applicationActions;

    return (
      <ActionComp
        application_id={this.props.match.params.application_id}
        role_id={this.props.role_id}
        getApplicationDetailForm={getApplicationDetailForm}
        getApplication={getApplication}
        postApplicationDetailAction={postApplicationDetailAction}
        application={application.application}
        application_detail_form={applicationDetail.application_detail_form}
        classes={this.props}
      />
    );
  }
}
function mapStateToProps(state) {
  return {
    applicationDetail : state.applicationDetail,
    application: state.application,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    applicationDetailActions: bindActionCreators(applicationDetailActions, dispatch),
    applicationActions: bindActionCreators(applicationActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Action);
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as applicationDetailActions from 'actions/ApplicationDetailActions';
import AppRoleComp from './AppRole/AppRoleComp';

class AppRoles extends Component {
  render() {
    const { applicationDetail } = this.props;
    const { getApplicationRoles } = this.props.applicationDetailActions;

    return (
      <AppRoleComp
        application_id={this.props.application_id}
        role_id={this.props.role_id}
        refreshApplicationDetailForm={this.props.refreshApplicationDetailForm}
        getApplicationRoles={getApplicationRoles}
        application_roles={applicationDetail.application_roles === undefined ? [] : applicationDetail.application_roles}
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
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AppRoles);

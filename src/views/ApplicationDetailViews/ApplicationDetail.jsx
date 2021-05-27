import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as applicationDetailActions from 'actions/ApplicationDetailActions';
import * as applicationActions from 'actions/ApplicationActions';
import * as defaultActions from 'actions/DefaultActions';
import UndefinedErrorSnackbar from 'components/Snackbar/UndefinedErrorSnackbar';
import ApplicationDetailComp from './ApplicationDetail/ApplicationDetailComp';

class ApplicationDetail extends Component {
  render() {
    const { classes } = this.props;
    const { applicationDetail, application, defaultStates } = this.props;
    const {
      getApplicationDetailForm,
      getApplicationMessages,
      postApplicationDetailAction,
      getApplicationRoles,
      setFormSuccessMsg,
      setFormErrorMsg,
      setFields,
      setShowForm,
      resetRequesting,
      // setWeekSelectField,
    } = this.props.applicationDetailActions;

    const { getApplication } = this.props.applicationActions;

    if (applicationDetail.redirectApplicationDetailAction) {
      applicationDetail.redirectApplicationDetailAction = false;
      var linkStr = `/status/${this.props.match.params.application_id}/${this.props.match.params.role_id}`;
      return <Redirect to={linkStr} />;
    }
    
    return (
      <div>
        {defaultStates.unDefinedError
          ? <UndefinedErrorSnackbar error_code={defaultStates.error} /> : ''}
        <ApplicationDetailComp
          application_id={this.props.match.params.application_id}
          role_id={this.props.match.params.role_id}
          getApplication={getApplication}
          // setWeekSelectField={setWeekSelectField}
          setFormSuccessMsg={setFormSuccessMsg}
          setFormErrorMsg={setFormErrorMsg}
          setFields={setFields}
          setShowForm={setShowForm}
          showForm={applicationDetail.showForm}
          getApplicationRoles={getApplicationRoles}
          getApplicationDetailForm={getApplicationDetailForm}
          getApplicationMessages={getApplicationMessages}
          postApplicationDetailAction={postApplicationDetailAction}
          application_detail_form={applicationDetail.application_detail_form}
          application_detail_messages={applicationDetail.application_detail_messages}
          application_roles={applicationDetail.application_roles}
          application={application.application}
          refreshApplicationDetailForm={applicationDetail.refreshApplicationDetailForm}
          refreshApplicationRoles={applicationDetail.refreshApplicationRoles}
          showFormSuccessMsg={applicationDetail.showFormSuccessMsg}
          showFormErrorMsg={applicationDetail.showFormErrorMsg}
          fields={applicationDetail.fields}
          requesting={applicationDetail.requesting}
          resetRequesting={resetRequesting}
          // weekSelect={applicationDetail.weekSelect}
          classes={classes}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    applicationDetail: state.applicationDetail,
    application: state.application,
    defaultStates: state.defaultStates,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    applicationDetailActions: bindActionCreators(applicationDetailActions, dispatch),
    applicationActions: bindActionCreators(applicationActions, dispatch),
    defaultActions: bindActionCreators(defaultActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationDetail);

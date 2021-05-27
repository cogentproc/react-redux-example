import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as applicationActions from 'actions/ApplicationActions';
import * as applicationDetailActions from 'actions/ApplicationDetailActions';
import Form51Comp from './Form/Form51Comp';
import Form52Comp from './Form/Form52Comp';
import Form53Comp from './Form/Form53Comp';

const Form = (props) => {
  const { applicationDetail, application } = props;
  const { getApplicationDetailForm } = props.applicationDetailActions;

 
  let component = <div>Invalid FormID</div>;
  switch (props.match.params.form_id) {
    case "51":
      component = <Form51Comp
        application_id={application.application.id}
        application={application.application}
        role_id={props.role_id}
        form_id={props.form_id}
        getApplicationDetailForm={getApplicationDetailForm}
        form={props.applicationDetail.application_detail_form.forms !== undefined ? props.applicationDetail.application_detail_form.forms.filter((form) => form.id === parseInt(props.match.params.form_id, 10))[0] : ""}
        application_detail_form={props.applicationDetail.application_detail_form}
        classes={props}
      />;
      break;
    case "52":
      component = <Form52Comp
        application_id={application.application.id}
        application={application.application}
        role_id={props.role_id}
        form_id={props.form_id}
        getApplicationDetailForm={getApplicationDetailForm}
        form={props.applicationDetail.application_detail_form.forms !== undefined ? props.applicationDetail.application_detail_form.forms.filter((form) => form.id === parseInt(props.match.params.form_id, 10))[0] : ""}
        application_detail_form={props.applicationDetail.application_detail_form}
        classes={props}
      />;
      break;
    case "53":
      component = <Form53Comp
        application_id={application.application.id}
        application={application.application}
        role_id={props.role_id}
        form_id={props.form_id}
        getApplicationDetailForm={getApplicationDetailForm}
        form={props.applicationDetail.application_detail_form.forms !== undefined ? props.applicationDetail.application_detail_form.forms.filter((form) => form.id === parseInt(props.match.params.form_id, 10))[0] : ""}
        application_detail_form={props.applicationDetail.application_detail_form}
        classes={props}
      />;
      break;
  }
  return (
    <div>
      {component}
    </div>
  );
};
function mapStateToProps(state) {
  return {
    applicationDetail: state.applicationDetail,
    application: state.application,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    applicationDetailActions: bindActionCreators(applicationDetailActions, dispatch),
    applicationActions: bindActionCreators(applicationActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Form);
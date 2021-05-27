import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as lookupActions from 'actions/LookupActions';
import * as applicationDetailActions from 'actions/ApplicationDetailActions';
import FormSaveComp from './FormSave/FormSaveComp';

class FormSave extends Component {
  render() {
    const { classes } = this.props;
    const { lookup } = this.props;
    const {
      postApplicationDetail,
      postApplicationDetailCommittee,
      setShowForm,
    } = this.props.applicationDetailActions;
    return (
      <FormSaveComp
        submitableFormList={this.props.submitableFormList}
        setShowForm={setShowForm}
        postApplicationDetail={postApplicationDetail}
        postApplicationDetailCommittee={postApplicationDetailCommittee}
        fields={this.props.fields}
        role_user={lookup.role_user === undefined ? [] : lookup.role_user}
        form_id={this.props.form_id}
        task_id={this.props.task_id}
        role_id={this.props.role_id}
        application_id={this.props.application_id}
        share_file={lookup.share_file}
        weekSelect={lookup.weekSelect}
        requesting={this.props.requesting}
        classes={classes}
      />
    );
  }
}
function mapStateToProps(state) {
  return {
    lookup: state.lookup,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    lookupActions: bindActionCreators(lookupActions, dispatch),
    applicationDetailActions: bindActionCreators(applicationDetailActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormSave);

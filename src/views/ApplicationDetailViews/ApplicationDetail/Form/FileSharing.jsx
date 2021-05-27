import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as lookupActions from 'actions/LookupActions';
import FileSharingComp from './FileSharing/FileSharingComp';

class FileSharing extends Component {
  render() {
    const { classes } = this.props;
    const { lookup } = this.props;
    const { setShareFile, getFileSharingServer } = this.props.lookupActions;

    return (
      <FileSharingComp
        getFileSharingServer={getFileSharingServer}
        application_id={this.props.application_id}
        field_committee_id={this.props.field_committee_id}
        setShareFile={setShareFile}
        // user={lookup.user}
        field_role_id={this.props.field_role_id}
        role_id={this.props.role_id}
        field_id={this.props.field_id}
        share_file={lookup.share_file}
        field_required={this.props.field_required}
        field_value={this.props.field_value === '' || this.props.field_value === undefined ? [] : this.props.field_value}
        field_label={this.props.field_label}
        filesharing_list={lookup.filesharing_list === undefined ? [] : lookup.filesharing_list}
        fields={this.props.fields}
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileSharing);

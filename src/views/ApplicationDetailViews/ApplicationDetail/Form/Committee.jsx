import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as lookupActions from 'actions/LookupActions';
import * as userActions from 'actions/UserActions';
import CommitteeComp from './Committee/CommitteeComp';

class Committee extends Component {
  render() {
    const { classes } = this.props;
    const { lookup, user } = this.props;
    const { getAdhocRoles, setRoleUser, setSelectedRoleID } = this.props.lookupActions;
    const { setSelectedUser } = this.props.userActions;

    return (
      <CommitteeComp
        getAdhocRoles={getAdhocRoles}
        setSelectedRoleID={setSelectedRoleID}
        field_committee_id={this.props.field_committee_id}
        setRoleUser={setRoleUser}
        role_list={lookup.role_list === undefined ? [] : lookup.role_list}
        field_required={this.props.field_required}
        field_value={this.props.field_value === '' || this.props.field_value === undefined ? [] : this.props.field_value}
        field_label={this.props.field_label}
        form_checkable={this.props.form_checkable}
        role_user={lookup.role_user === undefined ? [] : lookup.role_user}
        selected_user={user.selected_user}
        selected_user_id={user.selected_user_id}
        selected_role_id={lookup.selected_role_id}
        message={lookup.message}
        setSelectedUser={setSelectedUser}
        classes={classes}
      />
    );
  }
}
function mapStateToProps(state) {
  return {
    lookup: state.lookup,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    lookupActions: bindActionCreators(lookupActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Committee);

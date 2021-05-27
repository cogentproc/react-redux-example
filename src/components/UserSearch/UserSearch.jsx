import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from 'actions/UserActions';
import UserSearchComp from './UserSearchComp';

class UserSearch extends Component {
  render() {
    const { classes } = this.props;
    const { user } = this.props;
    const { SearchUser, setSelectedUser } = this.props.userActions;

    return (
      <UserSearchComp
        SearchUser={SearchUser}
        setSelectedUser={setSelectedUser}
        user_type={this.props.user_type}
        search_user_list={user.search_user_list.list === undefined ? [] : user.search_user_list.list}
        classes={classes}
      />
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);

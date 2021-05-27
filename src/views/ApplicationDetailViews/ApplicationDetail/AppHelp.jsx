import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as lookupActions from 'actions/LookupActions';
import AppHelpComp from './AppHelp/AppHelpComp';

class AppHelp extends Component {
  render() {
    const { lookup } = this.props;
    const { getWorkflowByUser } = this.props.lookupActions;

    return (
      <AppHelpComp
        getWorkflowByUser={getWorkflowByUser}
        workflow={lookup.workflow === undefined ? [] : lookup.workflow}
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
export default connect(mapStateToProps, mapDispatchToProps)(AppHelp);

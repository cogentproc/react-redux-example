import { combineReducers } from 'redux';
import defaultStates from './defaultStates';
import login from './login';
import applicationsList from './applicationsList';
import application from './application';
import lookup from './lookup';
import applicationStatus from './applicationStatus';
import applicationDetail from './applicationDetail';
import network from './network';

import user from './user';

export default combineReducers({
  defaultStates,
  login,
  applicationsList,
  application,
  lookup,
  applicationDetail,
  applicationStatus,
  network,

  user,
});

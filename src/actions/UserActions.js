import API from '../Api/api.js';

import {
  commonBackendCall, getConfig, getNetworkAdminConfig, getAdminConfig,
} from '../Api/common.js';
import {
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
  SET_SELECTED_USER,
} from '../constants/User';

export function SearchUser(userType, searchStr) {
  if (userType === 'networkadmin') {
    return commonBackendCall(
      SEARCH_USER_REQUEST,
      SEARCH_USER_SUCCESS,
      SEARCH_USER_FAILURE,
      API.get(`find-users?search=${searchStr}`, getNetworkAdminConfig()),
    );
  } if (userType === 'admin') {
    return commonBackendCall(
      SEARCH_USER_REQUEST,
      SEARCH_USER_SUCCESS,
      SEARCH_USER_FAILURE,
      API.get(`find-users-for-admin?search=${searchStr}`, getAdminConfig()),
    );
  }
  return commonBackendCall(
    SEARCH_USER_REQUEST,
    SEARCH_USER_SUCCESS,
    SEARCH_USER_FAILURE,
    API.get(`find-users-user?search=${searchStr}`, getConfig()),
  );
}

export function setSelectedUser(user, userID) {
  return (dispatch) => {
    dispatch({
      type: SET_SELECTED_USER,
      payload: {
        user, userID,
      },
    });
  };
}

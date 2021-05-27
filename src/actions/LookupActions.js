import API from '../Api/api.js';

import { commonBackendCall, getConfig } from '../Api/common.js';
import {
  GET_ADHOC_ROLE_REQUEST,
  GET_ADHOC_ROLE_SUCCESS,
  GET_ADHOC_ROLE_FAILURE,
  GET_FILESHARING_REQUEST,
  GET_FILESHARING_SUCCESS,
  GET_FILESHARING_FAILURE,
  SET_ROLE_USER,
  SET_SHARE_FILE,
  SET_WEEK_SELECT_FIELD,
  GET_WORKFLOW_USER_REQUEST,
  GET_WORKFLOW_USER_SUCCESS,
  GET_WORKFLOW_USER_FAILURE,
  SET_SELECTED_ROLE_ID,
} from '../constants/Lookup';

import {
  SET_SELECTED_USER,
} from '../constants/User';

export function getWorkflowByUser() {
  return commonBackendCall(
    GET_WORKFLOW_USER_REQUEST,
    GET_WORKFLOW_USER_SUCCESS,
    GET_WORKFLOW_USER_FAILURE,
    API.get('workflows-by-user', getConfig()),
  );
}

export function getAdhocRoles() {
  return commonBackendCall(
    GET_ADHOC_ROLE_REQUEST,
    GET_ADHOC_ROLE_SUCCESS,
    GET_ADHOC_ROLE_FAILURE,
    API.get('roles-adhoc-user', getConfig()),
  );
}
export function getFileSharingServer(strKey, fieldID) {
  return commonBackendCall(
    GET_FILESHARING_REQUEST,
    GET_FILESHARING_SUCCESS,
    GET_FILESHARING_FAILURE,
    API.get(`intg-ext-apis/file-sharing?key=${strKey}&field_id=${fieldID}`, getConfig()),
  );
}

export function setRoleUser(value) {
  return (dispatch) => {
    dispatch({
      type: SET_ROLE_USER,
      payload: {
        value,
      },
    });
  };
}

export function setShareFile(value) {
  return (dispatch) => {
    dispatch({
      type: SET_SHARE_FILE,
      payload: {
        value,
      },
    });
  };
}

export function setWeekSelectField(value) {
  return (dispatch) => {
    dispatch({
      type: SET_WEEK_SELECT_FIELD,
      payload: {
        value,
      },
    });
  };
}

export function setSelectedRoleID(value) {
  var user = '';
  var userID = 0;
  return (dispatch) => {
    dispatch({
      type: SET_SELECTED_ROLE_ID,
      payload: {
        value,
      },
    });
    dispatch({
      type: SET_SELECTED_USER,
      payload: {
        user, userID,
      },
    });
  };
}

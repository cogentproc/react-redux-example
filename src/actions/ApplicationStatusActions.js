import API from '../Api/api.js';

import { commonBackendCall, getConfig } from '../Api/common.js';
import {
  GET_APPLICATION_STATUS_REQUEST,
  GET_APPLICATION_STATUS_SUCCESS,
  GET_APPLICATION_STATUS_FAILURE,
  GET_ROLE_STATUS_REQUEST,
  GET_ROLE_STATUS_SUCCESS,
  GET_ROLE_STATUS_FAILURE,
  GET_APPLICATION_LOG_REQUEST,
  GET_APPLICATION_LOG_SUCCESS,
  GET_APPLICATION_LOG_FAILURE,
  SET_CURRENT_ROLE_TITLE,
} from '../constants/ApplicationStatus';

export function setCurrentRoleTitle(value) {
  return (dispatch) => {
    dispatch({
      type: SET_CURRENT_ROLE_TITLE,
      payload: {
        value,
      },
    });
  };
}
export function getApplicationStatus(applicationID, roleID) {
  return commonBackendCall(
    GET_APPLICATION_STATUS_REQUEST,
    GET_APPLICATION_STATUS_SUCCESS,
    GET_APPLICATION_STATUS_FAILURE,
    API.get(`application-status/${applicationID}/${roleID}`, getConfig()),
  );
}

export function getApplicationLog(applicationID) {
  return commonBackendCall(
    GET_APPLICATION_LOG_REQUEST,
    GET_APPLICATION_LOG_SUCCESS,
    GET_APPLICATION_LOG_FAILURE,
    API.get(`application-track/${applicationID}`, getConfig()),
  );
}

export function getRole(roleID) {
  return commonBackendCall(
    GET_ROLE_STATUS_REQUEST,
    GET_ROLE_STATUS_SUCCESS,
    GET_ROLE_STATUS_FAILURE,
    API.get(`roles/${roleID}`, getConfig()),
  );
}

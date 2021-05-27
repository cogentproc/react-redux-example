import API from '../Api/api.js';

import { commonBackendCall, getConfig } from '../Api/common.js';
import {
  GET_APPLICATION_FORM_REQUEST,
  GET_APPLICATION_FORM_SUCCESS,
  GET_APPLICATION_FORM_FAILURE,
  GET_APPLICATION_ACTION_REQUEST,
  GET_APPLICATION_ACTION_SUCCESS,
  GET_APPLICATION_ACTION_FAILURE,
  POST_APPLICATION_ACTION_REQUEST,
  POST_APPLICATION_ACTION_SUCCESS,
  POST_APPLICATION_ACTION_FAILURE,
  POST_APPLICATION_REQUEST,
  POST_APPLICATION_SUCCESS,
  POST_APPLICATION_FAILURE,
  POST_APPLICATION_COMMITTEE_REQUEST,
  POST_APPLICATION_COMMITTEE_SUCCESS,
  POST_APPLICATION_COMMITTEE_FAILURE,
  GET_APPLICATION_MESSAGES_REQUEST,
  GET_APPLICATION_MESSAGES_SUCCESS,
  GET_APPLICATION_MESSAGES_FAILURE,
  GET_APPLICATION_ROLES_REQUEST,
  GET_APPLICATION_ROLES_SUCCESS,
  GET_APPLICATION_ROLES_FAILURE,
  SET_FORM_SUCCESS_MSG,
  SET_FORM_ERROR_MSG,
  SET_FIELDS,
  SET_SHOW_FORM,
} from '../constants/ApplicationDetail';

export function setShowForm(type, form_id) {
  return (dispatch) => {
    dispatch({
      type: SET_SHOW_FORM,
      payload: {
        type,
        form_id,
      },
    });
  };
}

export function setFields(value) {
  return (dispatch) => {
    dispatch({
      type: SET_FIELDS,
      payload: {
        value,
      },
    });
  };
}

export function setFormSuccessMsg(value) {
  return (dispatch) => {
    dispatch({
      type: SET_FORM_SUCCESS_MSG,
      payload: {
        value,
      },
    });
  };
}

export function setFormErrorMsg(value) {
  return (dispatch) => {
    dispatch({
      type: SET_FORM_ERROR_MSG,
      payload: {
        value,
      },
    });
  };
}

export function getApplicationRoles(applicationID, roleID) {
  return commonBackendCall(
    GET_APPLICATION_ROLES_REQUEST,
    GET_APPLICATION_ROLES_SUCCESS,
    GET_APPLICATION_ROLES_FAILURE,
    API.get(`application-roles/${applicationID}/${roleID}`, getConfig()),
  );
}
export function getApplicationDetailForm(applicationID, roleID) {
  return commonBackendCall(
    GET_APPLICATION_FORM_REQUEST,
    GET_APPLICATION_FORM_SUCCESS,
    GET_APPLICATION_FORM_FAILURE,
    API.get(`application-detail-forms/${applicationID}/${roleID}`, getConfig()),
  );
}

export function getApplicationDetailAction(applicationID, roleID) {
  return commonBackendCall(
    GET_APPLICATION_ACTION_REQUEST,
    GET_APPLICATION_ACTION_SUCCESS,
    GET_APPLICATION_ACTION_FAILURE,
    API.get(`application-detail-actions/${applicationID}/${roleID}`, getConfig()),
  );
}

export function postApplicationDetail(applicationID, obj) {
  return commonBackendCall(
    POST_APPLICATION_REQUEST,
    POST_APPLICATION_SUCCESS,
    POST_APPLICATION_FAILURE,
    API.post(`application-details/${applicationID}`, obj, getConfig()),
  );
}

export function postApplicationDetailCommittee(applicationID, obj) {
  return commonBackendCall(
    POST_APPLICATION_COMMITTEE_REQUEST,
    POST_APPLICATION_COMMITTEE_SUCCESS,
    POST_APPLICATION_COMMITTEE_FAILURE,
    API.post(`application-details-committee/${applicationID}`, obj, getConfig()),
  );
}

export function postApplicationDetailAction(applicationID, taskID, actionID, obj) {
  return commonBackendCall(
    POST_APPLICATION_ACTION_REQUEST,
    POST_APPLICATION_ACTION_SUCCESS,
    POST_APPLICATION_ACTION_FAILURE,
    API.post(`application-detail-actions/${applicationID}/${taskID}/${actionID}`, obj, getConfig()),
  );
}

export function getApplicationMessages(applicationID, taskID) {
  return commonBackendCall(
    GET_APPLICATION_MESSAGES_REQUEST,
    GET_APPLICATION_MESSAGES_SUCCESS,
    GET_APPLICATION_MESSAGES_FAILURE,
    API.get(`application-messages/${applicationID}/${taskID}`, getConfig()),
  );
}

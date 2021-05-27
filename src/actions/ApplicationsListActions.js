import API from '../Api/api.js';

import { commonBackendCall, getConfig } from '../Api/common.js';
import {
  POST_APPLICATION_CREATE_REQUEST,
  POST_APPLICATION_CREATE_SUCCESS,
  POST_APPLICATION_CREATE_FAILURE,
  GET_ACTIVE_APPLICATION_REQUEST,
  GET_ACTIVE_APPLICATION_SUCCESS,
  GET_ACTIVE_APPLICATION_FAILURE,
  GET_ARCHIVE_APPLICATION_REQUEST,
  GET_ARCHIVE_APPLICATION_SUCCESS,
  GET_ARCHIVE_APPLICATION_FAILURE,
  GET_ISALLOWED_APPLICATION_REQUEST,
  GET_ISALLOWED_APPLICATION_SUCCESS,
  GET_ISALLOWED_APPLICATION_FAILURE,
} from '../constants/ApplicationsList';
import {
  RESET_APPLICATION_DETAIL,
} from '../constants/ApplicationDetail';

export function isAllowedToCreateApplication() {
  return commonBackendCall(
    GET_ISALLOWED_APPLICATION_REQUEST,
    GET_ISALLOWED_APPLICATION_SUCCESS,
    GET_ISALLOWED_APPLICATION_FAILURE,
    API.get('applications/is-allowed', getConfig()),
  );
}
export function createApplication(obj) {
  return commonBackendCall(
    POST_APPLICATION_CREATE_REQUEST,
    POST_APPLICATION_CREATE_SUCCESS,
    POST_APPLICATION_CREATE_FAILURE,
    API.post('applications', obj, getConfig()),
  );
}

export function getActiveApplications() {
  return commonBackendCall(
    GET_ACTIVE_APPLICATION_REQUEST,
    GET_ACTIVE_APPLICATION_SUCCESS,
    GET_ACTIVE_APPLICATION_FAILURE,
    API.get('active-applications', getConfig()),
  );
}

export function resetApplicationDetail() {
  return (dispatch) => {
    dispatch({
      type: RESET_APPLICATION_DETAIL,
    });
  };
}
export function getArchiveApplications() {
  return commonBackendCall(
    GET_ARCHIVE_APPLICATION_REQUEST,
    GET_ARCHIVE_APPLICATION_SUCCESS,
    GET_ARCHIVE_APPLICATION_FAILURE,
    API.get('archive-applications', getConfig()),
  );
}

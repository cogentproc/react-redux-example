import API from '../Api/api.js';

import { commonBackendCall, getConfig } from '../Api/common.js';
import {
  GET_APPLICATION_REQUEST,
  GET_APPLICATION_SUCCESS,
  GET_APPLICATION_FAILURE,
} from '../constants/Application';

export function getApplication(applicationID) {
  return commonBackendCall(
    GET_APPLICATION_REQUEST,
    GET_APPLICATION_SUCCESS,
    GET_APPLICATION_FAILURE,
    API.get(`applications/${applicationID}`, getConfig()),
  );
}

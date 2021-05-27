import {
  GET_APPLICATION_STATUS_REQUEST,
  GET_APPLICATION_STATUS_SUCCESS,
  GET_APPLICATION_STATUS_FAILURE,
  GET_APPLICATION_LOG_REQUEST,
  GET_APPLICATION_LOG_SUCCESS,
  GET_APPLICATION_LOG_FAILURE,
  GET_ROLE_STATUS_REQUEST,
  GET_ROLE_STATUS_SUCCESS,
  GET_ROLE_STATUS_FAILURE,
} from '../constants/ApplicationStatus';

const initialState = {
  requesting: false,
  message: '',
  application_status_list: [],
  application_log: [],
  role: '',
  refreshApplicationStatus: false,
};

export default function applicationStatus(state = initialState, action) {
  switch (action.type) {
    case GET_APPLICATION_STATUS_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
        refreshApplicationStatus: false,
      };

    case GET_APPLICATION_STATUS_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        requesting: action.payload.requesting,
        application_status_list: action.payload.data,
      };

    case GET_APPLICATION_STATUS_FAILURE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
      };

    case GET_APPLICATION_LOG_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
        refreshApplicationStatus: false,
      };

    case GET_APPLICATION_LOG_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        requesting: action.payload.requesting,
        application_log: action.payload.data,
      };

    case GET_APPLICATION_LOG_FAILURE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
      };

    case GET_ROLE_STATUS_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
      };

    case GET_ROLE_STATUS_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        requesting: action.payload.requesting,
        role: action.payload.data,
      };

    case GET_ROLE_STATUS_FAILURE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
      };

    default:
      return state;
  }
}

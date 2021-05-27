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

const initialState = {
  requesting: false,
  message: '',
  isAllowed: '',
  active_application_list: [],
  archive_application_list: [],
  refreshApplication: false,
};

export default function applicationsList(state = initialState, action) {
  switch (action.type) {
    case GET_ISALLOWED_APPLICATION_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
        refreshApplication: false,
      };

    case GET_ISALLOWED_APPLICATION_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        requesting: action.payload.requesting,
        isAllowed: action.payload.data,
      };

    case GET_ISALLOWED_APPLICATION_FAILURE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
      };

    case POST_APPLICATION_CREATE_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
      };

    case POST_APPLICATION_CREATE_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        requesting: action.payload.requesting,
        refreshApplication: true,
      };

    case POST_APPLICATION_CREATE_FAILURE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
      };

    case GET_ACTIVE_APPLICATION_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
        refreshApplication: false,
      };

    case GET_ACTIVE_APPLICATION_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        requesting: action.payload.requesting,
        active_application_list: action.payload.data,
      };

    case GET_ACTIVE_APPLICATION_FAILURE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
      };

    case GET_ARCHIVE_APPLICATION_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
        refreshApplication: false,
      };

    case GET_ARCHIVE_APPLICATION_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        requesting: action.payload.requesting,
        archive_application_list: action.payload.data,
      };

    case GET_ARCHIVE_APPLICATION_FAILURE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
      };
    default:
      return state;
  }
}

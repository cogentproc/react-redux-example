import {
  GET_APPLICATION_REQUEST,
  GET_APPLICATION_SUCCESS,
  GET_APPLICATION_FAILURE,
} from '../constants/Application';

import {
  GET_ACTIVE_APPLICATION_REQUEST,
} from '../constants/ApplicationsList';

const initialState = {
  requesting: false,
  message: '',
  application: '',
};

export default function application(state = initialState, action) {
  switch (action.type) {
    case GET_ACTIVE_APPLICATION_REQUEST:
      return {
        ...state,
        application: '',
      };

    case GET_APPLICATION_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
      };

    case GET_APPLICATION_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        requesting: action.payload.requesting,
        application: action.payload.data,
      };

    case GET_APPLICATION_FAILURE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
      };

    default:
      return state;
  }
}

import {
  AUTHORIZATION_REQUIRED,
  RESET_UNDEFINED_ERROR,
  UNDEFINED_ERROR,
} from '../constants/Default';

const initialState = {
  unDefinedError: false,
  error: '',
};

export default function defaultStates(state = initialState, action) {
  switch (action.type) {
    case AUTHORIZATION_REQUIRED:
      localStorage.removeItem('token');
      window.location = '/';
      return { ...state };

    case RESET_UNDEFINED_ERROR:
      return {
        ...state,
        unDefinedError: false,
        error: '',
      };

    case UNDEFINED_ERROR:
      return {
        ...state,
        unDefinedError: true,
        error: action.payload.error,
      };

    default:
      return state;
  }
}

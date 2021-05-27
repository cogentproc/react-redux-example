import {
  GET_NETWORK_REQUEST,
  GET_NETWORK_SUCCESS,
  GET_NETWORK_FAILURE,
} from '../constants/Network';

const initialState = {
  message: '',
  requesting: false,
  name: '',
};

export default function network(state = initialState, action) {
  switch (action.type) {
    case GET_NETWORK_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: '',
      };

    case GET_NETWORK_SUCCESS:
      return {
        ...state,
        requesting: action.payload.requesting,
        name: action.payload.data,
        message: '',
      };

    case GET_NETWORK_FAILURE:
      return {
        ...state,
        message: action.payload.message,
      };

    default:
      return state;
  }
}

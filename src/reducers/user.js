import {
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
  SET_SELECTED_USER,
} from '../constants/User';

const initialState = {
  requesting: false,
  message: '',
  search_user_list: [],
  selected_user: '',
  selected_user_id: 0,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_USER:
      return {
        ...state,
        message: '',
        selected_user: action.payload.user,
        selected_user_id: action.payload.userID,
      };

    case SEARCH_USER_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: '',
      };

    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
        search_user_list: action.payload.data,
      };

    case SEARCH_USER_FAILURE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
      };
    default:
      return state;
  }
}

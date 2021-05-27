import {
  GET_ADHOC_ROLE_REQUEST,
  GET_ADHOC_ROLE_SUCCESS,
  GET_ADHOC_ROLE_FAILURE,
  SET_ROLE_USER,
  SET_SHARE_FILE,
  GET_FILESHARING_REQUEST,
  GET_FILESHARING_SUCCESS,
  GET_FILESHARING_FAILURE,
  SET_WEEK_SELECT_FIELD,
  GET_WORKFLOW_USER_REQUEST,
  GET_WORKFLOW_USER_SUCCESS,
  GET_WORKFLOW_USER_FAILURE,
  SET_SELECTED_ROLE_ID,
} from '../constants/Lookup';

import {
  SET_SELECTED_USER,
} from '../constants/User';

const initialState = {
  requesting: false,
  message: '',
  filesharing_list: [],
  role_list: [],
  role_user: [],
  share_file: [],
  refreshUser: false,
  weekSelect: '',
  workflow: '',
  selected_role_id: 0,
  message: '',
};

export default function lookup(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_USER:
      var tempMessage = '';
      var tempRoleUser = state.role_user;
      var objIndex = tempRoleUser.findIndex((o) => o.role_id === state.selected_role_id);
      if (objIndex !== -1) {
        var objUserIndex = tempRoleUser.findIndex((o) => o.user_id === action.payload.userID);
        if (objUserIndex > -1 && action.payload.userID !== 0) {
          tempMessage = 'The user cannot be repeated. Please select another user';
        } else {
          tempRoleUser[objIndex].data = action.payload.user;
          tempRoleUser[objIndex].user_id = action.payload.userID;
        }
      }
      return {
        ...state,
        message: '',
        selected_user: action.payload.user,
        selected_user_id: action.payload.userID,
        role_user: tempRoleUser,
        message: tempMessage,
      };

    case SET_SELECTED_ROLE_ID:
      return {
        ...state,
        selected_role_id: action.payload.value,
      };

    case SET_WEEK_SELECT_FIELD:
      return {
        ...state,
        weekSelect: action.payload.value,
      };

    case SET_ROLE_USER:
      return {
        ...state,
        role_user: action.payload.value,
      };

    case SET_SHARE_FILE:
      return {
        ...state,
        share_file: action.payload.value,
      };

    case GET_WORKFLOW_USER_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: '',
      };

    case GET_WORKFLOW_USER_SUCCESS:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
        workflow: action.payload.data,
      };

    case GET_WORKFLOW_USER_FAILURE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
      };
    case GET_FILESHARING_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: '',
      };

    case GET_FILESHARING_SUCCESS:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
        filesharing_list: action.payload.data,
      };

    case GET_FILESHARING_FAILURE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
      };

    case GET_ADHOC_ROLE_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: '',
      };

    case GET_ADHOC_ROLE_SUCCESS:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
        role_list: action.payload.data,
      };

    case GET_ADHOC_ROLE_FAILURE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
      };
    default:
      return state;
  }
}

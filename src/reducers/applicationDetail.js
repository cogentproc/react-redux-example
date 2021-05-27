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
  RESET_APPLICATION_DETAIL,
} from '../constants/ApplicationDetail';
import {
  SET_CURRENT_ROLE_TITLE,
} from '../constants/ApplicationStatus';
import {
  GET_ACTIVE_APPLICATION_REQUEST,
} from '../constants/ApplicationsList';

const initialState = {
  requesting: false,
  message: '',
  application_detail_form: [],
  application_roles: [],
  application_detail_action: [],
  application_detail_messages: [],
  refreshApplicationDetailForm: false,
  showFormSuccessMsg: false,
  showFormErrorMsg: false,
  refreshApplicationRoles: false,
  redirectApplicationDetailAction: false,
  headerRoleTitle: '',
  headerTaskTitle: '',
  fields: [],
  showForm: { type: '', form_id: '' },

};

export default function applicationDetail(state = initialState, action) {
  switch (action.type) {
    case RESET_APPLICATION_DETAIL:
      return {
        ...initialState,
      };
    case GET_ACTIVE_APPLICATION_REQUEST:
      return {
        ...state,
        showForm: { type: '', form_id: '' },
      };
    case SET_SHOW_FORM:
      return {
        ...state,
        showForm: { type: action.payload.type, form_id: action.payload.form_id },
      };

    case SET_CURRENT_ROLE_TITLE:
      return {
        ...state,
        headerRoleTitle: action.payload.value,
        headerTaskTitle: '',
      };

    case SET_FORM_SUCCESS_MSG:
      return {
        ...state,
        showFormSuccessMsg: action.payload.value,
      };

    case SET_FORM_ERROR_MSG:
      return {
        ...state,
        showFormErrorMsg: action.payload.value,
      };

    case SET_FIELDS:
      return {
        ...state,
        fields: action.payload.value,
      };

    case GET_APPLICATION_ROLES_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
        refreshApplicationRoles: false,
      };

    case GET_APPLICATION_ROLES_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        requesting: action.payload.requesting,
        application_roles: action.payload.data,
      };

    case GET_APPLICATION_ROLES_FAILURE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
      };
    case GET_APPLICATION_MESSAGES_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
        refreshApplicationDetailForm: false,
      };

    case GET_APPLICATION_MESSAGES_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        requesting: action.payload.requesting,
        application_detail_messages: action.payload.data,
      };

    case GET_APPLICATION_MESSAGES_FAILURE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
      };

    case GET_APPLICATION_FORM_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
        application_detail_form: '',
        refreshApplicationDetailForm: false,
      };

    case GET_APPLICATION_FORM_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        requesting: action.payload.requesting,
        application_detail_form: action.payload.data,
        headerRoleTitle: action.payload.data.role_alias === '' ? action.payload.data.role_title : action.payload.data.role_alias,
        headerTaskTitle: action.payload.data.alias === '' ? action.payload.data.title : action.payload.data.alias,
      };

    case GET_APPLICATION_FORM_FAILURE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
      };
    case GET_APPLICATION_ACTION_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
      };

    case GET_APPLICATION_ACTION_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        requesting: action.payload.requesting,
        application_detail_action: action.payload.data,
      };

    case GET_APPLICATION_ACTION_FAILURE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
      };
    case POST_APPLICATION_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
        showFormSuccessMsg: false,
      };

    case POST_APPLICATION_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        // requesting: action.payload.requesting,
        requesting: true,
        refreshApplicationDetailForm: true,
        showFormSuccessMsg: true,
      };

    case POST_APPLICATION_FAILURE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
        showFormErrorMsg: true,
      };
    case POST_APPLICATION_COMMITTEE_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
      };

    case POST_APPLICATION_COMMITTEE_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        // requesting: action.payload.requesting,
        requesting: true,
        refreshApplicationDetailForm: true,
        refreshApplicationRoles: true,
        showFormSuccessMsg: true,
      };

    case POST_APPLICATION_COMMITTEE_FAILURE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
        showFormErrorMsg: true,
      };
    case POST_APPLICATION_ACTION_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
        redirectApplicationDetailAction: false,
      };

    case POST_APPLICATION_ACTION_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        // requesting: action.payload.requesting,
        requesting: true,
        redirectApplicationDetailAction: true,
      };

    case POST_APPLICATION_ACTION_FAILURE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
        showFormErrorMsg: true,
      };

    default:
      return state;
  }
}

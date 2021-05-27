import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_CHOOSE_WORKFLOW,
  LOGIN_CHOOSE_ROLE,
  SET_PASSWORD_REQUEST,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_FAILURE,
  GET_USER_WORKFLOWS_REQUEST,
  GET_USER_WORKFLOWS_SUCCESS,
  GET_USER_WORKFLOWS_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} from '../constants/Login';
import {
  UNDEFINED_ERROR,
} from '../constants/Default';
import {
  GET_ACTIVE_APPLICATION_REQUEST,
} from '../constants/ApplicationsList';

const initialState = {
  username: '',
  password: '',
  requesting: false,
  showPassword: false,
  message: '',
  error_code: '',
  chooseWorkflow: false,
  workflow_list: [],
  chooseRole: false,
  role_list: [],
  workflow_id: '',
  id_token: '',
  login_success: false,
  register_success: false,
  forgot_success: false,
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case UNDEFINED_ERROR:
      return {
        ...state,
        requesting: false,
      };

    case GET_ACTIVE_APPLICATION_REQUEST:
      return {
        ...state,
        login_success: false,
      };

    case REGISTER_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: '',
        error_code: '',
        register_success: false,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        requesting: action.payload.requesting,
        register_success: true,
        message: 'Please confirm you email address by clicking on the link in the confirmation email.',
      };

    case REGISTER_FAILURE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
        error_code: action.payload.error_code,
      };

    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: '',
        error_code: '',
        forgot_password_success: false,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        requesting: action.payload.requesting,
        forgot_password_success: true,
        message: 'Please confirm you email address by clicking on the link in the forgot password email.',
      };

    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
        error_code: action.payload.error_code,
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: '',
        error_code: '',
        login_success: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        requesting: action.payload.requesting,
        login_success: true,
      };

    case LOGIN_CHOOSE_WORKFLOW:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
        workflow_list: action.payload.data.workflows,
        id_token: action.payload.data.id_token,
        chooseWorkflow: true,
        role_list: [],
        chooseRole: false,
      };

    case LOGIN_CHOOSE_ROLE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
        role_list: action.payload.data.roles,
        workflow_id: action.payload.data.workflow_id,
        chooseRole: true,
        workflow_list: [],
        chooseWorkflow: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
        error_code: action.payload.error_code,
      };

    case SET_PASSWORD_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: '',
        error_code: '',
      };

    case SET_PASSWORD_SUCCESS:
      window.location = '/public/login';
      return {
        ...state,
        requesting: action.payload.requesting,
      };

    case SET_PASSWORD_FAILURE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
        error_code: action.payload.error_code,
      };

    case GET_USER_WORKFLOWS_REQUEST:
      return {
        ...state,
        requesting: action.payload.requesting,
        refreshNameExclusion: false,
        message: '',
      };

    case GET_USER_WORKFLOWS_SUCCESS:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
        workflow_list: action.payload.data,
      };

    case GET_USER_WORKFLOWS_FAILURE:
      return {
        ...state,
        requesting: action.payload.requesting,
        message: action.payload.message,
      };

    default:
      return state;
  }
}

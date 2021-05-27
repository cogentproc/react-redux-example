import API from 'Api/api.js';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  LOGIN_CHOOSE_WORKFLOW,
  LOGIN_CHOOSE_ROLE,
  SET_PASSWORD_REQUEST,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_FAILURE,
  GET_USER_WORKFLOWS_REQUEST,
  GET_USER_WORKFLOWS_SUCCESS,
  GET_USER_WORKFLOWS_FAILURE,
} from 'constants/Login';
import { UNDEFINED_ERROR, RESET_UNDEFINED_ERROR } from '../constants/Default';
import { validateEmail } from '../Api/common.js';

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');

  return JSON.parse(window.atob(base64));
}

export function onLogin(obj, redirect) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        requesting: true,
        message: '',
        error_code: '',
      },
    });
    dispatch({
      type: RESET_UNDEFINED_ERROR,
    });

    const apiKey = localStorage.getItem('network_api_key');
    const frontendURL = localStorage.getItem('network_frontend_url');

    let config = {};
    if (apiKey !== undefined && frontendURL !== undefined) {
      config = {
        headers: {
          Apikey: apiKey,
          FrontendURL: frontendURL,
        },
      };
    }

    API.post('login-user', obj, config)
      .then((response) => {
        if (response.data.result === 'success') {
          // localStorage.clear();
          const tokenObj = parseJwt(response.data.data.token);
          if (tokenObj.workflow_id == undefined) {
            localStorage.setItem('network_user_token', response.data.data.token);
            localStorage.setItem('network_id', tokenObj.network_id);
            localStorage.setItem('network_name', tokenObj.network_name);
            localStorage.setItem('user_id', tokenObj.user_id);
            localStorage.setItem('name', tokenObj.name);
            localStorage.setItem('email', tokenObj.email);
            dispatch({
              type: LOGIN_CHOOSE_WORKFLOW,
              payload: {
                requesting: false,
                data: response.data.data,
                redirect,
              },
            });
          } else {
            const unixTime = Math.floor(Date.now() / 1000);
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('refresh_token', response.data.data.refresh_token);
            localStorage.setItem('login_time', unixTime);
            localStorage.setItem('network_id', tokenObj.network_id);
            localStorage.setItem('network_name', tokenObj.network_name);
            localStorage.setItem('workflow_id', tokenObj.workflow_id);
            localStorage.setItem('workflow_name', tokenObj.workflow_name);
            localStorage.setItem('workflow_image', tokenObj.workflow_image);
            localStorage.setItem('application_label', tokenObj.application_label);
            localStorage.setItem('user_id', tokenObj.user_id);
            localStorage.setItem('name', tokenObj.name);
            localStorage.setItem('is_deputy1', tokenObj.is_deputy1);
            localStorage.setItem('is_deputy2', tokenObj.is_deputy2);
            localStorage.setItem('email', tokenObj.email);
            dispatch({
              type: LOGIN_SUCCESS,
              payload: {
                requesting: false,
                redirect,
              },
            });
          }
        }
      })
      .catch((error) => {
        if (error.response === undefined) {
          dispatch({
            type: UNDEFINED_ERROR,
            payload: {
              error: error.request.status,
            },
          });
        } else {
          dispatch({
            type: LOGIN_FAILURE,
            payload: {
              requesting: false,
              message: error.response.data.data.message,
              error_code: error.response.data.data.error_code,
            },
          });
        }
      });
  };
}

export function onRefresh() {
  var tokenType = '';
  var token = '';
  if (localStorage.getItem('token') !== null) {
    tokenType = 'USER';
    token = localStorage.getItem('token');
  } else if (localStorage.getItem('admin_token') !== null) {
    tokenType = 'ADMIN';
    token = localStorage.getItem('admin_token');
  } else if (localStorage.getItem('networkadmin_token') !== null) {
    tokenType = 'NETWORK_ADMIN';
    token = localStorage.getItem('networkadmin_token');
  }
  const config = {
    headers: {
      Token: token,
      RefreshToken: localStorage.getItem('refresh_token'),
    },
  };
  API.get('refresh-token', config)
    .then((response) => {
      const unixTime = Math.floor(Date.now() / 1000);
      localStorage.setItem('login_time', unixTime);
      if (response.data.result === 'success') {
        if (tokenType == 'USER') {
          localStorage.setItem('token', response.data.data.token);
        } else if (tokenType == 'ADMIN') {
          localStorage.setItem('admin_token', response.data.data.token);
        } else if (tokenType == 'NETWORK_ADMIN') {
          localStorage.setItem('networkadmin_token', response.data.data.token);
        }
        localStorage.setItem('refresh_token', response.data.data.refresh_token);
      } else {
        localStorage.clear();
      }
    })
    .catch((error) => {
      localStorage.clear();
    });
}

export function onForgotPassword(obj) {
  return (dispatch) => {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
      payload: {
        requesting: true,
        message: '',
        error_code: '',
      },
    });
    dispatch({
      type: RESET_UNDEFINED_ERROR,
    });

    const apiKey = localStorage.getItem('network_api_key');
    const frontendURL = localStorage.getItem('network_frontend_url');
    let config = {};
    if (apiKey !== undefined && frontendURL !== undefined) {
      config = {
        headers: {
          Apikey: apiKey,
          FrontendURL: frontendURL,
        },
      };
    }

    API.post('forgot-password', obj, config)
      .then((response) => {
        if (response.data.result === 'success') {
          dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: {
              requesting: false,
            },
          });
        }
      })
      .catch((error) => {
        if (error.response === undefined) {
          dispatch({
            type: UNDEFINED_ERROR,
            payload: {
              error: error.request.status,
            },
          });
        } else {
          dispatch({
            type: FORGOT_PASSWORD_FAILURE,
            payload: {
              requesting: false,
              message: error.response.data.data.message,
              error_code: error.response.data.data.error_code,
            },
          });
        }
      });
  };
}

export function onRegister(obj) {
  return (dispatch) => {
    dispatch({
      type: REGISTER_REQUEST,
      payload: {
        requesting: true,
        message: '',
        error_code: '',
      },
    });
    dispatch({
      type: RESET_UNDEFINED_ERROR,
    });

    const apiKey = localStorage.getItem('network_api_key');
    const frontendURL = localStorage.getItem('network_frontend_url');
    let config = {};
    if (apiKey !== undefined && frontendURL !== undefined) {
      config = {
        headers: {
          Apikey: apiKey,
          FrontendURL: frontendURL,
        },
      };
    }

    API.post('register', obj, config)
      .then((response) => {
        if (response.data.result === 'success') {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: {
              requesting: false,
            },
          });
        }
      })
      .catch((error) => {
        if (error.response === undefined) {
          dispatch({
            type: UNDEFINED_ERROR,
            payload: {
              error: error.request.status,
            },
          });
        } else {
          dispatch({
            type: REGISTER_FAILURE,
            payload: {
              requesting: false,
              message: error.response.data.data.message,
              error_code: error.response.data.data.error_code,
            },
          });
        }
      });
  };
}

export function onSetPassword(obj, redirect) {
  return (dispatch) => {
    dispatch({
      type: SET_PASSWORD_REQUEST,
      payload: {
        requesting: true,
        message: '',
        error_code: '',
      },
    });
    dispatch({
      type: RESET_UNDEFINED_ERROR,
    });

    const apiKey = localStorage.getItem('network_api_key');
    const frontendURL = localStorage.getItem('network_frontend_url');
    let config = {};
    if (apiKey !== undefined && frontendURL !== undefined) {
      config = {
        headers: {
          Apikey: apiKey,
          FrontendURL: frontendURL,
        },
      };
    }
    API.patch('set-password', obj, config)
      .then((response) => {
        if (response.data.result === 'success') {
          localStorage.clear();
          dispatch({
            type: SET_PASSWORD_SUCCESS,
            payload: {
              requesting: false,
              redirect,
            },
          });
        }
      })
      .catch((error) => {
        if (error.response === undefined) {
          dispatch({
            type: UNDEFINED_ERROR,
            payload: {
              error: error.request.status,
            },
          });
        } else {
          dispatch({
            type: SET_PASSWORD_FAILURE,
            payload: {
              requesting: false,
              message: error.response.data.data.message,
              error_code: error.response.data.data.error_code,
            },
          });
        }
      });
  };
}

export function onLoginSSO(obj, redirect) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        requesting: true,
        message: '',
        error_code: '',
      },
    });
    dispatch({
      type: RESET_UNDEFINED_ERROR,
    });

    const apiKey = localStorage.getItem('network_api_key');
    const frontendURL = localStorage.getItem('network_frontend_url');
    let config = {};
    if (apiKey !== undefined && frontendURL !== undefined) {
      config = {
        headers: {
          Apikey: apiKey,
          FrontendURL: frontendURL,
        },
      };
    }
    API.post('login-user-sso', obj, config)
      .then((response) => {
        if (response.data.result === 'success') {
          // localStorage.clear();
          const tokenObj = parseJwt(response.data.data.token);
          if (tokenObj.workflow_id == undefined) {
            localStorage.setItem('network_user_token', response.data.data.token);
            localStorage.setItem('network_id', tokenObj.network_id);
            localStorage.setItem('network_name', tokenObj.network_name);
            localStorage.setItem('user_id', tokenObj.user_id);
            localStorage.setItem('name', tokenObj.name);
            localStorage.setItem('email', tokenObj.email);
            dispatch({
              type: LOGIN_CHOOSE_WORKFLOW,
              payload: {
                requesting: false,
                data: response.data.data,
                redirect,
              },
            });
          } else {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('network_id', tokenObj.network_id);
            localStorage.setItem('network_name', tokenObj.network_name);
            localStorage.setItem('workflow_id', tokenObj.workflow_id);
            localStorage.setItem('workflow_name', tokenObj.workflow_name);
            localStorage.setItem('workflow_image', tokenObj.workflow_image);
            localStorage.setItem('application_label', tokenObj.application_label);
            localStorage.setItem('user_id', tokenObj.user_id);
            localStorage.setItem('name', tokenObj.name);
            localStorage.setItem('is_deputy1', tokenObj.is_deputy1);
            localStorage.setItem('is_deputy2', tokenObj.is_deputy2);
            localStorage.setItem('email', tokenObj.email);
            dispatch({
              type: LOGIN_SUCCESS,
              payload: {
                requesting: false,
                redirect,
              },
            });
          }
        }
      })
      .catch((error) => {
        if (error.response === undefined) {
          dispatch({
            type: UNDEFINED_ERROR,
            payload: {
              error: error.request.status,
            },
          });
        } else {
          dispatch({
            type: LOGIN_FAILURE,
            payload: {
              requesting: false,
              message: error.response.data.data.message,
              error_code: error.response.data.data.error_code,
            },
          });
        }
      });
  };
}
export function getNetworkWorkflows() {
  const apiKey = localStorage.getItem('network_api_key');
  const frontendURL = localStorage.getItem('network_frontend_url');
  let config = {};
  if (apiKey !== undefined && frontendURL !== undefined) {
    config = {
      headers: {
        Apikey: apiKey,
        FrontendURL: frontendURL,
        // Token: localStorage.getItem('network_user_token') ? localStorage.getItem('network_user_token') : localStorage.getItem('token'),
      },
    };
  }
  return (dispatch) => {
    dispatch({
      type: GET_USER_WORKFLOWS_REQUEST,
      payload: {
        requesting: true,
        message: '',
        error_code: '',
      },
    });
    dispatch({
      type: RESET_UNDEFINED_ERROR,
    });

    var userToken = localStorage.getItem('token') ? localStorage.getItem('token').toString() : '';
    var networkUserToken = localStorage.getItem('network_user_token') ? localStorage.getItem('network_user_token').toString() : '';
    var queryParam = '';
    if (userToken != '') {
      queryParam = `?user_token=${userToken}`;
    }
    if (networkUserToken != '') {
      queryParam = `?network_user_token=${networkUserToken}`;
    }
    API.get(`workflows-public${queryParam}`, config)
      .then((response) => {
        if (response.data.result === 'success') {
          dispatch({
            type: GET_USER_WORKFLOWS_SUCCESS,
            payload: {
              requesting: false,
              data: response.data.data,
            },
          });
        }
      })
      .catch((error) => {
        if (error.response === undefined) {
          dispatch({
            type: UNDEFINED_ERROR,
            payload: {
              error: error.request.status,
            },
          });
        } else if (error.request.status !== 400) {
          dispatch({
            type: UNDEFINED_ERROR,
            payload: {
              error: error.request.status,
            },
          });
        } else {
          dispatch({
            type: GET_USER_WORKFLOWS_FAILURE,
            payload: {
              requesting: false,
              message: error.response.data.data.message,
              error_code: error.response.data.data.error_code,
            },
          });
        }
      });
  };
}

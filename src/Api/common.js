import {
  AUTHORIZATION_REQUIRED,
  UNDEFINED_ERROR,
  RESET_UNDEFINED_ERROR,
} from '../constants/Default';

export function getConfig() {
  const config = {
    headers: {
      Token: localStorage.getItem('token'),
    },
  };
  return config;
}
export function getAdminConfig() {
  const config = {
    headers: {
      Token: localStorage.getItem('admin_token'),
    },
  };
  return config;
}
export function getNetworkAdminConfig() {
  const config = {
    headers: {
      Token: localStorage.getItem('networkadmin_token'),
    },
  };
  return config;
}

export function commonBackendCall(REQUEST, SUCCESS, FAILURE, requestedAPI) {
  return (dispatch) => {
    dispatch({
      type: REQUEST,
      payload: {
        requesting: true,
      },
    });
    dispatch({
      type: RESET_UNDEFINED_ERROR,
    });
    requestedAPI
      .then((response) => {
        dispatch({
          type: SUCCESS,
          payload: {
            requesting: false,
            data: response.data.data,
          },
        });
      })
      .catch((error) => {
        if (error.response === undefined) {
          dispatch({
            type: UNDEFINED_ERROR,
            payload: {
              error: error.request.status,
            },
          });
          dispatch({
            type: FAILURE,
            payload: {
              requesting: false,
              message: '',
              error_code: '',
            },
          });
        } else if (error.request.status === 401) {
          dispatch({
            type: AUTHORIZATION_REQUIRED,
          });
        } else {
          dispatch({
            type: FAILURE,
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

export function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(email);
}

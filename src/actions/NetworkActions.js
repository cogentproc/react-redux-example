import API from 'Api/api.js';
import {
  GET_NETWORK_REQUEST,
  GET_NETWORK_SUCCESS,
  GET_NETWORK_FAILURE,
} from 'constants/Network';
import axios from 'axios';

export function getNetworkByName(networkName) {
  return (dispatch) => {
    dispatch({
      type: GET_NETWORK_REQUEST,
      payload: {
        requesting: true,
        message: '',
      },
    });

    var baseURL = process.env.REACT_APP_API_SERVER;

    axios.get(`${baseURL}networks/${networkName}`)
      .then((response) => {
        localStorage.setItem('network_api_key', String(response.data.data.api_key));
        localStorage.setItem('network_frontend_url', response.data.data.frontend_url);
        localStorage.setItem('network_icon', response.data.data.icon);
        localStorage.setItem('network_image', response.data.data.image);
        localStorage.setItem('network_bg_image', response.data.data.bg_image);
        localStorage.setItem('network_name', response.data.data.name);
        localStorage.setItem('network_theme', response.data.data.theme);
        localStorage.setItem('network_title', response.data.data.title);
        localStorage.setItem('network_google_key', response.data.data.google_key);
        dispatch({
          type: GET_NETWORK_SUCCESS,
          payload: {
            requesting: false,
            message: '',
            data: response.data.data.name,
          },
        });
      })
      .catch((error) => {
        if (error.request.status === 401) {
          localStorage.setItem('network_api_key', '');
          localStorage.setItem('network_frontend_url', '');
          localStorage.setItem('network_icon', '');
          localStorage.setItem('network_image', '');
          localStorage.setItem('network_bg_image', '');
          localStorage.setItem('network_name', '');
          localStorage.setItem('network_theme', '');
          localStorage.setItem('network_title', '');
          localStorage.setItem('network_google_key', '');
          dispatch({
            type: GET_NETWORK_FAILURE,
            payload: {
              requesting: false,
              message: 'Invalid Network',
            },
          });
        }
      });
  };
}

export function getNetworkByAPIKey(apiKey) {
  return (dispatch) => {
    dispatch({
      type: GET_NETWORK_REQUEST,
      payload: {
        requesting: true,
        message: '',
      },
    });

    var baseURL = process.env.REACT_APP_API_SERVER;

    axios.get(`${baseURL}networks/apikey/${apiKey}`)
      .then((response) => {
        localStorage.setItem('network_api_key', String(response.data.data.api_key));
        localStorage.setItem('network_frontend_url', response.data.data.frontend_url);
        localStorage.setItem('network_icon', response.data.data.icon);
        localStorage.setItem('network_image', response.data.data.image);
        localStorage.setItem('network_bg_image', response.data.data.bg_image);
        localStorage.setItem('network_name', response.data.data.name);
        localStorage.setItem('network_theme', response.data.data.theme);
        localStorage.setItem('network_title', response.data.data.title);
        localStorage.setItem('network_google_key', response.data.data.google_key);

        dispatch({
          type: GET_NETWORK_SUCCESS,
          payload: {
            requesting: false,
            message: '',
            data: response.data.data.name,
          },
        });
      })
      .catch((error) => {
        if (error.request.status === 401) {
          localStorage.setItem('network_api_key', '');
          localStorage.setItem('network_frontend_url', '');
          localStorage.setItem('network_icon', '');
          localStorage.setItem('network_image', '');
          localStorage.setItem('network_bg_image', '');
          localStorage.setItem('network_name', '');
          localStorage.setItem('network_theme', '');
          localStorage.setItem('network_title', '');
          localStorage.setItem('network_google_key', '');
          dispatch({
            type: GET_NETWORK_FAILURE,
            payload: {
              requesting: false,
              message: 'Invalid Network',
            },
          });
        }
      });
  };
}

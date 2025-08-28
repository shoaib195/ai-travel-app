import {Dispatch} from 'redux';

export const USER_IS_lOGGED = 'USER_IS_lOGGED';
export const USER_IS_Update = 'USER_IS_Update';
export const USER_IS_LOGOUT = 'USER_IS_LOGOUT';
export const BOOT_ME_UP_DATA = 'BOOT_ME_UP_DATA';
export const USER_PASSWORD = 'USER_PASSWORD';
export const USER_PASSWORD_REMOVE = 'USER_PASSWORD_REMOVE';
export const USER_APP_INTRO = 'USER_APP_INTRO';

export const SetUserLoggin = user => dispatch => {
  dispatch({
    type: USER_IS_lOGGED,
    payload: user,
  });
};

export const emptyuser = () => dispatch => {
  dispatch({
    type: USER_IS_LOGOUT,
  });
};

export const removeUserPassword = () => dispatch => {
  dispatch({
    type: USER_PASSWORD_REMOVE,
  });
};

export const userAppIntro = () => dispatch => {
  dispatch({
    type: USER_APP_INTRO,
  });
};

export const setBootmeUpData = bootmeUpData => dispatch => {
  dispatch({
    type: BOOT_ME_UP_DATA,
    payload: bootmeUpData,
  });
};

export const updateAuthData = userData => dispatch => {
  dispatch({
    type: USER_IS_Update,
    payload: userData,
  });
};

export const setAuthPassword = password => dispatch => {
  dispatch({
    type: USER_PASSWORD,
    payload: password,
  });
};
import {
  USER_IS_lOGGED,
  USER_IS_LOGOUT,
  BOOT_ME_UP_DATA,
  USER_IS_Update,
  USER_PASSWORD,
  USER_PASSWORD_REMOVE,
  USER_APP_INTRO,
} from '../action/index';

const initialState = {
  auth: null,
  bootmeUpData: null,
  password: null,
  appIntro: true,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_IS_lOGGED:
      const customer = action.payload;
      return {
        ...state,
        auth: customer,
      };

    case USER_IS_Update:
      return {
        ...state,
        auth: {
          ...state.auth,
          token: state.auth?.token || null,
          customer: {
            ...state.auth?.customer,
            ...action.payload,
          },
        },
      };

    case USER_IS_LOGOUT:
      return {
        ...initialState,
        bootmeUpData: state.bootmeUpData,
        appIntro: state.appIntro,
        password: state.password,
      };

    case USER_PASSWORD_REMOVE:
      return {
        ...state,
        password: null,
      };

    case USER_APP_INTRO:
      return {
        ...state,
        appIntro: false,
      };

    case BOOT_ME_UP_DATA:
      return {
        ...state,
        bootmeUpData: action.payload,
      };

    case USER_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };

    default:
      return state;
  }
}

export default userReducer;
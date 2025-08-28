import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import useUser from './useUser';
import {useDispatch, useSelector} from 'react-redux';
import { AppConstants } from '../../constants/AppConstants';
import authService from '../services/auth-service';
import toastService from '../services/toastService';
import { updateAuthData } from '../redux/action';

const useAuth = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state.userReducer);
  const {logoutUserHandler} = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [resendCode, setResendCode] = useState(false);
  const [btnPress, setBtnPress] = useState(false);
  const [skeletonLoader, setSkeletonLoader] = useState(false);
  const [questions, setQuestions] = useState();
  const [popularDoctorCategoriesData, setPopularDoctorCategoriesData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  const sendOtpRequestHandler = email => {
    if (email) {
      setIsLoading(true);
      const requestData = {email: email};
      authService
        .sendOtp(requestData)
        .then(res => {
          setIsLoading(false);
          navigation.navigate('OtpVerification', {
            email: email,
          });
        })
        .catch(error => {
          setIsLoading(false);
          const apiErrors = error?.response?.data?.errors;
        if (typeof apiErrors === 'string') {
          toastService.shortToast(apiErrors);
        } else if (typeof apiErrors === 'object') {
          for (let [key, value] of Object.entries(apiErrors)) {
            toastService.shortToast(value[0]);
          }
        }
        });
    } else {
      setIsLoading(false);
    }
  };

  const resendOtpRequestHandler = email => {
    setIsLoading(true);
    const requestData = {email: email};
    const resendOtpPayload = new Promise((resolve, reject) => {
      authService
        .resendOtp(requestData)
        .then(res => {
          // setResendCode(false);
          setIsLoading(false);
          resolve(res);
        })
        .catch(err => {
          // setBtnPress(false);
          setIsLoading(false);
          reject(err);
        });
    });
    return resendOtpPayload;
  };


  const verificationResendOtpRequestHandler = email => {
    setBtnPress(true);
    const requestData = {email: email};
    const resendOtpPayload = new Promise((resolve, reject) => {
      authService
        .resendOtp(requestData)
        .then(res => {
          // setResendCode(false);
          setBtnPress(false);
          resolve(res);
        })
        .catch(err => {
          // setBtnPress(false);
          setBtnPress(false);
          reject(err);
        });
    });
    return resendOtpPayload;
  };

  const loginRequestHandler = payload => {
    setIsLoading(true);
    const requestData = {email: payload?.email, password: payload?.password, biometric_enable: payload?.biometric_enable ?? false};
    const loginInfo = new Promise((resolve, reject) => {
      authService
        .loginRequest(requestData)
        .then(res => {
          setIsLoading(false);
          resolve(res);
        })
        .catch(err => {
          setIsLoading(false);
          reject(err);
        });
    });
    return loginInfo;
  };

  const logoutRequestHandler = () => {
    authService
      .logoutRequest()
      .then(({data}) => {
        logoutUserHandler();
      })
      .catch(err => {
        if (err?.response?.data?.message) {
          toastService.shortToast(err?.response?.data?.message);
        }
      });
  };

  const updatePasswordRequestHandler = payload => {
    setIsLoading(true);
    const updatePasswordInfo = new Promise((resolve, reject) => {
      authService
        .passwordResetRequest(payload)
        .then(res => {
          setIsLoading(false);
          resolve(res);
        })
        .catch(err => {
          setIsLoading(false);
          reject(err);
        });
    });
    return updatePasswordInfo;
  };


  const getPopularDoctorCategoriesHandler = () => {
    setSkeletonLoader(true);
    authService
      .getPopularDoctorCategoriesHandler()
      .then(({data}) => {
        setPopularDoctorCategoriesData(data?.data);
        setSkeletonLoader(false);
      })
      .catch(err => {
        setSkeletonLoader(false);
        if (err?.response?.data?.message) {
          toastService.shortToast(err?.response?.data?.message);
        }
      });
  };

  const getCategoriesHandler = () => {
    setSkeletonLoader(true);
    authService
      .getCategoriesHandler()
      .then(({data}) => {
        setCategoriesData(data?.data);
        setSkeletonLoader(false);
      })
      .catch(err => {
        setSkeletonLoader(false);
        if (err?.response?.data?.message) {
          toastService.shortToast(err?.response?.data?.message);
        }
      });
  };


  const graphDataRequestHandler = payload => {
    setIsLoading(true);
    const graphInfo = new Promise((resolve, reject) => {
      authService
        .getGraphData(payload)
        .then(res => {
          setIsLoading(false);
          resolve(res);
        })
        .catch(err => {
          setIsLoading(false);
          reject(err);
        });
    });
    return graphInfo;
  };

  const passwordChangeRequestHandler = payload => {
    setIsLoading(true);
    const passwordResetInfo = new Promise((resolve, reject) => {
      authService
        .passwordChangeRequest(payload)
        .then(res => {
          setIsLoading(false);
          resolve(res);
        })
        .catch(err => {
          setIsLoading(false);
          reject(err);
        });
    });
    return passwordResetInfo;
  };

  const getQuestionsHandler = () => {
    setSkeletonLoader(true);
    authService
      .getQuestions()
      .then(({data}) => {
        setQuestions(data?.data);
        setSkeletonLoader(false);
      })
      .catch(err => {
        setSkeletonLoader(false);
        if (err?.response?.data?.message) {
          toastService.shortToast(err?.response?.data?.message);
        }
      });
  };

  const videoRequestHandler = (count) => {
    setIsLoading(true);
    const blogsInfo = new Promise((resolve, reject) => {
      authService
        .getVideos(count)
        .then(res => {
          setIsLoading(false);
          resolve(res);
        })
        .catch(err => {
          setIsLoading(false);
          reject(err);
        });
    });
    return blogsInfo;
  };

  const imageUpdateHandler = imagePayload => {
    setSkeletonLoader(true);
    const avatar = new FormData();
    avatar.append('image', imagePayload);

    const headers = {
      'Content-Type': 'multipart/form-data;',
    };
    authService
      .updateAvatar(avatar, headers)
      .then(({data}) => {
        console.log('ssssss',data);
        
        const authData = {
          ...reducerData?.auth?.customer,
          profile_image: imagePayload?.uri,
        };
        dispatch(updateAuthData(authData));
        toastService.shortToast(data?.message);
        setSkeletonLoader(false);
      })
      .catch(error => {
          console.log('error',error?.response);
        setSkeletonLoader(false);
        const apiErrors = error?.response?.data?.errors;
        if (typeof apiErrors === 'string') {
          toastService.shortToast(apiErrors);
        } else if (typeof apiErrors === 'object') {
          for (let [key, value] of Object.entries(apiErrors)) {
            toastService.shortToast(value[0]);
          }
        }
      });
  };

  const sendAnswerRequestHandler = data => {
    setIsLoading(true);

    const submitAnswer = new Promise((resolve, reject) => {
      authService
        .answerRequestHandler(data)
        .then(res => {
          setIsLoading(false);
          resolve(res);
        })
        .catch(err => {
          setIsLoading(false);
          reject(err);
        });
    });
    return submitAnswer;
  };

  const userAuthenticateHandler = userData => {
    setIsLoading(true);
    const authenticateUser = new Promise((resolve, reject) => {
      authService
        .authenticateUser(userData)
        .then(res => {
          setIsLoading(false);
          resolve(res);
        })
        .catch(err => {
          setIsLoading(false);
          reject(err);
        });
    });
    return authenticateUser;
  };

  const profileUpdateHandler = userData => {
    setIsLoading(true);
    const loginInfo = new Promise((resolve, reject) => {
      authService
        .profileUpdate(userData)
        .then(res => {
          setIsLoading(false);
          resolve(res);
        })
        .catch(err => {
          setIsLoading(false);
          reject(err);
        });
    });
    return loginInfo;
  };

  const accountDeletionHandler = () => {
    setIsLoading(true);
    const accountDeletionInfo = new Promise((resolve, reject) => {
      authService
        .accountDeletionRequestHandler()
        .then(res => {
          setIsLoading(false);
          toastService.shortToast(res?.data?.message);
          logoutUserHandler(false);
          resolve(res);
        })
        .catch(err => {
          setIsLoading(false);
          if (err?.response?.data?.message) {
            toastService.shortToast(err?.response?.data?.message);
          }
          reject(err);
        });
    });
    return accountDeletionInfo;
  };

  const getFAQsHandler = () => {
    setIsLoading(true);
    const FAQsInfo = new Promise((resolve, reject) => {
      authService
        .FAQsHandler()
        .then(res => {
          setIsLoading(false);
          resolve(res);
        })
        .catch(err => {
          setIsLoading(false);
          reject(err);
        });
    });
    return FAQsInfo;
  };

  const contactUsHandler = data => {
    setIsLoading(true);
    const contactUsInfo = new Promise((resolve, reject) => {
      authService
        .contactUsRequestHandler(data)
        .then(res => {
          setIsLoading(false);
          resolve(res);
        })
        .catch(err => {
          setIsLoading(false);
          reject(err);
        });
    });
    return contactUsInfo;
  };

  return {
    sendOtpRequestHandler,
    resendOtpRequestHandler,
    profileUpdateHandler,
    accountDeletionHandler,
    updatePasswordRequestHandler,
    getQuestionsHandler,
    userAuthenticateHandler,
    sendAnswerRequestHandler,
    imageUpdateHandler,
    loginRequestHandler,
    logoutRequestHandler,
    getFAQsHandler,
    contactUsHandler,
    videoRequestHandler,
    graphDataRequestHandler,
    verificationResendOtpRequestHandler,
    passwordChangeRequestHandler,
    setBtnPress,
    setError,
    setQuestions,
    questions,
    skeletonLoader,
    error,
    btnPress,
    isLoading,
    resendCode,
    setResendCode,
    popularDoctorCategoriesData,
    getPopularDoctorCategoriesHandler,
    categoriesData,
    getCategoriesHandler
  };
};

export default useAuth;
import axios from 'axios';
import {baseURL} from '../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EventRegister} from 'react-native-event-listeners';

export const axiosInstance = async (config = {}, cancelAxiosToken) => {
  let storage_auth = await AsyncStorage.getItem('auth');
  let accessToken;

  if (storage_auth) {
    accessToken = JSON.parse(storage_auth)?.token;
  }

  let headers = {
    Authorization: `Bearer ${accessToken ?? JSON.parse(await AsyncStorage.getItem('auth'))?.token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  headers = Object.assign(headers,config); //for merging two objects

  // Create the axios instance
  const instance = axios.create({
    baseURL: baseURL,
    headers: headers,
    cancelToken : cancelAxiosToken,
  });

  // Request interceptor
  instance.interceptors.request.use(
    requestConfig => {
      // Modify the request config here, if needed
      // For example, you can add additional headers, tokens, etc.
      return requestConfig;
    },
    error => {
      // Handle request error
      return Promise.reject(error);
    },
  );

  // Response interceptor
  instance.interceptors.response.use(
    response => {
      // Modify the response data here, if needed
      return response;
    },
    error => {
      // Handle response error
      if(error && error?.response){
        if(error && error?.response && error?.response?.status === 401){
          // This will enable after usama discussion
          // EventRegister.emit('clearAuth');
        }
        // this promise will return error on axios catch.
        return Promise.reject(error);
      }
      // // Handle response error
      // if (error && error?.response && error?.response?.status === 401) {
      //   console.log('error',error);
        
      //   // This will enable after usama discussion
      //   // EventRegister.emit('clearAuth');
      //   // return new Promise(() => {});
      //   return Promise.reject(error);
      // } else {
      //   // this promise will return error on axios catch.
      //   return Promise.reject(error);
      // }
    },
  );

  return instance;
};

class APIClient {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  post(data, config) {
    return axiosInstance(config).then(res =>
      res.post(this.endpoint, data),
    );
  }

  get(params = {}, config, cancelAxiosToken = null) {
    return axiosInstance(config,cancelAxiosToken).then(res =>
      res.get(this.endpoint, {params}),
    );
  }

  put(data, config, cancelAxiosToken = null) {
    return axiosInstance(config, cancelAxiosToken).then(res =>
      res.put(this.endpoint, data),
    );
  }
}

export default APIClient;
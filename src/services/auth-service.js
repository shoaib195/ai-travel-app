import {APICONSTANTS} from '../constants/ApiConstants';
import APIClient from './api-client';

class AuthServices {
  sendOtp(data) {
    const apiClient = new APIClient(APICONSTANTS.sendOtp);
    return apiClient.post(data);
  }

  resendOtp(data) {
    const apiClient = new APIClient(APICONSTANTS.resendOtp);
    return apiClient.post(data);
  }

  loginRequest(data) {
    const apiClient = new APIClient(APICONSTANTS.login);
    return apiClient.post(data);
  }

  logoutRequest() {
    const apiClient = new APIClient(APICONSTANTS.logout);
    return apiClient.post(null);
  }

  discoverRequest() {
    const apiClient = new APIClient(APICONSTANTS.appStructureNotes);
    return apiClient.get();
  }

  investmentsRequest() {
    const apiClient = new APIClient(APICONSTANTS.investmentNotes);
    return apiClient.get();
  }

  passwordResetRequest(data) {
    const apiClient = new APIClient(APICONSTANTS.resetPassword);
    return apiClient.post(data);
  }

  getPopularDoctorCategoriesHandler() {
    const apiClient = new APIClient(APICONSTANTS.popularDoctorCategories);
    return apiClient.get();
  }

  getCategoriesHandler() {
    const apiClient = new APIClient(APICONSTANTS.categories);
    return apiClient.get();
  }

  // passwordResetRequest(data) {
  //   const apiClient = new APIClient(APICONSTANTS.passwordReset);
  //   return apiClient.post(data);
  // }
   passwordChangeRequest(data) {
    const apiClient = new APIClient(APICONSTANTS.changePassword);
    return apiClient.post(data);
  }

  getGraphData(isin) {
    const apiClient = new APIClient(`https://api.structuredproductservice.com/api/client/product-timeseries?ApiKey=003Qt00000BQiOrIAL&ProductID=${isin}`);
    return apiClient.get();
  }
  
  authenticateUser(data) {
    const apiClient = new APIClient(APICONSTANTS.authenticateUser);
    return apiClient.post(data);
  }

  getQuestions() {
    const apiClient = new APIClient(APICONSTANTS.questions);
    return apiClient.get();
  }

  getMediaContent() {
    const apiClient = new APIClient(APICONSTANTS.mediaContent);
    return apiClient.get();
  }

  getBlogs(count) {
    const apiClient = new APIClient(`blog-contents?page=${count}`);
    return apiClient.get();
  }

  getVideos(count) {
    const apiClient = new APIClient(`/youtube-contents?page=${count}`);
    return apiClient.get();
  }

  updateAvatar(data, headers) {
    const apiClient = new APIClient(APICONSTANTS.profileImage);
    return apiClient.post(data, headers);
  }

  contactUsRequestHandler(data) {
    const apiClient = new APIClient(APICONSTANTS.contact);
    return apiClient.post(data);
  }

  answerRequestHandler(data) {
    const apiClient = new APIClient(APICONSTANTS.questionAnswer);
    return apiClient.post(data);
  }

  accountDeletionRequestHandler() {
    const apiClient = new APIClient(APICONSTANTS.accountDeletion);
    return apiClient.post(null);
  }

  bootMeUp(config) {
    const apiClient = new APIClient(APICONSTANTS.bootMeUp);
    return apiClient.get(null, config);
  }

  profileUpdate(data) {
    const apiClient = new APIClient(APICONSTANTS.profile);
    return apiClient.put(data);
  }

  FAQsHandler() {
    const apiClient = new APIClient(APICONSTANTS.faq);
    return apiClient.get();
  }

  googleRequestHandler(data) {
    const apiClient = new APIClient(APICONSTANTS.google);
    return apiClient.post(data);
  }
  
}

export default new AuthServices();
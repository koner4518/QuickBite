import axios from "axios";

const loginUser = (url, data) => {
    return axios.post(`${url}/api/user/login`, data);
};

const registerUser = (url, data) => {
    return axios.post(`${url}/api/user/register`, data);
};

const sendOTP = (url, email) => {
    return axios.post(`${url}/api/otp/send`, { email });
};

const verifyOTP = (url, email, otp) => {
    return axios.post(`${url}/api/otp/verify`, { email, otp });
};

// Forgot Password

const sendPasswordResetOTP = (url, email) => {
    return axios.post(url + "/api/password/forgot", {email});
};

const verifyPasswordResetOTP = (url, email, otp) => {
    return axios.post(url + "/api/password/verify-otp", {email, otp});
};

const resetPassword = (url, email, newPassword) => {
    return axios.post(url + "/api/password/reset", {email, newPassword});
};

export {loginUser, registerUser, sendOTP, verifyOTP, sendPasswordResetOTP, verifyPasswordResetOTP, resetPassword};
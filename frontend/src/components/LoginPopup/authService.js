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

export {loginUser, registerUser, sendOTP, verifyOTP};
import axios from 'axios';
const HOST = process.env.REACT_APP_API_HOST;
const BASE_URL = HOST + 'auth';

const login = async (user) => {
  const res = await axios.post(BASE_URL + '/login', user);
  sessionStorage.setItem('user', JSON.stringify(res.data));
  return res.data;
};
const verifyToken = async (token) => {
  const tok = {
    token,
  };
  const res = await axios.post(BASE_URL + '/verify', tok);
  return res.data;
};

export const authService = {
  login,
  verifyToken,
};

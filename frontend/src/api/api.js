import Cookies from 'js-cookie';
import axios from 'axios';

export const Token = Cookies.get('authToken');

export const axiosInstance = axios.create({
  baseURL: "http://15.164.99.251/api/",
  headers: {
    'Authorization': Token
  },
  }
)
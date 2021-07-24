import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://api.killerbee.com.br:8080/api',
});
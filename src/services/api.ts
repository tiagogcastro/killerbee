import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.killerbee.com.br:8080/api',
});
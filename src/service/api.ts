import axios from 'axios';

const brasilAPI = axios.create({
    baseURL: 'https://brasilapi.com.br/api'
});

export { brasilAPI };
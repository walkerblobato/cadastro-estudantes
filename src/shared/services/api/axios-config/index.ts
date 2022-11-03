import { errorInterceptor } from './interceptores/ErrorInterceptor';
import { responseInterceptor } from './interceptores/ResponseInterceptor';
import axios from 'axios';


const Api = axios.create({
    baseURL: 'http://localhost:3333'
});

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
);

export { Api };npm
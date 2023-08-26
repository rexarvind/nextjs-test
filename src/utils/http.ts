import axios from "axios";
import { redirect } from "next/navigation";

const baseURL = 'http://localhost:8080/api';

const http = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

http.interceptors.response.use(function(response){
    console.log('Save Cookie');
    if(response.status == 200){
    }
    return response;
}, function(error){
    console.log('Redirect to login');
    if(error.status == 422){
    }
    return Promise.reject(error);
});

export default http;
import axios from 'axios'


const options = {
    baseURL: "http://localhost:4004/api/v1/",
    withCredentials: true
}

const API = axios.create(options);


export default API;
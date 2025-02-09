import API from '../config/apiClient'

export const login = async data => API.post("auth/login", data);
export const signup = async data => API.post("auth/signup", data);
export const verifyEmail = async code => API.get(`auth/email/verify/${code}`);


export const getUnassignedRole = async () => API.get("/role/unassigned");

export const profile = async () => API.get("user/profile");
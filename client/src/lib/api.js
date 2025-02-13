import API from '../config/apiClient'

export const login = async data => API.post("auth/login", data);
export const signup = async data => API.post("auth/signup", data);
export const verifyEmail = async code => API.get(`auth/email/verify/${code}`);
export const logout = async () => API.get("auth/logout");


export const getUnassignedRole = async () => API.get("/role/unassigned");

export const profile = async () => API.get("user/profile");
export const getUsers = async () => API.get("user");
export const getUser = async (id) => API.get(`user/${id}`);
export const updateRole = async (id, data) => API.put(`user/${id}`, data);
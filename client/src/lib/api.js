import API from '../config/apiClient'

export const login = async data => API.post("auth/login", data);




export const profile = async () => API.get("user/profile");
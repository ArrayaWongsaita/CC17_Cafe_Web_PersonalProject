import axios from "../configs/axiosConfig";

const authApi = {};

authApi.register = (body) => axios.post("/auth/register", body);
authApi.login = (body) => axios.post("/auth/login", body);
authApi.getAuthUser = (body) => axios.get("/auth/me", body);

export default authApi;

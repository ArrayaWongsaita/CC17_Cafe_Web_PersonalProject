import axios from "../configs/axiosConfig";

const adminApi = {};

adminApi.editOder = (body) => axios.patch("/admin", body);
adminApi.getAllOrderPending = () => axios.get("/user/order/pending");
adminApi.getAllOrder = () => axios.get("/user/order");

export default adminApi;

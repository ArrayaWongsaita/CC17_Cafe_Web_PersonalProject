import axios from "../configs/axiosConfig";

const userApi = {};

userApi.getCart = () => axios.get("/user");
userApi.getOrder = () => axios.get("/user/order/me");
userApi.createOrder = (body) => axios.post("/user/order", body);
userApi.EditUserProfile = (body) => axios.patch("/user/edit/profile", body);
userApi.EditCartItem = (body) => axios.patch("/user", body);
userApi.createCart = (body) => axios.post("/user", body);
userApi.getOrderItemDetail = (orderId) =>
axios.get(`/user/order/detail/${orderId}`);
userApi.deleteItemInCart = (cartId) => axios.delete(`/user/${cartId}`);


export default userApi;

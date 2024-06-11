
import axios from '../configs/axiosConfig'

const userApi = {}


userApi.getCart = () => axios.get('/user');
userApi.getOrder = () => axios.get('/user/order/me');

userApi.createCart = (body) => axios.post('/user',body)
userApi.getOrderItemDetail = (orderId) => axios.get(`/user/order/detail/${orderId}`)
// userApi.login = (body) => axios.post('/auth/login', body)
// userApi.getAuthUser = (body) => axios.get('/auth/me', body)

export default userApi
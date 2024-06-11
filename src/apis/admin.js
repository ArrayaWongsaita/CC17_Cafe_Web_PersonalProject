
import axios from '../configs/axiosConfig'

const adminApi = {}


adminApi.editOder = (body) => axios.patch('/admin', body);
adminApi.getAllOrderPending = () => axios.get('/user/order/pending');
adminApi.getAllOrder = () => axios.get('/user/order');

// adminApi.login = (body) => axios.post('/auth/login', body)
// adminApi.getAuthUser = (body) => axios.get('/auth/me', body)

export default adminApi
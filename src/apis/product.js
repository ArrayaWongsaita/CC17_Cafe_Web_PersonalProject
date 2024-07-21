import axios from "../configs/axiosConfig";

const productApi = {}

productApi.getAllProduct = () => axios.get('/product')
productApi.createProduct = (body) => axios.post('/product',body)
productApi.editProduct = (body) => axios.patch('/product',body)



export default productApi
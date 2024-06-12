import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react"
import { getAccessToken } from "../utils/local-storage";
import userApi from "../apis/user";

export const UserContext = createContext()

export default function UserContextProvider({children}) {
  const [cartUser,setCartUser] = useState([])
  const [userOrder , setUserOrder] = useState([])
  
  

  useEffect(()=> {
    const fetchCart = async () => {
      try {
        if (getAccessToken()){
          const res = await userApi.getCart();
          setCartUser(res.data)
        }    
      } catch (error) {
        console.log(error)
      } 
    }
    fetchCart()
  },[])

  useEffect(()=> {
    const fetchCart = async () => {
      try {
        if (getAccessToken()){
          const res = await userApi.getOrder()
          setUserOrder(res.data)
        }    
      } catch (error) {
        console.log(error)
      } 
    }
    fetchCart()
  },[])

  const deleteItemInCart = async (cartId) => {
    try {
      await userApi.deleteItemInCart(cartId)
      const newCart = cartUser.filter(item => item.id !== cartId)
      setCartUser(newCart)
      console.log("new cart",newCart)
    } catch (error) {
      console.log(error)
    }
  }
  const editCartItem = async (body) => {
    try {
      const res = await userApi.EditCartItem(body)
      const newData = cartUser.map(item =>{
        if(item.id === res.data.id)return res.data
        return item
      })
      setCartUser(newData)
    } catch (error) {
      console.log(error)
    }
  }
  const createOrder = async(formData) => {
      try {
        const res = await userApi.createOrder(formData)
        setUserOrder([res.data,...userOrder])
        setCartUser([])
        return res.data
      } catch (error) {
        console.log(error)
      }
  }

  const value = {
    createOrder,
    editCartItem,
    cartUser,
    setCartUser,
    userOrder ,
    deleteItemInCart
  }
  return (
    <UserContext.Provider value={value} >{children}</UserContext.Provider>
  )
}

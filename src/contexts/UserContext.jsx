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

  const value = {
    cartUser,
    setCartUser,
    userOrder 
  }
  return (
    <UserContext.Provider value={value} >{children}</UserContext.Provider>
  )
}

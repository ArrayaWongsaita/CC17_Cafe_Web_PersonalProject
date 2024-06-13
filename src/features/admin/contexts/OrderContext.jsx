
// import { useEffect } from "react";
import { useEffect } from "react"
import { useState } from "react"
import { createContext } from "react"

import adminApi from "../../../apis/admin"
import { getAccessToken } from "../../../utils/local-storage"



export const OrderContext = createContext()


export default function OrderContextProvider({children}) {

  const [allOrder, setAllOrder] = useState([])



  useEffect(()=> {
  
    fetchAllOrder()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const fetchAllOrder = async () => {
    try {
      if (getAccessToken()){
        const res = await adminApi.getAllOrder()
        setAllOrder(res.data)
      }    
    } catch (error) {
      console.log(error)
    } 
  }

  const editOrder = async(formData) => {
    try {
      const res = await adminApi.editOder(formData)

      const newAllData = allOrder.map(item => {
        if(item.id === res.data?.id) {return res.data}
        return item
      })
      setAllOrder(newAllData)


    } catch (error) {
      console.log(error)
    }
  }


  const value = {
    editOrder ,
    fetchAllOrder,
    allOrder
  }




  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  )
}

import { Outlet } from "react-router-dom";

import SidebarForm from "./SidebarForm";
import ModalAdmin from "./MoalAdmin";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";


export default function MainAdminContent() {
  const {authUser} = useAuth()
  const navigate = useNavigate()
  useEffect(()=>{
    if(!authUser?.isAdmin){
      navigate('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <div className="flex justify-start  items-stretch">
      <div className="bg-customFooter w-60 flex flex-col gap-3 py-4 items-start px-4 "><SidebarForm/></div>
      <div className="flex-1 bg-customBeige  overflow-scroll">
      <Outlet/>
      </div>
      <ModalAdmin/>
    </div>
  )
}

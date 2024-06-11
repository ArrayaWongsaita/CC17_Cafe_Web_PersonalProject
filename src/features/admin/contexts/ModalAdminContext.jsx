import { useState } from "react";
import { createContext } from "react"
import CreateProduct from "../components/CreateProduct";
import OrderItemDetail from "../../../components/OrderItemDetail";
import userApi from "../../../apis/user";


export const ModalAdminContext =createContext()

export default function ModalAdminContextProvider({children}) {

  const [isModalAdminOpen, setIsModalAdminOpen] = useState(false);
  const [titleAdminModal, setTitleAdminModal] = useState("");
  const [contentAdminModal, setContentAdminModal] = useState(<h1>empty</h1>);

  const [fadeOut, setFadeOut] = useState(false);


  const handleEscPress = (e) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  };

  const setTitleAndContent = (title, content) => {
    setTitleAdminModal(title);
    setContentAdminModal(content);
  };

  const handleCloseModal = () => {
    setTimeout(() => {
      setIsModalAdminOpen(false);
      document.removeEventListener("keydown", handleEscPress);
      document.documentElement.style.overflowY = "auto";
      setFadeOut(false);
    }, 800);
    setFadeOut(true);
  };

  const handleOpenModal = () => {
    document.addEventListener("keydown", handleEscPress);
    document.documentElement.style.overflowY = "hidden";
    setIsModalAdminOpen(true);
  };
  const successModal = () => {
    setTitleAndContent("",<h1 className="text-3xl text-customMintGreen">successful</h1>)
    handleOpenModal()
  }

  const showImageModal = (image) => {
    setTitleAndContent('Image',<div
      style={{
        backgroundImage: `url(${image })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-[500px] h-[500px] mb-3 rounded-sm m-auto "
    ></div>)
    handleOpenModal()
  }
  const showEditProduct = (data) => {
    setTitleAndContent("Edit Product", <CreateProduct data={data}/>)
    handleOpenModal()

  }
  const showOrderItem = async (id) => {
    try {
      const res = await userApi.getOrderItemDetail(id)
      setTitleAndContent("Order detail", <OrderItemDetail data={res.data} />)
      handleOpenModal()
    } catch (error) {
      console.log(error)
    }

  }


  const value = {
    showOrderItem,
    showEditProduct,
    successModal,
    handleCloseModal,
    showImageModal ,
    handleOpenModal,
    fadeOut,
    titleAdminModal,
    contentAdminModal,
    isModalAdminOpen,
  }

  return (
    <ModalAdminContext.Provider value={value}>{children}</ModalAdminContext.Provider>
  )
}

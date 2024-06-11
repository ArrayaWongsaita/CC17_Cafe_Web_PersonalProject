import { useState, createContext } from "react";
import LoginFrom from "../features/authentication/commponents/LoginFrom";
import AddToBasketFrom from "../features/home/components/AddToBasketFrom";
import RegisterForm from "../features/authentication/commponents/RegisterForm";
import RegisterSuccessfullyFrom from "../features/authentication/commponents/RegisterSuccessfullyFrom";
import useAuth from "../hooks/useAuth";

import userApi from "../apis/user";

import useUser from "../hooks/useUser";

export const ModalContext = createContext();

export default function ModalContextProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(<h1>empty</h1>);
  const [isShowAnimationToBasket, setIsShowAnimationToBasket] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const { authUser } = useAuth();
  const { cartUser, setCartUser } = useUser();
  const handleEscPress = (e) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  };

  const setTitleAndContent = (title, content) => {
    setTitleModal(title);
    setContentModal(content);
  };

  const handleCloseModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
      document.removeEventListener("keydown", handleEscPress);
      document.documentElement.style.overflowY = "auto";
      setFadeOut(false);
    }, 800);
    setFadeOut(true);
  };

  const handleOpenModal = () => {
    document.addEventListener("keydown", handleEscPress);
    document.documentElement.style.overflowY = "hidden";
    setIsModalOpen(true);
  };

  const modalLogin = () => {
    setTitleAndContent("Login", <LoginFrom />);
    handleOpenModal();
  };

  const modalRegister = () => {
    setTitleAndContent("register", <RegisterForm />);
  };
  const loginSuccessModal = () => {
    setTitleAndContent(
      "Welcome ot TheRibbon",
      <div className="text-3xl text-white rounded-lg bg-customPink m-auto w-[600px] py-10 text-center flex justify-center gap-4 ">
        {" "}
        <h1>Dear</h1> {authUser?.firstName} {authUser?.lastName}
      </div>
    );
    setTimeout(() => {
      handleCloseModal();
    }, 600);
  };
  const registerSuccessModal = (email, password) => {
    setTitleAndContent(
      "We're honored to have you with us",
      <RegisterSuccessfullyFrom />
    );
    setTimeout(() => {
      handleCloseModal();
    }, 600);
    setTimeout(() => {
      setTitleAndContent("Login", <LoginFrom data={{ email, password }} />);
      handleOpenModal();
    }, 1550);
  };

  const modalAddToBasket = (productName, data) => {
    setTitleAndContent(
      productName,
      <AddToBasketFrom
        productName={productName}
        price={data?.price}
        image={data?.image}
        productId={data?.productId}
      />
    );
    handleOpenModal();
  };

  const addToBasket = async (body) => {
    try {
      const res = await userApi.createCart(body);

      const findProduct = cartUser.find(
        (item) => item.productId === res.data?.productId
      );
      if (findProduct) {
        const newDataProduct = cartUser.map((item) => {
          if (findProduct.productId === item.productId) return res.data;
          return item;
        });
        setCartUser(newDataProduct);
      } else {
        const data = [...cartUser, res.data];
        setCartUser(data);
      }

      handleCloseModal();
      setIsShowAnimationToBasket(true);
      setTimeout(() => {
        setIsShowAnimationToBasket(false);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    loginSuccessModal,
    registerSuccessModal,
    modalRegister,
    fadeOut,
    addToBasket,
    modalAddToBasket,
    modalLogin,
    contentModal,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    titleModal,
    setTitleAndContent,
    isShowAnimationToBasket,
    setIsShowAnimationToBasket,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
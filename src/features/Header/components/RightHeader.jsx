import { NavLink } from "react-router-dom";
import Button from "../../../components/Button";
import useAuth from "../../../hooks/useAuth";
import useModal from "../../../hooks/useModal";
import userImage from "../../../image/user-circle-svgrepo-com.png";
import basketImage from "../../../image/basket-heart-love-svgrepo-com.png";
import orderImage from "../../../image/order-svgrepo-com.png";
import useUser from "../../../hooks/useUser";
import Dropdown from "./Dropdown";
import { useState } from "react";

export default function RightHeader() {
  const { authUser } = useAuth();
  const { modalLogin } = useModal();
  const { cartUser } = useUser();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };

  if (authUser) {
    return (
      <>
        <NavLink
          to="/ordered/pending"
          className={({ isActive }) =>
            isActive
              ? "text-customPink border-b-4 border-customPink  py-1"
              : "text-customBrown py-1"
          }
        >
          <div
            style={{ backgroundImage: `url(${orderImage})` }}
            className="py-0.5 rounded-lg aspect-square  h-[30px] bg-no-repeat bg-cover"
          ></div>
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive
              ? "text-customPink border-b-4 border-customPink  py-1"
              : "text-customBrown py-1"
          }
        >
          <div
            style={{ backgroundImage: `url(${basketImage})` }}
            className="py-0.5 rounded-lg aspect-square  h-[33px] relative bg-no-repeat bg-cover"
          >
            {cartUser.length > 0 && (
              <div className="w-5 h-5 bg-red-600 rounded-full -top-1.5 -right-2 absolute z-10 text-center text-white flex justify-center items-center">
                {cartUser.length}
              </div>
            )}
          </div>
        </NavLink>

        <div
          onClick={toggleDropdown}
          role="button"
          style={{ backgroundImage: `url(${userImage})` }}
          className="text-customBrown py-0.5 rounded-lg aspect-square  h-[35px] relative inline-block bg-no-repeat bg-cover"
        >
          {isOpen && <Dropdown closeDropdown={closeDropdown} />}
        </div>
      </>
    );
  }

  return (
    <Button style="login" onClick={modalLogin}>
      Login
    </Button>
  );
}

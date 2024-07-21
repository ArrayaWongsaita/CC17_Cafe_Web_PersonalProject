import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function CenterHeader() {
  const { authUser } = useAuth();
  return (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-customPink border-b-2 py-1 border-customPink"
            : "text-customBrown py-1"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/product"
        className={({ isActive }) =>
          isActive
            ? "text-customPink border-b-2 border-customPink py-1"
            : "text-customBrown py-1"
        }
      >
        Product
      </NavLink>
      {authUser?.isAdmin && (
        <NavLink
          to="/admin/order/pending"
          className={({ isActive }) =>
            isActive
              ? "text-customPink border-b-2 border-customPink py-1"
              : "text-customBrown py-1"
          }
        >
          Admin
        </NavLink>
      )}
    </>
  );
}

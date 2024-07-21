import { NavLink } from "react-router-dom";

export default function SidebarForm() {
  return (
    <>
      <NavLink
        to="/admin/order/pending"
        className={({ isActive }) =>
          isActive
            ? "text-white  rounded-lg w-full px-5 py-1 bg-customPink"
            : "text-customBrown w-full px-5 py-1  hover:bg-customPink rounded-lg "
        }
      >
        Order Pending
      </NavLink>
      <NavLink
        to="/admin/order/processing"
        className={({ isActive }) =>
          isActive
            ? "text-white  rounded-lg w-full px-5 py-1 bg-customPink"
            : "text-customBrown w-full px-5 py-1  hover:bg-customPink rounded-lg "
        }
      >
        Order Processing
      </NavLink>
      <NavLink
        to="/admin/order/shipped"
        className={({ isActive }) =>
          isActive
            ? "text-white  rounded-lg w-full px-5 py-1 bg-customPink"
            : "text-customBrown w-full px-5 py-1  hover:bg-customPink rounded-lg "
        }
      >
        Order Shipped
      </NavLink>
      <NavLink
        to="/admin/order/delivered"
        className={({ isActive }) =>
          isActive
            ? "text-white  rounded-lg w-full px-5 py-1 bg-customPink"
            : "text-customBrown w-full px-5 py-1  hover:bg-customPink rounded-lg "
        }
      >
        Order Delivered
      </NavLink>
      <NavLink
        to="/admin/order/all"
        className={({ isActive }) =>
          isActive
            ? "text-white  rounded-lg w-full px-5 py-1 bg-customPink"
            : "text-customBrown w-full px-5 py-1 rounded-lg hover:bg-customPink "
        }
      >
        Order All
      </NavLink>
      <NavLink
        to="/admin/product/create"
        className={({ isActive }) =>
          isActive
            ? "text-white  rounded-lg w-full px-5 py-1 bg-customPink"
            : "text-customBrown w-full px-5 py-1 rounded-lg hover:bg-customPink "
        }
      >
        Create Product
      </NavLink>
      <NavLink
        to="/admin/product/edit"
        className={({ isActive }) =>
          isActive
            ? "text-white  rounded-lg w-full px-5 py-1 bg-customPink"
            : "text-customBrown w-full px-5 py-1 rounded-lg hover:bg-customPink "
        }
      >
        Edit Product
      </NavLink>
    </>
  );
}

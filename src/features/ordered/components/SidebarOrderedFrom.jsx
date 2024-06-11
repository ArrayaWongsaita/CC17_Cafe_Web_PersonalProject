import { NavLink } from "react-router-dom";


export default function SidebarOrderedFrom() {
  return (
    <>
      <NavLink
          to="/ordered/pending"
          className={({ isActive }) =>
            isActive ? 'text-white  rounded-lg w-full px-5 py-1 bg-customPink' : 'text-customBrown w-full px-5 py-1  hover:bg-customPink rounded-lg '
          }
        >
          Order Pending
        </NavLink>
      <NavLink
          to="/ordered/processing"
          className={({ isActive }) =>
            isActive ? 'text-white  rounded-lg w-full px-5 py-1 bg-customPink' : 'text-customBrown w-full px-5 py-1  hover:bg-customPink rounded-lg '
          }
        >
          Order Processing
        </NavLink>
      <NavLink
          to="/ordered/shipped"
          className={({ isActive }) =>
            isActive ? 'text-white  rounded-lg w-full px-5 py-1 bg-customPink' : 'text-customBrown w-full px-5 py-1  hover:bg-customPink rounded-lg '
          }
        >
          Order Shipped
        </NavLink>
      <NavLink
          to="/ordered/delivered"
          className={({ isActive }) =>
            isActive ? 'text-white  rounded-lg w-full px-5 py-1 bg-customPink' : 'text-customBrown w-full px-5 py-1  hover:bg-customPink rounded-lg '
          }
        >
          Order Delivered
        </NavLink>
      <NavLink
          to="/ordered/all"
          className={({ isActive }) =>
            isActive ? 'text-white  rounded-lg w-full px-5 py-1 bg-customPink' : 'text-customBrown w-full px-5 py-1 rounded-lg hover:bg-customPink '
          }
        >
          Order All
        </NavLink>
    </>
  )
}

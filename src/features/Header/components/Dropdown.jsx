import { useEffect } from "react";
import { useRef } from "react";
import useAuth from "../../../hooks/useAuth";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

export default function Dropdown({closeDropdown }) {
  
  const dropdownRef = useRef(null);
  const navigate = useNavigate()

  const {logout} = useAuth()


  const handleLogout = () => {
    logout()
    navigate("/")
  }

  
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };
  

  const handleEscapePress = (event) => {
    if (event.key === 'Escape') {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapePress);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapePress);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div
      ref={dropdownRef}
      className=" text-customBrown origin-top-right absolute right-0 mt-[39px] w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      <div className="py-1" role="none">
        <a
          href="#"
          className="block px-4 py-2 text-sm text-customBrown hover:bg-gray-100"
          role="menuitem"
        >
          Account settings
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-customBrown hover:bg-gray-100"
          role="menuitem"
        >
          Support
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-customBrown hover:bg-gray-100"
          role="menuitem"
        >
          License
        </a>

          <Button onClick={handleLogout} style="logout">Sign out</Button>

      </div>
    </div>
  );
}

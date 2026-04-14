import { NavLink } from "react-router-dom";
import { IoHomeOutline, IoTimeOutline } from "react-icons/io5";
import { MdOutlineQueryStats } from "react-icons/md";
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-12 py-4 border-b border-gray-100 shadow-sm bg-white">
      <div className="w-40">
        <img src={logo} alt="Brand_Logo" className="w-full h-auto" />
      </div>

      <div className="flex items-center gap-6 text-gray-600 font-medium">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-1 bg-[#234e44] text-white px-4 py-2 rounded-md"
              : "flex items-center gap-1 hover:text-[#234e44] transition-colors"
          }
        >
          <IoHomeOutline /> Home
        </NavLink>

        <NavLink
          to="/timeline"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-1 bg-[#234e44] text-white px-4 py-2 rounded-md"
              : "flex items-center gap-1 hover:text-[#234e44] transition-colors"
          }
        >
          <IoTimeOutline /> Timeline
        </NavLink>

        <NavLink
          to="/stats"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-1 bg-[#234e44] text-white px-4 py-2 rounded-md"
              : "flex items-center gap-1 hover:text-[#234e44] transition-colors"
          }
        >
          <MdOutlineQueryStats /> Stats
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
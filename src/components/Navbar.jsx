import { IoHomeOutline, IoTimeOutline, IoBarChartOutline } from "react-icons/io5"; 
import { MdOutlineQueryStats } from "react-icons/md";
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-12 py-4 border-b border-gray-100 shadow-sm">
 
      <div className="w-40">
        <img src={logo} alt="Brand_Logo" className="w-full h-auto" />
      </div>
 
      <div className="flex items-center gap-6 text-gray-600 font-medium">
        <a href="/" className="flex items-center gap-1 bg-[#234e44] text-white px-4 py-2 rounded-md">
          <IoHomeOutline /> Home
        </a>
        <a href="/timeline" className="flex items-center gap-1 hover:text-[#234e44] transition-colors">
          <IoTimeOutline /> Timeline
        </a>
        <a href="/stats" className="flex items-center gap-1 hover:text-[#234e44] transition-colors">
          <MdOutlineQueryStats /> Stats 
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
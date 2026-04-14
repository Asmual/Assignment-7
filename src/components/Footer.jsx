import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#234e44] text-white pt-10 pb-6 px-6 mt-15">
      <div className="max-w-5xl mx-auto text-center">

        <h2 className="text-5xl font-bold mb-4">KeenKeeper</h2>
        

        <p className="text-gray-300 text-md mb-10 mx-auto leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>


        <h3 className="text-xl font-semibold mb-6">Social Links</h3>

        <div className="flex justify-center gap-5 mb-7">
          <a href="#" className="bg-white p-3 rounded-full text-[#234e44] hover:bg-gray-200 transition-all">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="bg-white p-3 rounded-full text-[#234e44] hover:bg-gray-200 transition-all">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className="bg-white p-3 rounded-full text-[#234e44] hover:bg-gray-200 transition-all">
            <FaTwitter size={20} />
          </a>
        </div>


        <div className="border-t border-gray-500/30 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
          <p>© 2026 KeenKeeper. All rights reserved.</p>
          
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
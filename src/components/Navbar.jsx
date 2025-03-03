import { useEffect, useState } from "react";
import { getUserAuth } from "../hooks/userAuth";
import Logo from "../assets/image/logowt2.png";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    setUser(getUserAuth());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("session_id");
    setUser(null);
    window.location.href = "/login";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full">
      <div className="relative shadow-xl">
        <div className="relative z-20 bg-green-700 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 px-2 py-2">
          {/* Mobile Menu Button - Only visible on small screens */}
          <div className="md:hidden absolute right-4 top-4 z-30">
            <button 
              onClick={toggleMenu}
              className="p-2 text-white focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center gap-3">
            {/* Logo */}
            <div className="max-w-[150px] sm:max-w-[200px]">
              <img
                src={Logo}
                alt="Logo"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Thông tin học sinh */}
            <div className="flex flex-row items-center justify-around w-full text-gray-200 gap-3">
              <p className="text-lg font-semibold">
                <span className="font-semibold text-black">Họ và tên học sinh: </span>
                <span className="font-normal">
                  {user ? user.ho_va_ten : "Chưa đăng nhập"}
                </span>
              </p>
              <p className="text-lg font-semibold">
                <span className="font-semibold text-black">Tỉnh: </span>
                <span className="font-normal">{user ? user.noi_o : "..."}</span>
              </p>
            </div>

            {/* Nút Đăng xuất */}
            <div className="relative flex gap-3 mr-1">
              {user ? (
                <div className="bg-green-500 w-[200px] z-20 rounded-3xl backdrop-blur-md font-semibold text-center px-4 py-2 text-white shadow-md transition-transform transform hover:scale-105 hover:bg-green-500">
                  <button onClick={handleLogout}>
                    Đăng xuất
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col">
            {/* Logo - Always visible */}
            <div className="flex justify-center mb-2">
              <div className="max-w-[120px]">
                <img
                  src={Logo}
                  alt="Logo"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Collapsible menu content */}
            <div className={`transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              {/* Thông tin học sinh */}
              <div className="flex flex-col items-center w-full text-gray-200 gap-2 mt-2">
                <p className="text-base font-semibold text-center">
                  <span className="font-semibold text-black">Họ và tên học sinh: </span>
                  <span className="font-normal">
                    {user ? user.ho_va_ten : "Chưa đăng nhập"}
                  </span>
                </p>
                <p className="text-base font-semibold text-center">
                  <span className="font-semibold text-black">Tỉnh: </span>
                  <span className="font-normal">{user ? user.noi_o : "..."}</span>
                </p>
              </div>

              {/* Nút Đăng xuất */}
              {user && (
                <div className="flex justify-center mt-3 mb-2">
                  <div className="bg-green-500 w-full max-w-[200px] z-20 rounded-3xl backdrop-blur-md font-semibold text-center px-4 py-2 text-white shadow-md">
                    <button onClick={handleLogout}>
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="absolute -inset-1 bg-green-500 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 z-10"></div>
      </div>
    </div>
  );
};

export default Navbar;
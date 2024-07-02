import ilkokulLogo2 from "/yapaymacera-yeni.png";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../context/Auth";
import { useState } from "react";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { PiSignIn } from "react-icons/pi";
import { IoIosPaper } from "react-icons/io";
import { MdLanguage } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { IoGameControllerOutline } from "react-icons/io5";

const HeaderIlkogretim = () => {
  const { currentUser, signOutUser } = useAuth();
  const [toggle, setToggle] = useState(false);

  const menuItems = currentUser ? (
    <>
      <a href="/userprofile">
        <button className="child-button">
          <span className="flex items-center gap-2">
            <FaRegUser size={24} /> Profil
          </span>
        </button>
      </a>
      <a href="/gameList">
        <button className="bg-yellow-400 text-blue-800 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-300 transform hover:scale-110 transition duration-300 ease-in-out flex gap-3 items-center">
          <IoGameControllerOutline size={24} />
          <span>Oyunlar</span>
        </button>
      </a>
      <button
        className="child-button-2 !bg-red-600 !text-white !border-red-400"
        onClick={signOutUser}
      >
        <span className="flex items-center gap-2">
          <IoMdExit /> Çıkış Yap
        </span>
      </button>
    </>
  ) : (
    <>
      <a href="/login">
        <button className="child-button">
          <span className="flex items-center gap-2">
            <PiSignIn size={24} /> Giriş Yap
          </span>
        </button>
      </a>
      <a href="/register">
        <button className="child-button-2">
          <span className="flex items-center gap-2">
            <IoIosPaper size={24} /> Kayıt Ol
          </span>
        </button>
      </a>
      <a href="/gameList">
        <button className="bg-yellow-400 text-blue-800 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-300 transform hover:scale-110 transition duration-300 ease-in-out flex gap-3 items-center h-[50px]">
          <IoGameControllerOutline size={24} />
          <span>Oyunlar</span>
        </button>
      </a>
      <a href="/dialog">
        <button className="bg-yellow-400 text-blue-800 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-300 transform hover:scale-110 transition duration-300 ease-in-out flex gap-3 items-center h-[50px]">
          <IoGameControllerOutline size={24} />
          <span>Diyalog</span>
        </button>
      </a>
    </>
  );

  const languageSelector = (
    <select className="text-black outline-none rounded child-select">
      <MdLanguage size={24} />
      <option value="tur">Türkçe</option>
      <option value="eng">English</option>
    </select>
  );

  return (
    <div className="bg-header ">
      {/* overlay */}
      {toggle && (
        <div className="absolute inset-0 lg:hidden bg-black/40 min-h-screen w-screen overflow-hidden z-50"></div>
      )}
      {/* overlay */}
      <header className="relative justify-between z-[500] container mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-20 md:h-28 text-white font-medium text-sm py-8">
        <Toaster position="top-center" reverseOrder={false} />
        <nav
          aria-label="Logo menu"
          className="relative items-center flex text-2xl lg:mt-8 h-full"
        >
          <div className="">
            <a className="logo" href="/home">
              <img
                loading="lazy"
                className="w-20 h-20 mt-4 md:w-36 md:h-36 rounded-full"
                src={ilkokulLogo2}
                alt="ai tech"
              />
            </a>
          </div>
        </nav>
        {toggle ? (
          <div
            className={`lg:hidden w-2/3 sm:w-3/5 md:w-1/3 bg-sky-500 z-40 h-screen fixed left-0 top-0 duration-300`}
          >
            <div className="mt-24">
              <nav
                aria-label="Logo menu"
                className="relative items-center flex justify-center text-2xl lg:mt-8 h-full"
              >
                <div className="">
                  <a className="logo" href="/">
                    <img
                      loading="lazy"
                      className="w-48 h-48 rounded-full"
                      src={ilkokulLogo2}
                      alt="ai tech"
                    />
                  </a>
                </div>
              </nav>
              <div className="flex flex-col gap-4 items-center justify-center h-full">
                {menuItems}
                {languageSelector}
              </div>
            </div>
          </div>
        ) : (
          <div
            className={` ${
              toggle ? "" : " z-40 h-screen fixed -left-96 duration-300 top-0"
            }`}
          ></div>
        )}
        <div className="hidden lg:flex gap-4 items-center justify-center h-full">
          {menuItems}
          {languageSelector}
        </div>
        <div
          onClick={() => setToggle((prev) => !prev)}
          className="lg:hidden block"
        >
          {toggle ? (
            <IoMdClose size={36} />
          ) : (
            <HiOutlineBars3BottomRight className="text-orange-600" size={36} />
          )}
        </div>
      </header>
    </div>
  );
};

export default HeaderIlkogretim;

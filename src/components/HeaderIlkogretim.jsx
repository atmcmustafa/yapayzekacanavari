import ilkokulLogo2 from "/logo-8.png";
import { Toaster } from "react-hot-toast";
import Button from "./Button";
import { useAuth } from "../context/Auth";
import { useState } from "react";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
const HeaderIlkogretim = () => {
  const { currentUser, signOutUser } = useAuth();

  const [toggle, setToggle] = useState(false);
  console.log(toggle);
  return (
    <div className="bg-header ">
      {/* overlay */}
      {toggle && (
        <div className="absolute inset-0 bg-black/40 h-screen w-screen overflow-hidden z-50"></div>
      )}
      {/* overlay */}
      <header className="relative justify-between z-[500]   container mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-28 text-white font-medium text-sm py-8">
        <Toaster position="top-center" reverseOrder={false} />
        <nav
          aria-label="Logo menu"
          className=" relative items-center flex text-2xl lg:mt-8 h-full"
        >
          <div className="">
            <a className="logo" href="/">
              <img
                loading="lazy"
                className="w-28  h-28 lg:w-36   lg:h-36   rounded-full"
                src={ilkokulLogo2}
                alt="ai tech"
              />
            </a>
          </div>
        </nav>

        {toggle ? (
          <div
            className={` w-72 bg-violet-600 z-40 h-screen fixed left-0 top-0 duration-300`}
          >
            <div className="mt-24">
              <nav
                aria-label="Logo menu"
                className=" relative items-center flex justify-center text-2xl lg:mt-8 h-full"
              >
                <div className="">
                  <a className="logo" href="/">
                    <img
                      loading="lazy"
                      className="w-48  h-48  rounded-full"
                      src={ilkokulLogo2}
                      alt="ai tech"
                    />
                  </a>
                </div>
              </nav>
              <div className="flex gap-4 items-center h-full flex-wrap">
                <div className="flex flex-col gap-4  justify-center mx-auto  h-full flex-wrap">
                  <a href="/login">
                    <button className="child-button">Giriş Yap</button>
                  </a>
                  <a href="/register">
                    <button className="child-button-2">Kayıt Ol</button>
                  </a>

                  <select className="text-black outline-none rounded child-select">
                    <option value="deneme">Türkçe</option>
                    <option value="deneme">English</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`${
              toggle ? "" : " z-40 h-screen fixed -left-96 duration-300 top-0"
            } `}
          ></div>
        )}

        {currentUser ? (
          <div className="flex gap-4 items-center justify-center h-full ">
            <a href="/userprofile">
              <button className="btn flex items-center btn-purple">
                Profil
              </button>
            </a>
            <button
              className="border !border-gray-500 btn !text-white !shadow-none !bg-transparent"
              onClick={signOutUser}
            >
              Çıkış Yap
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-4 items-center h-full flex-wrap">
              <div className="hidden md:flex gap-4 items-center h-full flex-wrap">
                {/* <Button
                href={"/login"}
                className={"btn-translucent  cursor-pointer !text-black"}
              >
                Giriş Yap
              </Button> */}
                <a href="/login">
                  <button className="child-button">Giriş Yap</button>
                </a>
                <a href="/register">
                  <button className="child-button-2">Kayıt Ol</button>
                </a>

                {/* <Button
                href={"/register"}
                className={"btn-purple cursor-pointer "}
              >
                Kayıt Ol
              </Button> */}
                <select className="text-black outline-none rounded child-select">
                  <option value="deneme">Türkçe</option>
                  <option value="deneme">English</option>
                </select>
              </div>
              <div
                onClick={() => setToggle((prev) => !prev)}
                className="md:hidden block"
              >
                {toggle ? (
                  <IoMdClose size={48} />
                ) : (
                  <HiOutlineBars3BottomRight size={48} />
                )}
              </div>
            </div>
          </>
        )}
      </header>
    </div>
  );
};

export default HeaderIlkogretim;

import { useState } from "react";
import Button from "./Button";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import ilkokulLogo2 from "/yapaymacera-yeni.png";

import { useAuth } from "../context/Auth";

import { Toaster } from "react-hot-toast";
const Header = () => {
  const [toggle, setToggle] = useState(false);
  const { currentUser, signOutUser } = useAuth();
  return (
    <header className="relative  z-[500]  container mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-28 text-black font-medium text-sm">
      <Toaster position="top-center" reverseOrder={false} />
      <nav
        aria-label="Logo menu"
        className="relative items-center flex text-2xl mt-8 h-full"
      >
        <div className="text-teal-600 dark:text-teal-300">
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

      <button
        onClick={() => setToggle((prev) => !prev)}
        className="menu-toggle block ml-auto lg:hidden relative z-50 text-3xl"
      >
        <HiMiniBars3BottomRight />
      </button>

      <nav className="hidden grid lg:flex items-center justify-center content-center gap-y-4 flex-1 z-40 fixed inset-0 lg:static bg-gray-900 lg:bg-transparent text-base sm:text-sm">
        <div className="hidden shrink-0 lg:flex group relative mx-auto mt-3 mb-0 px-3 pt-2 pb-5 cursor-pointer">
          <a
            href="/"
            className="text-center mx-auto lg:mx-3 transition-colors hover:text-violet-400"
          >
            İlkokul
          </a>
          <a
            href="/document/giris"
            className="text-center mx-auto lg:mx-3 transition-colors hover:text-violet-400"
          >
            Dokümantasyon
          </a>
          <a
            href="/test"
            className="text-center mx-auto lg:ml-3 lg:mr-auto transition-colors hover:text-violet-400"
          >
            Test
          </a>
        </div>

        {currentUser ? (
          <div className="flex gap-4">
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
            <Button
              href={"/login"}
              className={"btn-translucent mr-4 cursor-pointer !text-black"}
            >
              Giriş Yap
            </Button>
            <Button href={"/register"} className={"btn-purple cursor-pointer"}>
              Kayıt Ol
            </Button>
          </>
        )}
      </nav>

      {/* mobile  */}
      {toggle ? (
        <nav className="visible opacity-100  z-50 lg:hidden fixed duration-300  left-0 top-0 w-64 bg-gradient-to-r from-[#0f0c29] to-[#302b63]  h-screen ">
          <div
            onClick={() => setToggle(false)}
            className="absolute w-screen h-screen -z-30 bg-black/60"
          ></div>
          <nav
            aria-label="Logo menu"
            className="relative items-center flex text-2xl mx-auto w-full"
          >
            <div className="mx-auto mt-16 text-teal-600 dark:text-teal-300">
              <a href="/">
                <img
                  className="w-32 h-32 rounded-full"
                  src={ilkokulLogo2}
                  alt="ai tech"
                />
              </a>
            </div>
          </nav>
          <div className="inline-flex flex-col mt-24 gap-8 items-center justify-center w-full">
            <a
              href="/document/giris"
              className="text-center mx-auto lg:mx-3 transition-colors hover:text-violet-400"
            >
              Dokümantasyon
            </a>
            <a
              href="/test"
              className="text-center mx-auto lg:ml-3 lg:mr-auto transition-colors hover:text-violet-400"
            >
              Test
            </a>
            {currentUser ? (
              <div className="flex gap-4 items-center justify-center mx-auto">
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
                <Button
                  href={"/login"}
                  className={"btn-translucent  cursor-pointer"}
                >
                  Giriş Yap
                </Button>
                <Button
                  href={"/register"}
                  className={"btn-purple cursor-pointer"}
                >
                  Kayıt Ol
                </Button>
              </>
            )}
          </div>
        </nav>
      ) : (
        <nav className="invisible opacity-0 -left-[999px] z-50 lg:hidden fixed duration-300  top-0 w-64 bg-gradient-to-r from-[#0f0c29] to-[#302b63]  h-screen "></nav>
      )}
    </header>
  );
};

export default Header;

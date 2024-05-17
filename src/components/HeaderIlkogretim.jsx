import ilkokulLogo2 from "/logo-8.png";
import { Toaster } from "react-hot-toast";
import Button from "./Button";
import { useAuth } from "../context/Auth";

const HeaderIlkogretim = () => {
  const { currentUser, signOutUser } = useAuth();
  return (
    <div className="bg-header ">
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
              <Button
                href={"/login"}
                className={"btn-translucent  cursor-pointer !text-black"}
              >
                Giriş Yap
              </Button>
              <Button
                href={"/register"}
                className={"btn-purple cursor-pointer "}
              >
                Kayıt Ol
              </Button>
              <select
                className="text-black h-9 w-24 outline-none rounded"
                name=""
                id=""
              >
                <option value="deneme">Türkçe</option>
                <option value="deneme">English</option>
              </select>
            </div>
          </>
        )}
      </header>
    </div>
  );
};

export default HeaderIlkogretim;

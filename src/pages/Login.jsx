import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { useState } from "react";
import { useFormik } from "formik";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import { Analytics } from "@vercel/analytics/react";

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Zorunlu alan!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "* Geçersiz e-posta formatı.";
  }

  if (!values.password) {
    errors.password = "Zorunlu alan!";
  } else if (values.password.length <= 5) {
    errors.password = "* Şifreniz 6 karakter veya daha büyük olmalı";
  }

  return errors;
};

const Login = () => {
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await login(values.email, values.password);
        console.log("basarili");
        toast.success("Giriş başarılı. Yönlendiriliyorsunuz..");

        setTimeout(() => {
          navigate("/");
        }, 2000);
        setLoading(false);
      } catch {
        console.log("hata");
        toast.error("Bir hata oluştu. Tekrar deneyin.");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleGoogleSignIn = () => {
    googleSignIn(() => navigate("/userprofile"));
  };

  return (
    <>
      <Header />
      <div className=" mt-4 px-4 md:px-0 md:mt-32 items-center justify-center bg-login-image relative container mx-auto text-white">
        <Toaster position="top-center" reverseOrder={false} />
        <form
          className="flex flex-col mx-auto border text-white shadow-xl  border-gray-700 my-24 max-w-3xl w-full rounded-xl p-7"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="mx-auto text-3xl mb-4 text-white">Giriş Yap</h1>

          <div className="flex flex-col justify-center mb-4 relative ">
            <div className="absolute -top-44 -right-12 -z-2">
              <img
                src="https://freesvg.org/storage/img/thumb/construction-girl.png"
                alt=""
              />
            </div>
            <div className="absolute -bottom-[420px] -left-8 -z-2">
              <img
                src="https://freesvg.org/storage/img/thumb/CipyMail.png"
                alt="kid"
              />
            </div>
            <span className="inline-block mb-0.5">
              Giriş yap ve maceraya başla!
            </span>
            <a
              onClick={handleGoogleSignIn}
              className="border cursor-pointer flex justify-center items-center gap-4 h-10  text-white  hover:bg-black/20 duration-300"
            >
              <FcGoogle size={24} />
              Google ile Giriş Yap
            </a>
          </div>

          <div className="relative my-4">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm -mt-0.5">
              <span className="px-2 bg-color text-zinc-100 font-medium">
                veya
              </span>
            </div>
          </div>

          <div className="flex flex-col mb-2 ">
            <label className="text-xs mb-0.5  " htmlFor="email">
              E-Mail Adresi
            </label>
            <input
              placeholder="example@gmail.com"
              className="outline-none text-black border px-2 h-10 text-sm  "
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />

            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="flex flex-col  ">
            <label className="text-xs mb-0.5  " htmlFor="password">
              Şifre
            </label>
            <input
              placeholder="Şifreniz"
              className="outline-none text-black border px-2 h-10 text-sm "
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />

            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-600 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <button
            className=" glow-on-hover disabled:opacity-50  disabled:pointer-events-none antialiased mt-3  !h-10 !w-full"
            type="submit"
            disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
          >
            {loading ? "Yükleniyor.." : "Giriş Yap"}
          </button>

          <div className="flex flex-col mt-4 gap-2">
            <a className="text-[14px] text-center w-fit mx-auto" href="#">
              Parolanızı mı unuttunuz?
            </a>
            <p className="text-[14px] text-gray-400 text-center ">
              Hesabınız yok mu?
              <a
                className="text-center ml-1 text-white w-fit mx-auto"
                href="/register"
              >
                Şimdi kaydolun.
              </a>
            </p>
          </div>
        </form>
      </div>
      <Analytics />
    </>
  );
};

export default Login;

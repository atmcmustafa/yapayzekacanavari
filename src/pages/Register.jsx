import { useState } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { Analytics } from "@vercel/analytics/react";
import Layout from "../layout/Layout";

const Register = () => {
  const { register, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Geçersiz e-posta formatı.")
      .required("Zorunlu alan!"),
    password: Yup.string()
      .min(6, "Şifreniz 6 karakter veya daha büyük olmalı")
      .required("Zorunlu alan!"),
    acceptedTerms: Yup.boolean().oneOf(
      [true],
      "Sözleşmenin kabul edilmesi gerekmektedir."
    ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      acceptedTerms: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await register(values.email, values.password);
        toast.success("Kayıt başarılı. Yönlendiriliyorsunuz..");
        navigate("/userprofile");
      } catch (error) {
        toast.error("Bir hata oluştu. Tekrar deneyin.");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await googleSignIn();
      navigate("/userprofile");
    } catch (error) {
      toast.error("Google ile giriş başarısız oldu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className=" mt-4 px-4 md:px-0 md:mt-32 items-center justify-center bg-login-image relative container mx-auto text-white">
        <Toaster position="top-center" reverseOrder={false} />
        <form
          className="flex flex-col mx-auto border text-black shadow-xl mt-20  border-gray-700 xl:max-w-xl 2xl:max-w-2xl w-full rounded-xl p-7"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="mx-auto text-3xl mb-4 text-black ">Kayıt Formu</h1>

          <div className="flex flex-col justify-center mb-4 relative">
            <div className="absolute -top-32 md:-top-44 -right-12 -z-2">
              <img
                className="w-full h-24 md:h-full"
                src="https://freesvg.org/storage/img/thumb/construction-girl.png"
                alt=""
              />
            </div>
            <div className="absolute -bottom-[420px] -left-8 -z-2">
              <img
                className="w-full h-24 md:h-full"
                src="https://freesvg.org/storage/img/thumb/CipyMail.png"
                alt="kid"
              />
            </div>
            <span className="inline-block mb-0.5">
              Hesabını oluştur ve maceraya başla!
            </span>
            <a
              onClick={handleGoogleSignIn}
              className="border flex cursor-pointer justify-center items-center gap-4 h-10  text-black  hover:bg-black/20 duration-300"
            >
              <FcGoogle size={24} />
              Google ile Kayıt Ol
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
            <label htmlFor="email" className="text-xs mb-0.5 ">
              E-Mail Adresi
            </label>
            <input
              placeholder="example@gmail.com"
              className="outline-none border text-black px-2 h-10 text-sm"
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

          <div className="flex flex-col">
            <label htmlFor="password" className="text-xs mb-0.5 ">
              Şifre
            </label>
            <input
              placeholder="Şifreniz"
              className="outline-none border text-black px-2 h-10 text-sm"
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

          <div className="flex gap-1.5 mt-3 items-center">
            <input
              className="radio"
              id="acceptedTerms"
              name="acceptedTerms"
              type="checkbox"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.acceptedTerms}
            />
            <label htmlFor="acceptedTerms">
              <span className="text-gray-500">
                <a href="/gizlilik_sozlesmesi" className="text-black mr-1">
                  Sözleşmeyi
                </a>
                okudum ve onaylıyorum.
              </span>
            </label>
          </div>

          <button
            className=" glow-on-hover disabled:opacity-50  disabled:pointer-events-none antialiased mt-3  !h-10 !w-full"
            type="submit"
            disabled={
              !(formik.isValid && formik.dirty) ||
              formik.isSubmitting ||
              loading
            }
          >
            {loading ? "Yükleniyor.." : "Kayıt Ol"}
          </button>

          <div className="flex flex-col mt-4 gap-2">
            <a className="text-[14px] text-center w-fit mx-auto" href="#">
              Parolanızı mı unuttunuz?
            </a>
            <p className="text-[14px] text-gray-400 text-center">
              Hesabınız var mı?
              <a
                className="text-center ml-1 text-black w-fit mx-auto"
                href="/login"
              >
                Şimdi giriş yapın.
              </a>
            </p>
          </div>
        </form>
      </div>
      <Analytics />
    </Layout>
  );
};

export default Register;

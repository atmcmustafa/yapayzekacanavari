import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { useEffect, useState, useRef } from "react";
import { db } from "../firebase-config";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { uploadProfilePicture } from "../firebase-config.js";
import Header from "../components/Header.jsx";
import { Analytics } from "@vercel/analytics/react";
import Layer from "../components/Layer.jsx";
import HeaderIlkogretim from "../components/HeaderIlkogretim.jsx";
const UserProfile = () => {
  const { currentUser, signOutUser } = useAuth();
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [level, setLevel] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [userProfile, setUserProfile] = useState({});

  const fileInputRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setName(docSnap.data().name);
          setBio(docSnap.data().bio);
          setLevel(docSnap.data().level);
          setProfilePhoto(docSnap.data().profilePhoto);
          setUserProfile(docSnap.data());
        } else {
          console.log("No such document!");
          await setDoc(docRef, {
            name: name,
            bio: bio,
            level: level,
            profilePhoto: profilePhoto,
          });
        }
      }
    };

    loadUserProfile();
  }, [currentUser]);

  // resim yükleme
  const handleUpload = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) return;
    setLoading(true);
    const photoURL = await uploadProfilePicture(currentUser.uid, file);
    setProfilePhoto(photoURL);
    setLoading(false);
    console.log("Profil fotoğrafı güncellendi.");
  };

  // form gönderme
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userProfileData = {
        name: name,
        bio: bio,
        level: level,
        profilePhoto: profilePhoto,
      };

      setLoading(true);

      if (profilePhoto) {
        userProfileData.profilePhoto = profilePhoto;
      }

      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, userProfileData);

      setUpdate(false);
    } catch (error) {
      console.error("Profil güncellenirken bir hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {currentUser ? (
        <div className=" container mx-auto p-4 md:p-0">
          <HeaderIlkogretim />
          <Layer />
          <div className="p-7 rounded-xl border border-gray-700 text-orange-600 mt-8 lg:mt-24">
            <div className="flex flex-col relative gap-4 md:gap-4 md:flex-row justify-between  ">
              <div className="flex flex-col   md:flex-row  gap-7">
                <div className="img w-36 rounded ">
                  <div className="flex gap-4 flex-col w-full">
                    {profilePhoto ? (
                      <img
                        className="rounded"
                        src={profilePhoto}
                        alt="Profil Fotoğrafı"
                        style={{ width: "100px", height: "100px" }}
                      />
                    ) : (
                      <img
                        className="rounded"
                        src={
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVLDP5s2j9u1x86fOb7kNKXanJeMn8zZ30ZQ&s"
                        }
                        alt="Profil Fotoğrafı Yok"
                        style={{ width: "100px", height: "100px" }}
                      />
                    )}
                    {loading && "yükleniyor..."}

                    {update && (
                      <>
                        <input type="file" ref={fileInputRef} />
                        <button className="btn" onClick={handleUpload}>
                          Yüklemeyi Onayla
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <h2>Profil</h2>

                  <form className="flex flex-col gap-4 ">
                    <div
                      className={`${
                        update
                          ? "shadow-none !text-white !bg-red-600 btn cursor-pointer hover:opacity-80"
                          : "shadow-none !text-white !bg-green-600 btn cursor-pointer hover:opacity-80"
                      }`}
                      onClick={() => setUpdate((prev) => !prev)}
                    >
                      {update ? "İptal Et" : "Profili Güncelle"}
                    </div>
                    <div className="flex flex-col ">
                      <label className="text-xs mb-1" htmlFor="">
                        İsim
                      </label>
                      <input
                        className={`${
                          update
                            ? "bg-transparent border text-black  outline-none"
                            : "pointer-events-none "
                        } bg-slate-900 h-10 rounded-xl px-4 `}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Adınız"
                        required
                      />
                    </div>
                    <div className="flex flex-col ">
                      <label className="text-xs mb-1" htmlFor="">
                        Biyografi
                      </label>
                      <textarea
                        className={`${
                          update
                            ? "bg-transparent border text-black  outline-none"
                            : "pointer-events-none "
                        } bg-slate-900 h-24 rounded-xl px-4 py-1`}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Biyografi"
                      />
                    </div>

                    <div className="flex flex-col ">
                      <label className="text-xs mb-1" htmlFor="">
                        Seviye
                      </label>

                      <select
                        className={`${
                          update
                            ? "bg-transparent border text-black  outline-none"
                            : "pointer-events-none "
                        } bg-slate-900 h-10 rounded-xl px-2`}
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                      >
                        <option className="text-black" value="ilkogretim">
                          İlköğretim
                        </option>
                        <option className="text-black" value="ortaogretim">
                          Ortaöğretim
                        </option>
                      </select>
                    </div>
                    {update ? (
                      <button
                        type="submit"
                        className="border border-gray-500 h-10 rounded "
                        onClick={handleSubmit}
                      >
                        Güncellemeyi Onayla
                      </button>
                    ) : (
                      <button
                        disabled
                        type="submit"
                        className="border border-gray-500 h-10 rounded disabled:opacity-50"
                        onClick={handleSubmit}
                      >
                        Güncellemeyi Onayla
                      </button>
                    )}
                  </form>
                </div>
              </div>
              <div>
                <h2>Aldığım Eğitimler</h2>
                {userProfile.readArticles &&
                  userProfile.readArticles.map((article, index) => (
                    <li className="ml-3 text-gray-500 mb-1" key={index}>
                      {article}
                    </li>
                  ))}

                {userProfile.readArticles ? (
                  ""
                ) : (
                  <div className="text-red-600">Eğitim bulunamadı</div>
                )}
              </div>
              <div>
                {currentUser && (
                  <div className="flex flex-col gap-4">
                    <a href="/home">
                      <button
                        className="child-button-2 !bg-blue-600 !text-white !border-blue-400 "
                        onClick={signOutUser}
                      >
                        Ana Sayfaya Dön
                      </button>
                    </a>

                    <button
                      className="child-button-2 !bg-red-600 !text-white !border-red-400"
                      onClick={signOutUser}
                    >
                      Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        navigate("/login")
      )}
      <Analytics />
    </>
  );
};

export default UserProfile;

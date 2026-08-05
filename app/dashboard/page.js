"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { useSession, signOut } from "next-auth/react";
import FundHistory from "./components/funding-history";
import {
  fetchUser,
  fetchPayment,
  UpdateProfile,
  updateProfilePics,
  deleteAccount,
} from "@/actions/useractions";
import { ServiceContext } from "@/lib/contexts/ServiceContext";

const dashboard = () => {
  const [saveChanges, setsaveChanges] = useState(false);
  const [anyChange, setanyChange] = useState(false);
  const [profileData, setprofileData] = useState({});
  const [payments, setpayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showNotifications } = useContext(ServiceContext);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loadingAccountDelete, setloadingAccountDelete] = useState(false);

  const { data: session, update } = useSession();

  useEffect(() => {
    if (session?.user?.name) {
      getData();
    }
  }, [session]);

  const getData = async () => {
    const userData = await fetchUser(session?.user?.name);
    const userPayments = await fetchPayment(session?.user?.name);
    setpayments(userPayments);
    setLoading(false);
    if (!userData) return;
    setprofileData(userData);
  };

  const handleChange = (e) => {
    setprofileData({ ...profileData, [e.target.name]: e.target.value });
    setanyChange(true);
  };

  const updateChange = async (datas) => {
    let updatedData = { ...datas };

    if (datas.username) {
      updatedData.username = datas.username.toLowerCase();
    }
    const data = await UpdateProfile(updatedData, session?.user?.name);
    if (!data) return;
    if (!data.success) {
      showNotifications(data.message, "error");
      setTimeout(() => window.location.reload(), 2000);
      return;
    }
    if (data.success) {
      await update({ user: { name: updatedData.username } });
      showNotifications(data.message);
      setTimeout(() => window.location.reload(), 2000);
    }
  };

const handleProfile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "chai_pics");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dt4qdszmp/image/upload`,
      { method: "POST", body: formData },
    );
    const data = await res.json();

    const squareUrl = data.secure_url.replace("/upload/", "/upload/c_pad,w_500,h_500,b_auto/");

    await updateProfilePics(session?.user?.email, squareUrl);
    await update({ user: { image: squareUrl } });
    window.location.reload();
  };

  return (
    <>
      <div className="dashboard flex py-10 pb-28 justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="wrapper h-full flex flex-col md:pt-2 gap-8 md:gap-10 w-[92%] sm:w-[90%] md:w-[80%] max-w-5xl">
          <div className="account-edits relative flex flex-col px-6 md:px-8 py-7 pb-9 md:pb-10 bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
            <div className="flex gap-4 items-center justify-between mb-6 pb-5 border-b border-stone-200/50">
              <div className="flex gap-4 items-center">
                <div className="relative w-14 md:w-18 h-14 md:h-18 shrink-0 group">
                  {loading ? (
                    <div className="rounded-full w-full h-full bg-stone-200 animate-pulse" />
                  ) : (
                    <Image
                      fill
                      className="rounded-full object-cover border-2 border-white ring-4 ring-amber-100/50 shadow-md"
                      src={
                        profileData.ProfilePic
                          ? profileData.ProfilePic
                          : `/images/catPic.jpg`
                      }
                      alt="ProfileLogo"
                    />
                  )}
                  <label className="absolute inset-0 flex items-center justify-center rounded-full bg-amber-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200 cursor-pointer">
                    <span className="material-symbols-outlined text-white text-[22px] drop-shadow-md">
                      photo_camera
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        handleProfile(e);
                      }}
                    />
                  </label>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="md:text-xl font-bold font-lato text-stone-900 drop-shadow-sm">
                      {session?.user?.name}
                    </span>
                    <span className="px-2.5 py-0.5 text-[11px] font-bold bg-gradient-to-r from-amber-500 to-orange-400 text-white rounded-full shadow-sm">
                      Creator Account
                    </span>
                  </div>
                  <span className="text-xs md:text-sm text-stone-600 font-medium mt-0.5">
                    {session?.user?.email}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-stone-600 uppercase tracking-wider font-bold">
                  Name
                </label>
                <input
                  onChange={handleChange}
                  disabled={!saveChanges}
                  type="text"
                  name="name"
                  value={profileData.name || ""}
                  placeholder="Set name"
                  className={`inputs-styling ${saveChanges ? "bg-white/80 border-amber-300 text-stone-900 shadow-sm ring-2 ring-amber-200/50" : "bg-white/40 border-stone-200/50 opacity-80 cursor-not-allowed text-stone-600"}`}
                />
                <span className="text-red-500 text-xs font-medium">
                  {profileData?.name?.length > 12 &&
                    "Name must be less than 12 characters"}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-stone-600 uppercase tracking-wider font-bold">
                  Username
                </label>
                <input
                  onChange={handleChange}
                  disabled={!saveChanges}
                  type="text"
                  name="username"
                  value={profileData?.username || ""}
                  placeholder="username"
                  className={`inputs-styling ${saveChanges ? "bg-white/80 border-amber-300 text-stone-900 shadow-sm ring-2 ring-amber-200/50" : "bg-white/40 border-stone-200/50 opacity-80 cursor-not-allowed text-stone-600"}`}
                />
                <span className="error text-xs text-red-500 font-medium">
                  {profileData?.username?.length > 0 &&
                  profileData?.username?.length < 4
                    ? "Username should be more than 4 characters"
                    : profileData?.username?.length > 12
                      ? "Username should not exceed 12 characters"
                      : /[^a-zA-Z0-9]/.test(profileData?.username)
                        ? "Username can only contain letters and numbers"
                        : ""}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-stone-600 uppercase tracking-wider font-bold">
                  Email
                </label>
                <input
                  disabled={true}
                  type="email"
                  name="email"
                  value={profileData.email || ""}
                  className={`inputs-styling cursor-not-allowed bg-black/5 border-transparent text-stone-500`}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-stone-600 uppercase tracking-wider font-bold">
                  Gender
                </label>
                <select
                  disabled={!saveChanges}
                  name="gender"
                  onChange={handleChange}
                  value={profileData.gender || ""}
                  className={`inputs-styling ${saveChanges ? "bg-white/80 border-amber-300 text-stone-900 shadow-sm ring-2 ring-amber-200/50" : "bg-white/40 border-stone-200/50 opacity-80 cursor-not-allowed text-stone-600"}`}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                if (saveChanges && anyChange) {
                  updateChange(profileData);
                }
                setsaveChanges(!saveChanges);
                setanyChange(false);
              }}
              className={`flex cursor-pointer md:absolute md:top-7 md:right-8 items-center gap-1.5 w-fit px-5 text-xs md:text-sm py-2.5 self-end mt-6 md:mt-0 transition-all duration-300 rounded-full shadow-md hover:shadow-lg ${saveChanges ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-white font-bold" : "bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-semibold"}`}
            >
              {!saveChanges && (
                <span className="material-symbols-outlined !text-base text-amber-600">
                  edit
                </span>
              )}
              {!saveChanges ? "Edit Profile" : "Save Changes"}
            </button>
          </div>

          <FundHistory payments={payments} />
          
          <div className="border border-red-200/80 rounded-3xl p-6 bg-red-50/60 backdrop-blur-md shadow-[0_8px_30px_rgba(239,68,68,0.06)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-sm text-red-700 mb-0.5">Danger Zone</h3>
              <p className="text-xs text-red-900/60 font-medium">
                Once deleted, your account and all data will be permanently removed.
              </p>
            </div>
            <button
              onClick={() => setConfirmDelete(true)}
              className="text-xs font-bold px-5 py-2.5 rounded-full border border-red-300 bg-white text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm shrink-0 self-start sm:self-auto active:scale-95"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
      {confirmDelete && (
        <div
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setConfirmDelete(false)}
        >
          <div
            className="bg-white rounded-2xl border border-stone-200 p-6 w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-3">
              <span className="material-symbols-outlined !text-[18px] text-red-500">
                delete_forever
              </span>
            </div>
            <p className="font-bold text-sm text-stone-800 mb-1">
              Delete your account?
            </p>
            <p className="text-xs text-stone-400 mb-5 leading-relaxed">
              This will permanently delete your profile, posts, comments and all
              data. This cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 py-2 rounded-xl border border-stone-200 text-xs font-medium text-stone-500 hover:bg-stone-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  setloadingAccountDelete(true);
                  const result = await deleteAccount(session?.user?.name);
                  if (result.success) {
                    await signOut({ callbackUrl: "/" });
                    setloadingAccountDelete(false);
                  }
                  setloadingAccountDelete(false);
                }}
                className="flex-1 py-2 rounded-xl bg-red-500 text-xs font-medium text-white hover:bg-red-600 transition-colors"
              >
                {loadingAccountDelete ? "Deleting account..." : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default dashboard;

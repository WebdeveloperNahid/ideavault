"use client";

import { UpdateUserModal } from "@/components/EditModal";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { FaUser, FaEnvelope, FaShieldAlt, FaArrowLeft } from "react-icons/fa";

const Profile = () => {
  const { data: userData, isPending } = authClient.useSession();
  const user = userData?.user;

  if (isPending) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl p-8 shadow-xl animate-pulse">
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 bg-gray-200 rounded-full mb-4" />
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-8" />
          </div>
          <div className="space-y-4">
            <div className="h-12 bg-gray-100 rounded-2xl" />
            <div className="h-12 bg-gray-100 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl p-8 shadow-xl text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaShieldAlt className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-500 mb-6">
            Please log in to view your profile dashboard.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-colors shadow-lg shadow-blue-600/20"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-gray-50/50">
      {/* Back Button */}
      <div className="w-full max-w-md mb-4 text-left">
        <Link
          href="/home"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
        >
          <FaArrowLeft className="w-3 h-3" /> Back to Home
        </Link>
      </div>

      {/* Main Profile Card */}
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden transition-all hover:shadow-2xl">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative" />

        <div className="px-6 pb-8 relative flex flex-col items-center">
          {/* Avatar */}
          <div className="relative w-28 h-28 -mt-14 mb-4 rounded-full ring-4 ring-white shadow-lg bg-gray-100 overflow-hidden">
            <Image
              src={user?.image || "/images/avatar.png"}
              alt={user?.name || "User Avatar"}
              width={112}
              height={112}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* User Meta */}
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
            {user?.name}
          </h2>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 mb-6">
            <FaShieldAlt className="w-3 h-3" /> Verified User
          </span>

          {/* Account Details List */}
          <div className="w-full space-y-4">
            {/* Name Field */}
            <div className="flex items-center gap-4 p-3.5 bg-gray-50 rounded-2xl border border-gray-100/50">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-400 shadow-sm">
                <FaUser className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                  Full Name
                </p>
                <p className="text-sm font-semibold text-gray-700 truncate">
                  {user?.name}
                </p>
              </div>
            </div>

            {/* Email Field */}
            <div className="flex items-center gap-4 p-3.5 bg-gray-50 rounded-2xl border border-gray-100/50">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-400 shadow-sm">
                <FaEnvelope className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                  Email Address
                </p>
                <p className="text-sm font-semibold text-gray-700 truncate">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* মডাল বাটনটি এখন পুরো কার্ড জুড়ে সুন্দরভাবে ফিট হবে */}
            <div className="pt-2">
              <UpdateUserModal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

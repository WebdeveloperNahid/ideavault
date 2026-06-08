"use client";

import { Button, Input } from "@heroui/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient, signUp } from "@/lib/auth-client";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import Image from "next/image";

export default function Register() {
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const registerData = Object.fromEntries(formData.entries());

    const { error } = await signUp.email({
      ...registerData,
    });

    if (error) {
      toast.error("Registration failed");
      return;
    }

    toast.success("Registration successful");
    router.push("/login");
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "https://ideavault-nine-zeta.vercel.app/home",
    });
  };

  return (
    <div className="min-h-[80vh] flex flex-col bg-slate-50 py-12">
      <div className="grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

            <div className="text-center space-y-2 relative">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Join <span className="text-blue-600">IdeaVault</span>
              </h2>

              <p className="text-slate-500 font-medium">
                Create your account to start learning
              </p>
            </div>

            {/* Google button */}
            <div className="space-y-2">
              <Button
                onClick={handleGoogleSignIn}
                variant="bordered"
                className="w-full h-12 font-bold rounded-2xl border-slate-200 hover:bg-slate-50 transition-colors gap-3 flex justify-center items-center border-2 border-gray-300 "
              >
                <Image
                  width={20}
                  height={20}
                  src="https://www.google.com/favicon.ico"
                  className="w-5 h-5 "
                  alt="Google"
                />
                Sign in with Google
              </Button>
            </div>

            <form className="space-y-6" onSubmit={handleRegister}>
              {/* Name */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Full Name
                </label>

                <div className="relative">
                  <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 z-10" />

                  <Input
                    id="name"
                    required
                    placeholder="Enter your name"
                    name="name"
                    className="pl-10  border-2 border-gray-300 py-3 w-full rounded-2xl "
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 z-10" />

                  <Input
                    id="email"
                    required
                    placeholder="Enter your email"
                    type="email"
                    name="email"
                    className="pl-10  border-2 border-gray-300 py-3 w-full rounded-2xl"
                  />
                </div>
              </div>

              {/* Image */}
              <div className="space-y-2">
                <label
                  htmlFor="image"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Profile Image URL
                </label>

                <div className="relative">
                  <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 z-10" />

                  <Input
                    id="image"
                    placeholder="https://images.unsplash.com/..."
                    type="url"
                    name="image"
                    className="pl-10  border-2 border-gray-300 py-3 w-full rounded-2xl"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 z-10" />

                  <Input
                    id="password"
                    required
                    placeholder="••••••••"
                    type="password"
                    name="password"
                    className="pl-10 border-2 border-gray-300 py-3 w-full rounded-2xl"
                  />
                </div>
                <p className="text-[10px] text-gray-600 font-semibold">
                  Must be at least 8 characters
                </p>
              </div>

              <Button
                color="primary"
                type="submit"
                className="w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-blue-600/20 group flex justify-center items-center bg-blue-600 text-gray-200 "
              >
                Create Account
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform bg" />
              </Button>
            </form>

            <div className="text-center pt-2">
              <p className="text-sm text-slate-500 font-medium">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 font-black hover:underline underline-offset-4 transition-all"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

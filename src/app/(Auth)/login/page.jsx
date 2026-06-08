"use client";

import { Button, Input } from "@heroui/react";

import Link from "next/link";

import { Mail, Lock, ArrowRight } from "lucide-react";

import Image from "next/image";
import { authClient, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(e.currentTarget);

    const formData = new FormData(e.currentTarget);
    const loginData = Object.fromEntries(formData.entries());

    // for proxy to acces by login by any where
    const params = new URLSearchParams(window.location.search);
    const callbackURL = params.get("callbackURL") || "/home";

    const { data, error } = await signIn.email({
      ...loginData,
      // callbackURL: callbackURL,
      dontNavigate: true,
    });

    // const { data: tokenData } = await authClient.token();
    // console.log(tokenData);

    if (error) {
      toast.error("Login failed");
      return;
    }
    toast.success("Login Successfull!");

    setTimeout(() => {
      router.push(callbackURL);
    }, 800);
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "https://ideavault-nine-zeta.vercel.app/home",
    });
  };
  return (
    <div className="min-h-[80vh] flex flex-col bg-slate-50">
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

            <div className="text-center space-y-2 relative">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Welcome <span className="text-blue-600">Back</span>
              </h2>
              <p className="text-slate-500 font-medium">
                Continue your learning journey today
              </p>
            </div>

            <div className="space-y-4">
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

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">
                  Or with email
                </span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
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
              <div className="flex justify-end">
                <Link
                  href="#"
                  className="text-sm font-bold text-blue-600 hover:underline underline-offset-4 transition-all"
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                color="primary"
                type="submit"
                className="w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-blue-600/20 group flex justify-center items-center bg-blue-600 text-gray-200"
              >
                Sign In{" "}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="text-center pt-2">
              <p className="text-sm text-slate-500 font-medium">
                New to IdeaVault?{" "}
                <Link
                  href="/registration"
                  className="text-blue-600 font-black hover:underline underline-offset-4 transition-all"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

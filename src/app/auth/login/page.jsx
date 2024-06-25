"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { LoginUser } from "@/services/userService";
import LoadingComponent from "../../loading";

export default function LoginPage() {
  const router = useRouter();
  const session = useSession();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    setLoading(true);
    try {
      await LoginUser(email, password)
      await LoginUser(email, password)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (session.status === "loading") {
    return <LoadingComponent />;
    return <LoadingComponent />;
  }

  if (session.status === "authenticated") {
    router?.push("/marketplace");
    router?.push("/marketplace");
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt=""
            loading="lazy"
            width={1200}
            height={427}
            decoding="async"
            className="mx-auto h-8 w-auto"
            src="/nike.webp"
          ></img>
          <h2 className="mt-10 text-center font-gothic text-2xl font-normal leading-9 tracking-tight text-gray-900">
            YOUR ACCOUNT FOR
            <br></br>
            EVERYTHING NIKE
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email address"
                  required
                  autoFocus
                  className="block w-full rounded-lg border-0  px-4 py-1.5 text-gray-900 shadow-sm outline outline-offset-0 outline-gray-600 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  required
                  className="block w-full rounded-lg border-0  px-4 py-1.5 text-gray-900 shadow-sm outline outline-offset-0 outline-gray-600 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="check-box"
                      className="h-4 w-4 rounded border-gray-800 text-indigo-600 focus:ring-indigo-600 "
                    ></input>
                    <label
                      htmlFor="remember-me"
                      className="text-md ml-3 block font-light leading-6 text-gray-600"
                    >
                      Keep me signed in
                    </label>
                  </div>

                  <div className="text-sm leading-6">
                    <button
                    type="button"
                      onClick={() => router.push("/auth/forgot-password")}
                      
                      className="font-light text-gray-700 hover:text-black"
                    >
                      Forgotten your password?
                    </button>
                  </div>
                </div>
                <p className="text-md px-4 py-3 text-center font-light text-gray-500">
                  By logging in, you agree to Nike&apos;s{" "}
                  <span className="underline">Privacy Policy</span> and
                  <span className="underline"> Terms of use</span>.
                </p>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? <span>PROCESSING...</span> : <span>SIGN IN</span>}
              </button>
              <p className="my-2 font-medium text-red-500">{error && error}</p>
            </div>
          </form>
          <div className="mt-10">
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-900">OR</span>
              </div>
            </div>

            <div className="mt-6 gap-4">
              <div
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-md  px-3 py-1.5 text-gray-600  ring-2 ring-gray-300 hover:bg-gray-100 focus-visible:outline"
                onClick={() => {
                  signIn("google");
                }}
              >
                <img
                  className="h-6 w-6"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                ></img>
                <span className="text-sm font-semibold leading-6">
                  Continue with Google
                </span>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <button
              onClick={() => router.push("/auth/signup")}
              className="leading-6 text-black underline"
            >
              {" "}
              Join us
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

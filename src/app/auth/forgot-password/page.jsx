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
      await LoginUser(email, password);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (session.status === "loading") {
    return <LoadingComponent />;
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
          <h2 className="font-mono mt-10 text-center text-xl font-semibold leading-9 tracking-tight text-gray-900">
            Verify your email and enter new password.
          </h2>
          <h3 className="text-center leading-5 tracking-tight">
            Enter your email to sign up for this app
          </h3>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <div className="mt-0">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="email@figmafakedomains.net"
                  required
                  autoFocus
                  className="block w-full rounded-md border  px-4 py-1.5 text-gray-950 text-gray-950 shadow-sm ring-1 ring-gray-300 placeholder:text-base focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-2 text-base font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? (
                  <span>PROCESSING...</span>
                ) : (
                  <span>Sign up with email</span>
                )}
              </button>
              <p className="my-2 font-medium text-red-500">{error && error}</p>
            </div>
          </form>
          <div className="mt-5">
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-5">
                <span className="bg-white px-4 font-normal text-gray-500">
                  or continue with
                </span>
              </div>
            </div>
            <div className="mt-6 gap-4 bg-slate-100">
              <div
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-md  px-3 py-1.5 text-gray-600  ring-2 ring-gray-300 hover:bg-gray-100 focus-visible:outline"
                onClick={() => {
                  signIn("google");
                }}
              >
                <img
                  className="h-6 w-6 "
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                ></img>
                <span className="text-sm font-semibold leading-6 ">Google</span>
              </div>
            </div>
            <div>
              <div className="">
                <p className="text-md px-4 py-3 text-center font-light text-gray-500">
                  By clicking continue, you agree to our{" "}
                  <span className="font-medium">Term of Service</span> and
                  <span className="font-medium"> Privacy Policy</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

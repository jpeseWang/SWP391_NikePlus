"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import LoadingComponent from "../../../loading";
import { toast } from "react-hot-toast";

const ResetPasswordPage = ({ params }) => {
    console.log(params.token);
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [verified, setVerified] = useState(false);
    const [user, setUser] = useState(null);
    const { data: session, status: sessionStatus } = useSession();

    console.log(sessionStatus);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const res = await fetch("/api/auth/verify-token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token: params.token,
                    }),
                });

                if (res.status === 400) {
                    setError("Token is not valid or has expired.");
                    setVerified(false);
                    return;
                }

                if (res.status === 200) {
                    setError("");
                    setVerified(true);
                    const userData = await res.json();
                    setUser(userData);
                }
            } catch (error) {
                setError("Error verifying token. Please try again!");
                console.error("Error verifying token:", error);
            } finally {
                setLoading(false);
            }
        };
        verifyToken();
    }, [params.token]);


    const isValidPassword = (password) => {
        const regex =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{}|\\:"';<>?,./-]).{6,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const password = e.target[0].value;

        if (!isValidPassword(password)) {
            toast.error(
                "Password must contain at least six characters, at least one number, both lower and uppercase letters, and special characters."
            );
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password,
                    email: user?.email,
                }),
            });

            if (res.status === 400) {
                setError("Something went wrong, please try again.");
                setLoading(false);
                return;
            }

            if (res.status === 200) {
                setError("");
                toast.success("Password has been successfully changed!");
                router.push("/auth/login");
            }
        } catch (error) {
            setError("Error, please try again!");
            console.error("Error initiating password reset:", error);
        } finally {
            setLoading(false);
        }
    };

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
                        Set your new password.
                    </h2>
                    <h3 className="text-center leading-5 tracking-tight">
                        Enter your new password
                    </h3>
                </div>

                <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="relative">
                            <div className="mt-0">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    placeholder="New Password"
                                    required
                                    autoFocus
                                    className="block w-full rounded-md border  px-4 py-1.5 text-gray-950 text-gray-950 shadow-sm ring-1 ring-gray-300 placeholder:text-base focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                >
                                    {showPassword ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-black px-3 py-2 text-base font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span>PROCESSING...</span>
                                ) : (
                                    <span>Reset Password</span>
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
                                <span className="text-sm font-semibold leading-6 ">
                                    Google
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className="">
                                <p className="text-md px-4 py-3 text-center font-light text-gray-500">
                                    By clicking continue, you agree to our{" "}
                                    <span className="font-medium">Terms of Service</span> and
                                    <span className="font-medium"> Privacy Policy</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResetPasswordPage;

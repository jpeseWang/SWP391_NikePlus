"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import emailjs from "@emailjs/browser";
import LoadingComponent from "../../loading";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const session = useSession();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("email");
        if (storedEmail) {
            setEmail(storedEmail);
        } else {
            setError("No email address found. Please try again.");
        }
    }, []);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleResend = async () => {
        if (!validateEmail(email)) {
            setError("Invalid email address.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/forget-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                }),
            });

            if (res.status === 400) {
                setError("User with this email is not registered!");
                setLoading(false);
                return;
            }

            if (res.status === 200) {
                const { to_email, resetUrl } = await res.json();
                await sendEmail(to_email, resetUrl);
                setError("");
                toast.success("Email sent, please check your email");
            }
        } catch (error) {
            setError("Error, please try again!");
            console.error("Error initiating password reset: ", error);
        } finally {
            setLoading(false);
        }
    };

    const sendEmail = async (toEmail, resetUrl) => {
        try {
            const templateParams = {
                to_email: toEmail,
                reset_url: resetUrl,
            };

            const response = await emailjs.send(
                "service_w7stawa",
                "template_ujykint",
                templateParams,
                "VcQGs4eC_a9lJrzr0"
            );

            console.log("Email sent successfully:", response);
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    if (session.status === "loading") {
        return <LoadingComponent />;
    }

    if (session.status === "authenticated") {
        router?.push("/marketplace");
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
                    <h2 className="font-mono mt-10 text-center text-2xl font-semibold leading-10 tracking-tight text-gray-900">
                        Check your email.
                    </h2>
                    <h3 className="text-center mt-2 leading-6 text-base tracking-tight">
                        Password recovery link has been sent to the email address you provided.
                    </h3>
                    <img
                        alt=""
                        loading="lazy"
                        width={1200}
                        height={427}
                        decoding="async"
                        className="mx-auto h-16 w-auto mt-7"
                        src="/mail.png"
                    ></img>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Didn't get the email? 
                        <button
                            onClick={handleResend}
                            className="leading-6 text-black underline"
                            disabled={loading}
                        >
                            {loading ? "Resending..." : "Send it again"}
                        </button>
                    </p>
                    <p className="mt-2 text-center text-red-500">{error}</p>
                </div>
            </div>
        </>
    );
}

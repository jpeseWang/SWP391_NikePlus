"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ReactCodeInput from 'react-code-input';
import { toast } from "react-hot-toast";
import { CreateUser } from "@/services/userService";
import { mutate } from 'swr';

const VerifyOTPPage = () => {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedOtp = sessionStorage.getItem('otp');
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (otp === storedOtp) {
      try {
        const res = await toast.promise(
          CreateUser(userData),
          {
            loading: 'Verifying...',
            success: <p>Account created successfully!</p>,
            error: <p>Could not save.</p>,
          }
        ).then(response => {
          mutate();
          return response;
        });

        if (res.status === 201) {
          sessionStorage.removeItem('otp');
          sessionStorage.removeItem('userData');
          router.push("/auth/login");
        }

      } catch (err) {
        toast.error("Something went wrong!");
      }
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center font-gothic text-2xl font-extrabold leading-9 tracking-tight text-gray-900">
          Verify Your Email
        </h2>
        <p className="mt-6 px-4 text-center text-sm font-light text-gray-500">
          Enter the 4-digit code we sent to your email.
        </p>
        <form className="mt-6" onSubmit={handleSubmit}>
          <ReactCodeInput
            type="text"
            fields={4}
            value={otp}
            onChange={(value) => setOtp(value)}
            inputStyle={{
              fontFamily: "monospace",
              borderRadius: "4px",
              fontSize: "32px",
              height: "48px",
              width: "48px",
              border: "1px solid lightgray",
              margin: "15px",
            }}
          />
          <button
            type="submit"
            className="mt-6 flex w-full justify-center rounded-sm bg-black px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            VERIFY
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTPPage;

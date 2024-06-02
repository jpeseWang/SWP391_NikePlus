"use client";

import { CountrySelector } from "@/utils/data/country-options";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/16/solid";
import { classNames } from "@/utils/classNames";
import LoadingComponent from "../../loading";
import { useSession } from "next-auth/react";

const mailingLists = [
  {
    id: 1,
    title: "Male",
  },
  {
    id: 2,
    title: "Female",
  },
];

const SignupPage = () => {
  const [selectedMailingLists, setSelectedMailingLists] = useState(
    mailingLists[0],
  );
  const [inputType, setInputType] = useState("");
  const [err, setErr] = useState(false);
  const router = useRouter();
  const session = useSession();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[2].value;
    const email = e.target[0].value;
    const password = e.target[1].value;
    const role = "user";

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });
      toast.success("Create account successfully!");
      res.status = 201 && router.push("/auth/login");
    } catch (err) {
      setErr(true);
    }
  };

  if (session.status === "loading") {
    return <LoadingComponent></LoadingComponent>;
  }

  if (session.status === "authenticated") {
    router?.push("/marketplace");
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-8 w-auto" src="/nike.webp" alt=""></img>
          <h2 className="mt-10 text-center font-gothic text-2xl font-extrabold leading-9 tracking-tight text-gray-900">
            BECOME A NIKE MEMBER
          </h2>
          <p className="mt-6 px-4 text-center text-sm font-light text-gray-500">
            Create your Nike Member profile and get first access to the very
            best of Nike products, inspiration and community.
          </p>
          <form className="items-center space-y-4" onSubmit={handleSubmit}>
            <div className="mx-auto my-2 w-9/12">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                required
                className="my-4 block w-full items-center rounded border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></input>{" "}
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                required
                className="my-4 block w-full rounded border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></input>
              <input
                type="text"
                autoComplete="current-password"
                placeholder="First Name"
                required
                className="my-4 block w-full rounded border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></input>
              <input
                type="text"
                autoComplete="current-password"
                placeholder="Last Name"
                required
                className="my-4 block w-full rounded border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></input>
              <input
                type={inputType}
                onFocus={() => setInputType("date")}
                onBlur={() => setInputType("text")}
                autoComplete="current-password"
                placeholder="Date of Birth"
                required
                className="my-4 block w-full rounded border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></input>
              <p className="-mt-2 px-2 text-xs font-light text-gray-500">
                Get a Nike Member Reward every year on your Birthday.
              </p>
              <CountrySelector></CountrySelector>
              <div className="mb-4">
                <RadioGroup
                  value={selectedMailingLists}
                  onChange={setSelectedMailingLists}
                >
                  <div className="grid w-full grid-cols-1  gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    {mailingLists.map((mailingList) => (
                      <RadioGroup.Option
                        key={mailingList.id}
                        value={mailingList}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "border-gray-600 ring-1 ring-gray-600"
                              : "border-gray-300",
                            "foucs:outline-none relative flex cursor-pointer rounded border bg-white px-4 py-1.5 shadow-sm",
                          )
                        }
                      >
                        {({ checked, active }) => (
                          <>
                            <span className="flex flex-1"></span>
                            <CheckCircleIcon
                              className={classNames(
                                !checked ? "invisible" : "",
                                "h-5 w-5 text-gray-600",
                              )}
                              aria-hidden="true"
                            ></CheckCircleIcon>
                            <span className="flex">
                              <RadioGroup.Label
                                as="span"
                                className="block pr-6 text-sm font-medium text-gray-800"
                              >
                                {mailingList.title}
                              </RadioGroup.Label>
                            </span>
                            <span
                              className={classNames(
                                active ? "border" : "border-1",
                                checked
                                  ? "border-gray-600"
                                  : "border-transparent",
                                "pointer-events-none absolute -inset-px rounded",
                              )}
                              aria-hidden="true"
                            ></span>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="rounder h-10 w-10 border-gray-200 text-indigo-600 focus:ring-indigo-600"
                ></input>
                <label
                  htmlFor="remember-me"
                  className="mx-2 text-xs font-light leading-6 text-gray-500"
                >
                  Sign up for emails to get updates from Nike on products,
                  offers and Member benefits.
                </label>
              </div>
            </div>
            <div>
              <div>
                <p className="text-md px-4 py-3 text-center font-light text-gray-500">
                  By creating an account, you agree to Nike&apos;s{" "}
                  <span className="underline">Privacy Policy</span> and
                  <span className="underline"> Terms of Use</span>.
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-sm bg-black px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                JOIN US
              </button>
            </div>
          </form>
          {err && "Something went wrong!"}

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a Member?{" "}
            <a href="/auth/login" className="undeline leading-6 text-black">
              Sign in.
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupPage;

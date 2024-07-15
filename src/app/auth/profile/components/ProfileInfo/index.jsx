"use client";
import { useState } from "react";
import { Field, Label, Switch } from "@headlessui/react";
import { Bars3BottomLeftIcon, BellIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import { GetUserById, UpdateUser } from "@/services/userService";
import LoadingComponent from "@/app/loading";
import { mutate } from "swr";
import { CountrySelector } from '@/utils/data/country-options';

const tabs = [
  { name: "General", href: "#", current: true },
  { name: "Password", href: "/auth/change-password", current: false },
  { name: "Notifications", href: "#", current: false },
  { name: "Plan", href: "#", current: false },
  { name: "Billing", href: "#", current: false },
  { name: "Team Members", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfileInfo() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] =
    useState(true);
  const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] =
    useState(false);

  const { data: session, status } = useSession();
  const userId = session?.data?.id;

  if (status === 'loading') {
    return <LoadingComponent />;
  }

  if (!session) {
    return <p>You need to be authenticated to view this page.</p>;
  }
  
  const { userData, isLoading, isError } = GetUserById(userId);

  const [editName, setEditName] = useState(userData?.name || "");
  const [editEmail, setEditEmail] = useState(userData?.email || "");
  const [editGender, setEditGender] = useState(userData?.gender || "");
  const [editCountry, setEditCountry] = useState(userData?.country || "");
  const [editDob, setEditDob] = useState(userData?.dob || "");
  const [editPhoto, setEditPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(userData?.avatarImg || "");


  console.log(userData);

  const handleUpdate = async (field, value) => {
    try {
      console.log("Updating user:", userId, field, value);
      const response = await UpdateUser(userId, { [field]: value });
      if (response.ok) {
        mutate(`/api/user/${userId}`);
        console.log("User updated successfully:", response.data);
      } else {
        console.error("Failed to update user:", response.data || response.error);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCountryChange = (e) => {
    setEditCountry(e.target.value);
  };

  const handleGenderChange = (e) => {
    setEditGender(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setEditPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleUpdatePhoto = async () => {
    if (editPhoto) {
      const formData = new FormData();
      formData.append("file", editPhoto);
      formData.append("upload_preset", "blogscover");

      try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dfdkflzjs/image/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        const photoUrl = data.secure_url;
        await handleUpdate("avatarImg", photoUrl);
        setEditPhoto(null);
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div>
          {/* Content area */}
          <div className="lg:px-4">
            <div className="">
              <div className="mx-auto flex flex-col lg:max-w-6xl">
                <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white">
                  <button
                    type="button"
                    className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <span className="sr-only">Open sidebar</span>
                    <Bars3BottomLeftIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </button>
                  <div className="flex flex-1 justify-between px-4 lg:px-0">
                    <div className="flex flex-1">
                      <form
                        className="flex w-full lg:ml-0"
                        action="#"
                        method="GET"
                      >
                        <label
                          htmlFor="mobile-search-field"
                          className="sr-only"
                        >
                          Search
                        </label>
                        <label
                          htmlFor="desktop-search-field"
                          className="sr-only"
                        >
                          Search
                        </label>
                        <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                            <MagnifyingGlassIcon
                              className="h-5 w-5 flex-shrink-0"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            name="mobile-search-field"
                            id="mobile-search-field"
                            className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 focus:border-transparent focus:outline-none focus:ring-0 focus:placeholder:text-gray-400 sm:hidden"
                            placeholder="Search"
                            type="search"
                          />
                          <input
                            name="desktop-search-field"
                            id="desktop-search-field"
                            className="hidden h-full w-full border-transparent py-2 pl-8 pr-3 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-0 focus:placeholder:text-gray-400 sm:block"
                            placeholder="Search jobs, applicants, and more"
                            type="search"
                          />
                        </div>
                      </form>
                    </div>
                    <div className="ml-4 flex items-center lg:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full bg-white p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      >
                        <span className="absolute -inset-1.5" />
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                        <span className="sr-only">View notifications</span>
                      </button>
                    </div>
                  </div>
                </div>

                <main className="flex-1">
                  <div className="relative mx-auto max-w-5xl">
                    <div className="pb-16 pt-10">
                      <div className="px-4 sm:px-6 lg:px-0">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                          Settings
                        </h1>
                      </div>
                      <div className="px-4 sm:px-6 lg:px-0">
                        <div className="py-6">
                          {/* Tabs */}
                          <div className="lg:hidden">
                            <label htmlFor="selected-tab" className="sr-only">
                              Select a tab
                            </label>
                            <select
                              id="selected-tab"
                              name="selected-tab"
                              className="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6"
                              defaultValue={
                                tabs.find((tab) => tab.current).name
                              }
                            >
                              {tabs.map((tab) => (
                                <option key={tab.name}>{tab.name}</option>
                              ))}
                            </select>
                          </div>
                          <div className="hidden lg:block">
                            <div className="border-b border-gray-200">
                              <nav className="-mb-px flex space-x-8">
                                {tabs.map((tab) => (
                                  <a
                                    key={tab.name}
                                    href={tab.href}
                                    className={classNames(
                                      tab.current
                                        ? "border-purple-500 text-purple-600"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                      "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium",
                                    )}
                                  >
                                    {tab.name}
                                  </a>
                                ))}
                              </nav>
                            </div>
                          </div>

                          {/* Description list with inline editing */}
                          <div className="mt-10 divide-y divide-gray-200">
                            <div className="space-y-1">
                              <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Profile
                              </h3>
                              <p className="max-w-2xl text-sm text-gray-500">
                                This information will be displayed publicly so
                                be careful what you share.
                              </p>
                            </div>
                            <div className="mt-6">
                              <dl className="divide-y divide-gray-200">
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    Name
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <input
                                      type="text"
                                      value={editName}
                                      placeholder={userData.name}
                                      onChange={(e) => setEditName(e.target.value)}
                                      
                                    />
                                    <span className="ml-12 flex-shrink-0">
                                      <button
                                        type="button"
                                        onClick={() => handleUpdate("name", editName)}
                                        className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                      >
                                        Update
                                      </button>
                                    </span>
                                  </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    Photo
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">
                                      <img
                                        className="h-8 w-8 rounded-full"
                                        src={photoPreview || userData.avatarImg}
                                        alt=""
                                      />
                                    </span>
                                    <span className="ml-4 flex flex-shrink-0 items-start space-x-4">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                      />
                                      <button
                                        type="button"
                                        className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                        onClick={handleUpdatePhoto}
                                      >
                                        Update
                                      </button>
                                    </span>
                                  </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    Email
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <input
                                      type="text"
                                      value={editEmail}
                                      placeholder={userData.email}
                                      onChange={(e) => setEditEmail(e.target.value)}
                                    />
                                    <span className="ml-12 flex-shrink-0">
                                      <button
                                        type="button"
                                        onClick={() => handleUpdate("email", editEmail)}
                                        className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                      >
                                        Update
                                      </button>
                                    </span>
                                  </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    Gender
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <select
                                      id="gender"
                                      name="gender"
                                      value={editGender}
                                      onChange={handleGenderChange}
                                      placeholder={userData.gender}
                                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-2"
                                    >
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                    </select>
                                    <span className="ml-12 flex-shrink-0">
                                      <button
                                        type="button"
                                        onClick={() => handleUpdate("gender", editGender)}
                                        className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                      >
                                        Update
                                      </button>
                                    </span>
                                  </dd>
                                </div>
                              </dl>
                            </div>
                          </div>

                          <div className="mt-10 divide-y divide-gray-200">
                            <div className="space-y-1">
                              <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Account
                              </h3>
                              <p className="max-w-2xl text-sm text-gray-500">
                                Manage how information is displayed on your
                                account.
                              </p>
                            </div>
                            <div className="mt-6">
                              <dl className="divide-y divide-gray-200">
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    Country
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <CountrySelector
                                      value={userData.country}
                                      onChange={handleCountryChange}
                                    />
                                    <span className="ml-12 flex-shrink-0">
                                      <button
                                        type="button"
                                        onClick={() => handleUpdate("country", editCountry)}
                                        className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                      >
                                        Update
                                      </button>
                                    </span>
                                  </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    Birthday
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <input
                                      type="text"
                                      value={editDob}
                                      placeholder={userData.dob}
                                      onChange={(e) => setEditDob(e.target.value)}
                                    />
                                    <span className="ml-12 flex flex-shrink-0 items-start space-x-4">
                                      <button
                                        type="button"
                                        onClick={() => handleUpdate("dob", editDob)}
                                        className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                      >
                                        Update
                                      </button>
                                    </span>
                                  </dd>
                                </div>
                                <Field
                                  as="div"
                                  className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5"
                                >
                                  <Label
                                    as="dt"
                                    className="text-sm font-medium text-gray-500"
                                    passive
                                  >
                                    Automatic timezone
                                  </Label>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <Switch
                                      checked={automaticTimezoneEnabled}
                                      onChange={setAutomaticTimezoneEnabled}
                                      className={classNames(
                                        automaticTimezoneEnabled
                                          ? "bg-purple-600"
                                          : "bg-gray-200",
                                        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-auto",
                                      )}
                                    >
                                      <span
                                        aria-hidden="true"
                                        className={classNames(
                                          automaticTimezoneEnabled
                                            ? "translate-x-5"
                                            : "translate-x-0",
                                          "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                                        )}
                                      />
                                    </Switch>
                                  </dd>
                                </Field>
                                <Field
                                  as="div"
                                  className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5"
                                >
                                  <Label
                                    as="dt"
                                    className="text-sm font-medium text-gray-500"
                                    passive
                                  >
                                    Auto-update applicant data
                                  </Label>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <Switch
                                      checked={autoUpdateApplicantDataEnabled}
                                      onChange={
                                        setAutoUpdateApplicantDataEnabled
                                      }
                                      className={classNames(
                                        autoUpdateApplicantDataEnabled
                                          ? "bg-purple-600"
                                          : "bg-gray-200",
                                        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-auto",
                                      )}
                                    >
                                      <span
                                        aria-hidden="true"
                                        className={classNames(
                                          autoUpdateApplicantDataEnabled
                                            ? "translate-x-5"
                                            : "translate-x-0",
                                          "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                                        )}
                                      />
                                    </Switch>
                                  </dd>
                                </Field>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
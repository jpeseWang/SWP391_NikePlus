"use client";
import { useState } from "react";
import { PhotoIcon, UserCircleIcon, PlusIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { CreateProduct } from "@/services/productService";
import toast from "react-hot-toast";
import LoadingComponent from "@/app/loading";

export default function AddProduct() {
  const [specs, setSpecs] = useState([
    { colorId: "", title: "", imgList: [""] },
  ]);
  const [uploading, setUploading] = useState(false);

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...specs];
    if (field === "imgList") {
      newSpecs[index][field] = value;
    } else {
      newSpecs[index][field] = value;
    }
    setSpecs(newSpecs);
  };

  const handleAddSpec = () => {
    setSpecs([...specs, { colorId: "", title: "", imgList: [""] }]);
  };

  const handleRemoveSpec = (index) => {
    if (specs.length > 1) {
      const newSpecs = [...specs];
      newSpecs.splice(index, 1);
      setSpecs(newSpecs);
    } else {
      console.warn("Cannot remove the last spec.");
    }
  };

  const handleAddImage = (index) => {
    const newSpecs = [...specs];
    newSpecs[index].imgList.push("");
    setSpecs(newSpecs);
  };

  const handleRemoveImage = (specIndex, imgIndex) => {
    const newSpecs = [...specs];
    newSpecs[specIndex].imgList.splice(imgIndex, 1);
    setSpecs(newSpecs);
  };

  const handleImageChange = (specIndex, imgIndex, value) => {
    const newSpecs = [...specs];
    newSpecs[specIndex].imgList[imgIndex] = value;
    setSpecs(newSpecs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const type = e.target[0].value;
    const name = e.target[1].value;
    const description = e.target[2].value;
    const price = e.target[3].value;
    const quantity = e.target[4].value;
    setUploading(true);

    try {
      const result = await CreateProduct({
        type,
        name,
        description,
        price,
        quantity,
        specs,
      });
      console.log("Product created data >>", result);

      setUploading(false);
      e.target.reset();
      setSpecs([]);
      toast.success("Create product successfully!");
    } catch (err) {
      console.error("Error creating product:", err);
      setUploading(false);
      toast.error("Something went wrong: " + err.message);
    }
  };

  return (
    <div className="my-9 h-screen">
      {uploading ? (
        <LoadingComponent />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Add new Product
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Category
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Men&apos;s Shoes</option>
                      <option>Women&apos;s Shoes</option>
                      <option>Kids&apos;s Shoes</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Ex: Air Jordan"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about yourself.
                  </p>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price (million ₫)
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="price"
                      id="price"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Quantity
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon
                    className="h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Change
                  </button>
                </div>
              </div> */}

                {/* <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div> */}
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Specs Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-4">
                  <div className="multi-spec-container">
                    {specs.map((spec, index) => (
                      <div key={index} className="spec-group mt-12">
                        <label
                          htmlFor="street-address"
                          className="block font-medium leading-6 text-gray-900"
                        >
                          Product variant {index + 1}
                        </label>

                        <div className="mt-2">
                          <input
                            type="text"
                            value={spec.colorId}
                            onChange={(event) =>
                              handleSpecChange(
                                index,
                                "colorId",
                                event.target.value,
                              )
                            }
                            placeholder="Color ID"
                            className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          <input
                            type="text"
                            value={spec.title}
                            onChange={(event) =>
                              handleSpecChange(
                                index,
                                "title",
                                event.target.value,
                              )
                            }
                            placeholder="Title"
                            className="mt-2 block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          <div className="mt-2">
                            {spec.imgList.map((imgUrl, imgIndex) => (
                              <div
                                key={imgIndex}
                                className="img-list-item flex items-center"
                              >
                                <input
                                  type="text"
                                  value={imgUrl}
                                  onChange={(event) =>
                                    handleImageChange(
                                      index,
                                      imgIndex,
                                      event.target.value,
                                    )
                                  }
                                  placeholder={`Image URL ${imgIndex + 1}`}
                                  className="mb-2 block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder-shown:italic focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />

                                <button
                                  type="button"
                                  className="remove-btn ml-2 rounded-md bg-gray-200 px-2 py-1 text-red-500 hover:bg-gray-300"
                                  onClick={() =>
                                    handleRemoveImage(index, imgIndex)
                                  }
                                >
                                  <TrashIcon className="h-6 w-6" />
                                </button>
                              </div>
                            ))}

                            <div className="flex justify-center">
                              <button
                                onClick={() => handleAddImage(index)}
                                type="button"
                                className="my-4 rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                <PlusIcon
                                  className="h-5 w-5 "
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>

                        {specs.length > 1 && index !== 0 && (
                          <button
                            type="button"
                            className="remove-spec-btn mt-2 rounded-md bg-red-200 px-2 py-1 text-red-500 hover:bg-red-300"
                            onClick={() => handleRemoveSpec(index)}
                          >
                            Remove Variant {index + 1}
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="add-spec-btn mt-4 cursor-pointer rounded-md bg-green-200 px-2 py-1 text-green-500 hover:bg-green-300"
                      onClick={handleAddSpec}
                    >
                      Add Variant
                    </button>
                  </div>

                  <br></br>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

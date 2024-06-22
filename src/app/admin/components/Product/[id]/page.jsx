"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PhotoIcon, UserCircleIcon, PlusIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import LoadingComponent from "@/app/loading";
import { GetProductById, UpdateProduct } from "@/services/productService";
import { productsCategories } from "@/utils/data/products-types";
<<<<<<< HEAD
=======
import Link from "next/link";
>>>>>>> 7da93aec6914625fae18d09e55a916c11467f1b9


export default function AdminUpdateProduct({ params }) {

<<<<<<< HEAD

  const { productData, isLoading, isError } = GetProductById(params.id);
  const [newProductData, setNewProductData] = useState(productData)
  const [specs, setSpecs] = useState(productData?.specs);

=======
  const { productData, isLoading, isError } = GetProductById(params.id);
  const [uploading, setUploading] = useState(false);

  const [newProductData, setNewProductData] = useState(productData)
  const [specs, setSpecs] = useState(productData?.specs);

  const [selectedCategory, setSelectedCategory] = useState(newProductData?.category);
  const [subcategories, setSubcategories] = useState([]);

>>>>>>> 7da93aec6914625fae18d09e55a916c11467f1b9
  useEffect(() => {
    setNewProductData(productData);
    setSpecs(productData?.specs)

  }, [productData])

<<<<<<< HEAD

  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(newProductData?.category);
  const [subcategories, setSubcategories] = useState([]);


  const handleCategoryChange = (event) => {
    const categoryName = event.target.value;
=======
  // useEffect to set initial subcategories based on newProductData's category
  useEffect(() => {
    if (newProductData?.category) {
      const initialCategory = productsCategories.find(cat => cat.name.toString() === newProductData.category);
      setSubcategories(initialCategory ? initialCategory.subcategory : []);
    }
  }, [newProductData, productsCategories]);


  const handleCategoryChange = (event) => {
    const categoryName = event.target.value || newProductData?.category;
>>>>>>> 7da93aec6914625fae18d09e55a916c11467f1b9
    onValueChange("category", categoryName)
    setSelectedCategory(categoryName);
    const category = productsCategories.find(cat => cat.name.toString() === categoryName);
    setSubcategories(category ? category.subcategory : []);
<<<<<<< HEAD

=======
>>>>>>> 7da93aec6914625fae18d09e55a916c11467f1b9
  };

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
    setSpecs([...specs, { colorId: "", title: "", quantity: "", imgList: [""] }]);
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
    newSpecs[specIndex]?.imgList.splice(imgIndex, 1);
    setSpecs(newSpecs);
  };

  const handleImageChange = (specIndex, imgIndex, value) => {
    const newSpecs = [...specs];
    newSpecs[specIndex].imgList[imgIndex] = value;
    setSpecs(newSpecs);
  };

  const onValueChange = (type, value) => {
    let obj = newProductData
    switch (type) {
      case "SKU":
        {
          obj.SKU = value
        }
        break;
      case "name":
        {
          obj.name = value
        }
        break;
      case "price":
        {
          obj.price = value
        }
        break;
      case "category":
        {
          obj.category = value
        }
        break;
      case "subCategory":
        {
          obj.subCategory = value
        }
        break;
      case "description":
        {
          obj.description = value
        }
        break;
      case "specs":
        {
          obj.specs = value
        }
        break;
    }
    setNewProductData({ ...obj })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateProductData = {
      _id: productData._id,
      category: e.target[0].value,
      subCategory: e.target[1].value,
      SKU: e.target[2].value,
      name: e.target[3].value,
      price: e.target[4].value,
<<<<<<< HEAD
      description: e.target[5].value
    }

=======
      description: e.target[5].value,
      specs: newProductData?.specs

    }
    console.log(updateProductData)
>>>>>>> 7da93aec6914625fae18d09e55a916c11467f1b9
    setUploading(true);

    try {
      await UpdateProduct(updateProductData);
      setUploading(false);
      e.target.reset();
      setSpecs([]);
      toast.success("Update product successfully!");
      // router.push("/admin/page?title=Product%20Management&section=ListAllProducts")
    } catch (err) {
      console.error("Error creating product:", err);
      setUploading(false);
      toast.error("Something went wrong: " + err.message);
    }
  };
<<<<<<< HEAD
  console.log("productData >", productData);
  console.log("newProductData >", newProductData);
=======

>>>>>>> 7da93aec6914625fae18d09e55a916c11467f1b9


  return (
    <div className="my-9 h-screen mx-12">
      {isLoading ? (
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
                    htmlFor="Category"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Category
                  </label>
                  <div className="mt-2">
                    <select
                      name="Category"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
<<<<<<< HEAD
                      value={selectedCategory}
=======
                      defaultValue={selectedCategory}
>>>>>>> 7da93aec6914625fae18d09e55a916c11467f1b9
                      onChange={handleCategoryChange}

                    >
                      <option value="">Select a category</option>
                      {productsCategories.map(category => (
                        <option key={category.id} value={category.name} selected={productData.category == category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="Sub Category"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
<<<<<<< HEAD
                    Sub Category
=======
                    Sub Category: {newProductData?.subCategory}
>>>>>>> 7da93aec6914625fae18d09e55a916c11467f1b9
                  </label>
                  <div className="mt-2">
                    <select
                      onChange={(e) => { onValueChange("subCategory", e.target.value) }}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
<<<<<<< HEAD
                    >
                      <option value="">Select a subcategory</option>
=======
                      value={newProductData?.subCategory}
                    >
>>>>>>> 7da93aec6914625fae18d09e55a916c11467f1b9
                      {subcategories.map((subcategory, index) => (
                        <option key={index} value={subcategory}>
                          {subcategory}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="SKU"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    SKU (Stock-Keeping Unit)
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        value={newProductData?.SKU}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Ex: FQ3224-100"
                        onChange={(e) => { onValueChange("SKU", e.target.value) }}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
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
                        value={newProductData?.name}
                        onChange={(e) => { onValueChange("name", e.target.value) }}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Ex: Air Jordan 1 Mid SE Craft"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="Price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price (million ₫)
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={newProductData?.price}
                      onChange={(e) => { onValueChange("price", e.target.value) }}
                      placeholder="Ex: 2500"
                      className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
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
                      defaultValue={newProductData?.description}
                      onChange={(e) => { onValueChange("description", e.target.value) }}
                      rows={3}
                      className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about yourself.
                  </p>
                </div>


              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Specs Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Customize different colours for your product.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-4">
                  <div className="multi-spec-container">
                    {newProductData?.specs?.map((spec, index) => (
                      <div key={index} className="spec-group mt-12">
                        <label
                          htmlFor="Product variant"
                          className="block font-medium text-lg leading-6 text-gray-900"
                        >
                          Product variant {index + 1}
                        </label>

                        <div className="my-4">
                          <div className="my-4">
                            <label className="mb-2 block text-sm font-medium leading-6 text-gray-900">
                              Color Code
                            </label>
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
                              placeholder="Ex: DZ4475-103"
                              className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-sm font-medium leading-6 text-gray-900">
                              Color Shown
                            </label>
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
                              placeholder="Ex: White/Neutral Grey/Industrial Blue"
                              className="mt-2 block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>

                          <div className="my-4">
                            <label className="mb-2 block text-sm font-medium leading-6 text-gray-900">
                              Quantity
                            </label>
                            <input
                              type="number"
                              value={spec.quantity}
                              onChange={(event) =>
                                handleSpecChange(
                                  index,
                                  "quantity",
                                  event.target.value,
                                )
                              }
                              placeholder="Number of existing products. Ex: 105"
                              className="mt-2 block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>

                          <div className="mt-4">
                            <label className="mb-2 block text-sm font-medium leading-6 text-gray-900">
                              Images URL
                            </label>
                            {spec.imgList.map((imgUrl, imgIndex) => (
                              <div
                                key={imgIndex}
                                className="img-list-item flex items-center"
                              >
                                <img
                                  src={imgUrl}
                                  alt=""
                                  className="h-[125px] w-[125px] object-cover object-center sm:rounded-lg my-4 mr-2"
                                />
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
                                  placeholder={`Product image URL ${imgIndex + 1}`}
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

                        {newProductData?.specs?.length > 1 && index !== 0 && (
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
<<<<<<< HEAD
              Cancel
=======
              <Link href="/admin/page?title=Product%20Management&section=ListAllProducts">
                Cancel
              </Link>
>>>>>>> 7da93aec6914625fae18d09e55a916c11467f1b9
            </button>
            <button
              type="submit"
              className="cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

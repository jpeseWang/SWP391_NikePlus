"use client";
import React, { useState } from "react";

export default function UserManagement() {
  const [specs, setSpecs] = useState([]); // Array to store spec objects

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...specs]; // Create a copy to avoid mutation
    if (field === "imgList") {
      // If the imgList is being updated, value will be an array
      newSpecs[index][field] = value;
    } else {
      newSpecs[index][field] = value; // Update other fields
    }
    setSpecs(newSpecs);
  };

  const handleAddSpec = () => {
    setSpecs([...specs, { colorId: "", title: "", imgList: [""] }]); // Add a new spec object
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
    newSpecs[index].imgList.push(""); // Add an empty string for new image URL
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

  const handleGetSpecs = () => {
    const allSpecs = [...specs];
    console.log("All specs:", allSpecs);
  };

  return (
    <div className="multi-spec-container">
      {specs.map((spec, index) => (
        <div key={index} className="spec-group">
          <div className="mt-2">
            <input
              type="text"
              value={spec.colorId}
              onChange={(event) =>
                handleSpecChange(index, "colorId", event.target.value)
              }
              placeholder="Color ID"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <input
              type="text"
              value={spec.title}
              onChange={(event) =>
                handleSpecChange(index, "title", event.target.value)
              }
              placeholder="Title"
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div className="mt-2">
              {spec.imgList.map((imgUrl, imgIndex) => (
                <div key={imgIndex} className="img-list-item flex items-center">
                  <input
                    type="text"
                    value={imgUrl}
                    onChange={(event) =>
                      handleImageChange(index, imgIndex, event.target.value)
                    }
                    placeholder={`Image URL ${imgIndex + 1}`}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <button
                    className="remove-img-btn ml-2 rounded-md bg-gray-200 px-2 py-1 text-red-500 hover:bg-gray-300"
                    onClick={() => handleRemoveImage(index, imgIndex)}
                  >
                    Remove Image
                  </button>
                </div>
              ))}
              <button
                className="add-img-btn mt-2 rounded-md bg-gray-200 px-2 py-1 text-blue-500 hover:bg-gray-300"
                onClick={() => handleAddImage(index)}
              >
                Add Image
              </button>
            </div>
          </div>
          <button
            className="remove-spec-btn mt-2 rounded-md bg-red-200 px-2 py-1 text-red-500 hover:bg-red-300"
            onClick={() => handleRemoveSpec(index)}
          >
            Remove Spec
          </button>
        </div>
      ))}
      <button
        className="add-spec-btn mt-4 rounded-md bg-green-200 px-2 py-1 text-green-500 hover:bg-green-300"
        onClick={handleAddSpec}
      >
        Add Spec
      </button>
      <button
        className="get-specs-btn mt-4 rounded-md bg-blue-200 px-2 py-1 text-blue-500 hover:bg-blue-300"
        onClick={handleGetSpecs}
      >
        Get Specs
      </button>
    </div>
  );
}

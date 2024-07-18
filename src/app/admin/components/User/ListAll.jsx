import { DeleteUser, GetAllUser, UpdateUser } from "@/services/userService";
import CommonUtil from "@/common/commonUtils";
import Link from "next/link";
import LoadingComponent from "@/app/loading";
import toast from "react-hot-toast";
import { useState } from "react";
import { Button } from "@headlessui/react";

export default function UserManagement() {
  const { userData, isLoading, isError, mutate } = GetAllUser();
  const [editRoles, setEditRoles] = useState({});

  const handleUpdate = async (userId) => {
    try {
      const role = editRoles[userId];
      const response = await UpdateUser(userId, { role });
  
      if (response.ok) {
        mutate();
        toast.success("User updated successfully!");
      } else {
        console.error("Failed to update user:", response.data || response.error);
        toast.error("Failed to update user: " + (response.data?.message || response.error.message));
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user: " + error.message);
    }
  };
  

  const handleRoleChange = (userId, value) => {
    setEditRoles((prevRoles) => ({
      ...prevRoles,
      [userId]: value,
    }));
  };

  const handleDeleteUser = async (id) => {
    try {
      await DeleteUser(id);
      toast('Deleted task!', {
        icon: '🗑️',
      });
      mutate();
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="sm:px-2 lg:px-4">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Users
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {isLoading ? (
              <LoadingComponent />
            ) : (
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 w-26"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Gender
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date of birth
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Join Day
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                  {userData?.map((user, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div className="h-11 w-11 flex-shrink-0">
                            <img
                              className="h-11 w-11 rounded"
                              src={user.avatarImg}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {user.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <div className="text-gray-900">{user.gender}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <div className="text-gray-900">{user.dob}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {CommonUtil.parseTimestamp(user.createdAt)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <select
                          id="role"
                          name="role"
                          value={editRoles[user._id] || user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          className="block w-full rounded-md border-gray-300 px-2 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                        </select>
                      </td>
                      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <Button
                        onClick={() => handleUpdate(user._id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </Button>
                      </td>
                      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={() => { handleDeleteUser(user._id) }}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

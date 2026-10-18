import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Users = () => {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")

    const getAllUsers = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/v1/user/get-all-users", {
                withCredentials: true
            })
            // console.log(data)
            setUsers(data.user)
        } catch (error) {
            toast.error("Something went wrong")
        }

    }

    useEffect(() => {
        getAllUsers()
    }, [])

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:8000/api/v1/user/delete-user/${id}`, {
                withCredentials: true
            })

            toast.success("User deleted successfully")

            setUsers((prev) => prev.filter((user) => user._id !== id))
        } catch (error) {
            toast.error("Failed to delete user")
        }
    }

    const filteredUsers = users.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase())
    })

    return (
        <>
            <div>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Users
                    </h1>

                    <p className="text-slate-500 mt-1">
                        Manage registered users.
                    </p>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                    <div className="p-5 border-b border-slate-200">

                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full sm:w-80 px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full text-left">

                            <thead className="bg-slate-50">

                                <tr>

                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                        User
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                        Email
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                        Role
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                        Age
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                        Phone
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-slate-100">

                                {filteredUsers.map((user) => (

                                    <tr
                                        key={user._id}
                                        className="hover:bg-slate-50"
                                    >

                                        <td className="px-6 py-4">

                                            <div className="flex items-center gap-3 min-w-[180px]">

                                                <img
                                                    src={user.profileImage}
                                                    alt={user.name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />

                                                <span className="font-medium text-slate-900">
                                                    {user.name}
                                                </span>

                                            </div>

                                        </td>

                                        <td className="px-6 py-4 text-slate-500">
                                            {user.email}
                                        </td>

                                        <td className="px-6 py-4">

                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === "admin"
                                                    ? "bg-indigo-100 text-indigo-600"
                                                    : "bg-slate-100 text-slate-600"
                                                    }`}
                                            >
                                                {user.role}
                                            </span>

                                        </td>

                                        <td className="px-6 py-4 text-slate-500">
                                            {user.age}
                                        </td>

                                        <td className="px-6 py-4 text-slate-500">
                                            {user.phone}
                                        </td>

                                        <td className="px-6 py-4">

                                            <button onClick={() => handleDelete(user._id)} className="px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </>
    );
};

export default Users;
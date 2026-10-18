import axios from "axios";
import { useState } from "react";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    const { token } = useParams()
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await axios.post(`/api/v1/user/reset-password/${token}`, form, {
                withCredentials: true
            })
            toast.success("Password reset successfully")
            navigate("/login")
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    return (
        <>
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2">

                    {/* Left Side */}
                    <div className="hidden lg:flex bg-slate-900 text-white p-12 flex-col justify-center">
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-xl font-bold">
                                    S
                                </div>

                                <div>
                                    <h1 className="text-xl font-bold">
                                        ShopEase
                                    </h1>

                                    <p className="text-xs text-slate-400">
                                        SHOP SMART
                                    </p>
                                </div>
                            </div>

                            <h2 className="text-4xl font-bold leading-tight mb-5">
                                Create a new password.
                            </h2>

                            <p className="text-slate-400 leading-relaxed">
                                Choose a strong new password for your ShopEase
                                account and get back to shopping.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                                    ✓
                                </div>

                                <span className="text-slate-300">
                                    Create a secure password
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                                    ✓
                                </div>

                                <span className="text-slate-300">
                                    Confirm your new password
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                                    ✓
                                </div>

                                <span className="text-slate-300">
                                    Continue securely to your account
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-900">
                                Reset Password
                            </h2>

                            <p className="text-slate-500 mt-2 leading-relaxed">
                                Enter and confirm your new password below.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* New Password */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    New Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter new password"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                />

                                <p className="text-xs text-slate-400 mt-2">
                                    Password must be at least 6 characters.
                                </p>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your new password"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition shadow-lg shadow-blue-600/20"
                            >
                                Reset Password
                            </button>

                        </form>

                        {/* Login */}
                        <p className="text-center text-sm text-slate-500 mt-7">
                            Remember your password?{" "}
                            <Link
                                to="/login"
                                className="text-blue-600 font-semibold hover:text-blue-700"
                            >
                                Login
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
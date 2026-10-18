import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post("http://localhost:8000/api/v1/user/login-user", form, {
                withCredentials: true
            })

            localStorage.setItem("user", JSON.stringify(data.user))
            toast.success("Login successful")

            if (data.user.role === "admin") {
                navigate("/admin")
            } else {
                navigate("/")
            }
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
                                    <h1 className="text-xl font-bold">ShopEase</h1>
                                    <p className="text-xs text-slate-400">SHOP SMART</p>
                                </div>
                            </div>

                            <h2 className="text-4xl font-bold leading-tight mb-5">
                                Welcome back to ShopEase.
                            </h2>

                            <p className="text-slate-400 leading-relaxed">
                                Login to your account and continue exploring products you'll
                                love.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                                    ✓
                                </div>
                                <span className="text-slate-300">
                                    Access your personal account
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                                    ✓
                                </div>
                                <span className="text-slate-300">
                                    Explore our latest products
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                                    ✓
                                </div>
                                <span className="text-slate-300">
                                    Manage your profile easily
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-900">
                                Welcome back
                            </h2>

                            <p className="text-slate-500 mt-2">
                                Login to your ShopEase account.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-slate-700">
                                        Password
                                    </label>

                                    <Link
                                        to="/forgot-password-request"
                                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                />
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="w-4 h-4 accent-blue-600"
                                />

                                <label
                                    htmlFor="remember"
                                    className="text-sm text-slate-600 cursor-pointer"
                                >
                                    Remember me
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition shadow-lg shadow-blue-600/20"
                            >
                                Login
                            </button>
                        </form>

                        {/* Register Link */}
                        <p className="text-center text-sm text-slate-500 mt-7">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-blue-600 font-semibold hover:text-blue-700"
                            >
                                Create account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
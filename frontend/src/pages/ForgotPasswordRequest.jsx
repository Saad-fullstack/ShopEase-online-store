import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPasswordRequest = () => {
    const [email, setEmail] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8000/api/v1/user/reset-password-request", { email }, {
                withCredentials: true
            })


            toast.success("Reset link sent to your email successfully")
            setEmail("")
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
                                    <p className="text-xs text-slate-400">
                                        SHOP SMART
                                    </p>
                                </div>
                            </div>

                            <h2 className="text-4xl font-bold leading-tight mb-5">
                                Don't worry, we've got you covered.
                            </h2>

                            <p className="text-slate-400 leading-relaxed">
                                Enter your email address and we'll help you get
                                back into your ShopEase account.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                                    ✓
                                </div>

                                <span className="text-slate-300">
                                    Secure password recovery
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                                    ✓
                                </div>

                                <span className="text-slate-300">
                                    Reset link sent to your email
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                                    ✓
                                </div>

                                <span className="text-slate-300">
                                    Get back to shopping quickly
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-900">
                                Forgot Password?
                            </h2>

                            <p className="text-slate-500 mt-2 leading-relaxed">
                                Enter your email address and we'll send you a link
                                to reset your password.
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
                                    value={email}
                                    required
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition shadow-lg shadow-blue-600/20"
                            >
                                Send Reset Link
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

                        {/* Register */}
                        <p className="text-center text-sm text-slate-500 mt-3">
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

export default ForgotPasswordRequest;
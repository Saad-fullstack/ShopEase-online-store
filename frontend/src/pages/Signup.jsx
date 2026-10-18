import { data, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Signup = () => {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
        phone: "",
        profileImage: ""
    })

    const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post("http://localhost:8000/api/v1/user/register-user", form, {
                withCredentials: true
            })
            localStorage.setItem("user", JSON.stringify(data.user))
            toast.success("User registered successfully")
            navigate("/")
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    const passwordStrength = () => {
        const p = form.password
        if (!p) return null
        if (p.length < 6) return { label: 'Weak', color: 'bg-rose-400', width: 'w-1/4' }
        if (p.length < 10) return { label: 'Fair', color: 'bg-amber-400', width: 'w-2/4' }
        if (p.length < 14) return { label: 'Good', color: 'bg-teal-400', width: 'w-3/4' }
        return { label: 'Strong', color: 'bg-emerald-500', width: 'w-full' }
    }

    const strength = passwordStrength()
    return (
        <>
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2">

                    {/* Left Side */}
                    <div className="hidden lg:flex bg-slate-900 text-white p-12 flex-col justify-center">
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-xl font-bold">
                                    S
                                </div>

                                <div>
                                    <h1 className="text-xl font-bold">ShopEase</h1>
                                    <p className="text-xs text-slate-400">SHOP SMART</p>
                                </div>
                            </div>

                            <h2 className="text-4xl font-bold leading-tight mb-5">
                                Start your shopping journey with us.
                            </h2>

                            <p className="text-slate-400 leading-relaxed">
                                Create your ShopEase account and discover products you'll love,
                                all in one place.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                                    ✓
                                </div>
                                <span className="text-slate-300">Explore a wide range of products</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                                    ✓
                                </div>
                                <span className="text-slate-300">Manage your account easily</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                                    ✓
                                </div>
                                <span className="text-slate-300">Enjoy a simple shopping experience</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="p-6 sm:p-10 lg:p-12">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-900">
                                Create an account
                            </h2>

                            <p className="text-slate-500 mt-2">
                                Join ShopEase today and start exploring.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                />
                            </div>

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

                            {/* Age + Phone */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                {/* Age */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Age
                                    </label>

                                    <input
                                        type="number"
                                        name="age"
                                        value={form.age}
                                        onChange={handleChange}
                                        placeholder="Your age"
                                        min="1"
                                        max="100"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Phone
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="03XX XXXXXXX"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                    />
                                </div>

                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                />

                                <p className="text-xs text-slate-400 mt-2">
                                    Password must be at least 6 characters.
                                </p>

                                {/* Strength indicator */}
                                {strength && (
                                    <div className="mt-2">
                                        <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className={`h-full ${strength.color} ${strength.width} rounded-full transition-all duration-300`} />
                                        </div>
                                        <p className={`text-xs mt-1 font-medium ${strength.label === 'Weak' ? 'text-rose-500' :
                                            strength.label === 'Fair' ? 'text-amber-500' :
                                                strength.label === 'Good' ? 'text-teal-500' : 'text-emerald-500'
                                            }`}>
                                            {strength.label} password
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Profile Image */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Profile Image
                                </label>

                                <input
                                    type="text"
                                    name="profileImage"
                                    value={form.profileImage}
                                    onChange={handleChange}
                                    placeholder="Enter profile image URL"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                />

                                <p className="text-xs text-slate-400 mt-2">
                                    Add an image URL for your profile picture.
                                </p>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition shadow-lg shadow-blue-600/20"
                            >
                                Create Account
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
    const navigate = useNavigate();

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = async () => {
        try {
            await axios.get(
                "/api/v1/user/logout-user",
                {
                    withCredentials: true
                }
            );

            toast.success("User logout successfully");
            localStorage.removeItem("user");
            navigate("/login");
        } catch (error) {
            console.log(error.response?.data);
        }
    };

    const closeMobileMenu = () => {
        setIsMobileOpen(false);
        setIsProfileOpen(false);
    };

    return (
        <>
            <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Main Navbar */}
                    <div className="h-16 flex items-center justify-between gap-4">

                        {/* Logo */}
                        <Link
                            to="/"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-2 shrink-0"
                        >
                            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">
                                    S
                                </span>
                            </div>

                            <span className="text-xl sm:text-2xl font-bold text-slate-800">
                                Shop<span className="text-indigo-600">Ease</span>
                            </span>
                        </Link>


                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-6 lg:gap-8">

                            <Link
                                to="/"
                                className="text-slate-600 hover:text-indigo-600 font-medium transition"
                            >
                                Home
                            </Link>

                            <Link
                                to="/products"
                                className="text-slate-600 hover:text-indigo-600 font-medium transition"
                            >
                                Products
                            </Link>

                            <Link
                                to="/"
                                className="text-slate-600 hover:text-indigo-600 font-medium transition"
                            >
                                Categories
                            </Link>

                            <Link
                                to="/"
                                className="text-slate-600 hover:text-indigo-600 font-medium transition"
                            >
                                About
                            </Link>

                        </div>


                        {/* Desktop Right Side */}
                        <div className="hidden md:flex items-center gap-4">

                            {/* Cart */}
                            <Link
                                to="/cart"
                                className="relative p-2 text-slate-600 hover:text-indigo-600 transition"
                            >
                                <span className="text-xl">
                                    🛒
                                </span>

                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
                                    0
                                </span>
                            </Link>


                            {!user ? (

                                <div className="flex items-center gap-2">

                                    <Link
                                        to="/login"
                                        className="px-4 py-2 text-slate-700 font-medium hover:text-indigo-600 transition"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/signup"
                                        className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                                    >
                                        Signup
                                    </Link>

                                </div>

                            ) : (

                                <div className="relative">

                                    <button
                                        onClick={() =>
                                            setIsProfileOpen(!isProfileOpen)
                                        }
                                        className="flex items-center gap-2"
                                    >
                                        <img
                                            src={user.profileImage}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100"
                                        />

                                        <span className="hidden lg:block font-medium text-slate-700 max-w-24 truncate">
                                            {user.name}
                                        </span>

                                        <span
                                            className={`text-xs text-slate-500 transition-transform ${isProfileOpen
                                                ? "rotate-180"
                                                : ""
                                                }`}
                                        >
                                            ▼
                                        </span>
                                    </button>


                                    {/* Desktop Profile Dropdown */}
                                    {isProfileOpen && (

                                        <div className="absolute right-0 top-full mt-3 w-60 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">

                                            <div className="px-4 py-4 bg-slate-50 border-b border-slate-200">

                                                <div className="flex items-center gap-3">

                                                    <img
                                                        src={user.profileImage}
                                                        alt="Profile"
                                                        className="w-11 h-11 rounded-full object-cover"
                                                    />

                                                    <div className="min-w-0">

                                                        <p className="font-semibold text-slate-800 truncate">
                                                            {user.name}
                                                        </p>

                                                        <p className="text-sm text-slate-500 truncate">
                                                            {user.email}
                                                        </p>

                                                    </div>

                                                </div>

                                            </div>


                                            <Link
                                                to={`/user-profile`}
                                                onClick={() =>
                                                    setIsProfileOpen(false)
                                                }
                                                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 transition"
                                            >
                                                <span>👤</span>
                                                <span>My Profile</span>
                                            </Link>


                                            <Link
                                                to="/orders"
                                                onClick={() =>
                                                    setIsProfileOpen(false)
                                                }
                                                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 transition"
                                            >
                                                <span>📦</span>
                                                <span>My Orders</span>
                                            </Link>


                                            <div className="border-t border-slate-100" />


                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition"
                                            >
                                                <span>🚪</span>
                                                <span>Logout</span>
                                            </button>

                                        </div>

                                    )}

                                </div>

                            )}

                        </div>


                        {/* Mobile Right Side */}
                        <div className="flex md:hidden items-center gap-2 shrink-0">

                            {/* Cart */}
                            <Link
                                to="/cart"
                                className="relative p-2 text-slate-600 hover:text-indigo-600 transition"
                            >
                                <span className="text-lg sm:text-xl">
                                    🛒
                                </span>

                                <span className="absolute top-0 right-0 w-4 h-4 bg-indigo-600 text-white text-[10px] rounded-full flex items-center justify-center">
                                    0
                                </span>
                            </Link>


                            {/* Menu Button */}
                            <button
                                onClick={() =>
                                    setIsMobileOpen(!isMobileOpen)
                                }
                                className="p-2 text-slate-700"
                            >
                                <span className="text-xl">
                                    {isMobileOpen ? "✕" : "☰"}
                                </span>
                            </button>

                        </div>

                    </div>


                    {/* Mobile Menu */}
                    {isMobileOpen && (

                        <div className="md:hidden border-t border-slate-100 py-4">

                            {/* Navigation Links */}
                            <div className="flex flex-col gap-1">

                                <Link
                                    to="/"
                                    onClick={closeMobileMenu}
                                    className="px-3 py-3 rounded-lg text-slate-700 hover:bg-slate-50"
                                >
                                    Home
                                </Link>

                                <Link
                                    to="/products"
                                    onClick={closeMobileMenu}
                                    className="px-3 py-3 rounded-lg text-slate-700 hover:bg-slate-50"
                                >
                                    Products
                                </Link>

                                <Link
                                    to="/"
                                    onClick={closeMobileMenu}
                                    className="px-3 py-3 rounded-lg text-slate-700 hover:bg-slate-50"
                                >
                                    Categories
                                </Link>

                                <Link
                                    to="/"
                                    onClick={closeMobileMenu}
                                    className="px-3 py-3 rounded-lg text-slate-700 hover:bg-slate-50"
                                >
                                    About
                                </Link>

                            </div>


                            {/* Mobile Authentication */}
                            {!user ? (

                                <div className="flex gap-3 mt-4 pt-4 border-t border-slate-100">

                                    <Link
                                        to="/login"
                                        onClick={closeMobileMenu}
                                        className="flex-1 text-center px-4 py-3 border border-slate-300 rounded-lg font-medium text-slate-700"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/signup"
                                        onClick={closeMobileMenu}
                                        className="flex-1 text-center px-4 py-3 bg-indigo-600 text-white rounded-lg font-medium"
                                    >
                                        Signup
                                    </Link>

                                </div>

                            ) : (

                                <div className="mt-4 pt-4 border-t border-slate-100">

                                    {/* Mobile User */}
                                    <div className="flex items-center gap-3 px-3 mb-3">

                                        <img
                                            src={user.profileImage}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />

                                        <div className="min-w-0">

                                            <p className="font-semibold text-slate-800 truncate">
                                                {user.name}
                                            </p>

                                            <p className="text-sm text-slate-500 truncate">
                                                {user.email}
                                            </p>

                                        </div>

                                    </div>


                                    <Link
                                        to={`/user-profile`}
                                        onClick={closeMobileMenu}
                                        className="block px-3 py-3 rounded-lg text-slate-700 hover:bg-slate-50"
                                    >
                                        👤 My Profile
                                    </Link>

                                    <Link
                                        to="/orders"
                                        onClick={closeMobileMenu}
                                        className="block px-3 py-3 rounded-lg text-slate-700 hover:bg-slate-50"
                                    >
                                        📦 My Orders
                                    </Link>


                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            closeMobileMenu();
                                        }}
                                        className="w-full text-left px-3 py-3 rounded-lg text-red-600 hover:bg-red-50"
                                    >
                                        🚪 Logout
                                    </button>

                                </div>

                            )}

                        </div>

                    )}

                </div>

            </nav>
        </>
    );
};

export default Navbar;
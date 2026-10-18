import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <footer className="bg-gray-950 text-gray-300">

                {/* Main Footer */}
                <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">

                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

                        {/* Brand */}
                        <div className="lg:col-span-1">
                            <Link to="/" className="flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
                                    S
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-white">
                                        Shop<span className="text-blue-500">Ease</span>
                                    </h2>

                                    <p className="-mt-1 text-[9px] tracking-widest text-gray-500">
                                        SHOP SMART
                                    </p>
                                </div>
                            </Link>

                            <p className="mt-5 max-w-sm text-sm leading-6 text-gray-400">
                                Discover quality products, explore new collections, and enjoy a
                                simple shopping experience.
                            </p>

                            {/* Social Icons */}
                            <div className="mt-6 flex gap-3">
                                <a
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-sm transition hover:bg-blue-600 hover:text-white"
                                >
                                    f
                                </a>

                                <a
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-sm transition hover:bg-blue-600 hover:text-white"
                                >
                                    𝕏
                                </a>

                                <a
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-sm transition hover:bg-blue-600 hover:text-white"
                                >
                                    in
                                </a>

                                <a
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-sm transition hover:bg-blue-600 hover:text-white"
                                >
                                    ◎
                                </a>
                            </div>
                        </div>

                        {/* Shop */}
                        <div>
                            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
                                Shop
                            </h3>

                            <div className="space-y-3 text-sm">
                                <Link
                                    to="/"
                                    className="block transition hover:translate-x-1 hover:text-blue-400"
                                >
                                    Home
                                </Link>

                                <Link
                                    to="/products"
                                    className="block transition hover:translate-x-1 hover:text-blue-400"
                                >
                                    All Products
                                </Link>

                                <Link
                                    to="/categories"
                                    className="block transition hover:translate-x-1 hover:text-blue-400"
                                >
                                    Categories
                                </Link>

                                <Link
                                    to="/cart"
                                    className="block transition hover:translate-x-1 hover:text-blue-400"
                                >
                                    Shopping Cart
                                </Link>
                            </div>
                        </div>

                        {/* Account */}
                        <div>
                            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
                                Account
                            </h3>

                            <div className="space-y-3 text-sm">
                                <Link
                                    to="/login"
                                    className="block transition hover:translate-x-1 hover:text-blue-400"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="block transition hover:translate-x-1 hover:text-blue-400"
                                >
                                    Create Account
                                </Link>

                                <Link
                                    to="/profile"
                                    className="block transition hover:translate-x-1 hover:text-blue-400"
                                >
                                    My Profile
                                </Link>

                                <Link
                                    to="/forgot-password"
                                    className="block transition hover:translate-x-1 hover:text-blue-400"
                                >
                                    Forgot Password
                                </Link>
                            </div>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
                                Contact
                            </h3>

                            <div className="space-y-4 text-sm text-gray-400">
                                <div>
                                    <p className="mb-1 text-xs uppercase tracking-wide text-gray-600">
                                        Email
                                    </p>
                                    <p className="text-gray-300">support@shopease.com</p>
                                </div>

                                <div>
                                    <p className="mb-1 text-xs uppercase tracking-wide text-gray-600">
                                        Phone
                                    </p>
                                    <p className="text-gray-300">+92 300 1234567</p>
                                </div>

                                <div>
                                    <p className="mb-1 text-xs uppercase tracking-wide text-gray-600">
                                        Location
                                    </p>
                                    <p className="text-gray-300">Pakistan</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="mt-12 flex flex-col gap-4 border-t border-gray-800 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">

                        <p>
                            © {new Date().getFullYear()} ShopEase. All rights reserved.
                        </p>

                        <div className="flex gap-6">
                            <Link
                                to="/privacy"
                                className="transition hover:text-gray-300"
                            >
                                Privacy Policy
                            </Link>

                            <Link
                                to="/terms"
                                className="transition hover:text-gray-300"
                            >
                                Terms
                            </Link>
                        </div>
                    </div>

                </div>
            </footer>
        </>
    );
};

export default Footer;
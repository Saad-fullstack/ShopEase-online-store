import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from "react-router-dom";
import shoppingimage from "../assets/shopping.jpg"
import { categories } from '../../Data';
import axios from 'axios';
import { toast } from 'react-toastify';

const Home = () => {
    const [products, setProducts] = useState([])

    const allProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/get-all-products")
            // console.log(data)
            setProducts(data.products)
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        allProducts()
    }, [])

    const featuredProducts = products.slice(0, 4)
    return (
        <>
            <Navbar />

            <main className="bg-white">

                {/* ================= HERO ================= */}
                <section className="relative overflow-hidden bg-slate-950">
                    {/* Background decoration */}
                    <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
                    <div className="absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-indigo-600/10 blur-3xl" />

                    <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-24">

                        {/* Hero Content */}
                        <div>
                            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
                                <span className="h-2 w-2 rounded-full bg-blue-400" />
                                Discover something new
                            </span>

                            <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Everything you need,
                                <span className="text-blue-500"> all in one place.</span>
                            </h1>

                            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
                                Explore a carefully selected collection of products made for
                                everyday life. Simple shopping, great products, and prices
                                you'll love.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    to="/products"
                                    className="rounded-xl bg-blue-600 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
                                >
                                    Explore Products
                                </Link>

                                <Link
                                    to="/signup"
                                    className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3.5 text-center text-sm font-semibold text-white transition hover:border-slate-600 hover:bg-slate-800"
                                >
                                    Create Account
                                </Link>
                            </div>

                            {/* Small stats */}
                            <div className="mt-10 flex flex-wrap gap-8 border-t border-slate-800 pt-7">
                                <div>
                                    <p className="text-xl font-bold text-white">100+</p>
                                    <p className="mt-1 text-xs text-slate-500">Products</p>
                                </div>

                                <div>
                                    <p className="text-xl font-bold text-white">10+</p>
                                    <p className="mt-1 text-xs text-slate-500">Categories</p>
                                </div>

                                <div>
                                    <p className="text-xl font-bold text-white">24/7</p>
                                    <p className="mt-1 text-xs text-slate-500">Support</p>
                                </div>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="relative">
                            <div className="absolute -inset-4 rounded-[2rem] bg-blue-600/10 blur-2xl" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl">
                                <img
                                    src={shoppingimage}
                                    alt="Shopping collection"
                                    className="h-[420px] w-full object-cover sm:h-[500px]"
                                />

                                {/* Floating card */}
                                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-slate-950/85 p-4 backdrop-blur-md">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Featured collection
                                            </p>
                                            <p className="mt-1 font-semibold text-white">
                                                Find your next favorite
                                            </p>
                                        </div>

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                                            →
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* ================= CATEGORIES ================= */}
                <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">

                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                                Browse
                            </p>

                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                                Shop by category
                            </h2>

                            <p className="mt-2 max-w-xl text-sm text-gray-500">
                                Find what you're looking for by exploring our product categories.
                            </p>
                        </div>

                        <Link
                            to="/categories"
                            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                        >
                            View all →
                        </Link>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {categories.map((category) => (
                            <Link
                                key={category.name}
                                to="/products"
                                className="group rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-gray-200/50"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl transition group-hover:bg-blue-600">
                                    <span className="transition group-hover:scale-110">
                                        {category.icon}
                                    </span>
                                </div>

                                <h3 className="mt-5 font-semibold text-gray-900">
                                    {category.name}
                                </h3>

                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    {category.description}
                                </p>

                                <span className="mt-4 block text-sm font-medium text-blue-600">
                                    Explore →
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* ================= FEATURED PRODUCTS ================= */}
                <section className="bg-gray-50">
                    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">

                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                                    Our collection
                                </p>

                                <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                                    Featured products
                                </h2>

                                <p className="mt-2 text-sm text-gray-500">
                                    A few products you might want to check out.
                                </p>
                            </div>

                            <Link
                                to="/products"
                                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                            >
                                View all products →
                            </Link>
                        </div>

                        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {featuredProducts.map((product) => (
                                <div
                                    key={product._id}
                                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/60"
                                >
                                    {/* Image */}
                                    <Link
                                        to={`/products/${product._id}`}
                                        className="relative block overflow-hidden bg-gray-100"
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                                        />

                                        <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                                            {product.category}
                                        </span>
                                    </Link>

                                    {/* Product Info */}
                                    <div className="p-5">
                                        <Link to={`/products/${product._id}`}>
                                            <h3 className="font-semibold text-gray-900 transition hover:text-blue-600">
                                                {product.title}
                                            </h3>
                                        </Link>

                                        <div className="mt-3 flex items-center justify-between">
                                            <p className="text-lg font-bold text-gray-900">
                                                $ {product.price.toLocaleString()}
                                            </p>

                                            <Link
                                                to={`/products/${product._id}`}
                                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-700 transition hover:bg-blue-600 hover:text-white"
                                            >
                                                →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ================= WHY SHOP WITH US ================= */}
                <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">

                    <div className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                            Why ShopEase
                        </p>

                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                            Shopping made simple
                        </h2>

                        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
                            Everything is designed to make your shopping experience simple and
                            convenient.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {/* Feature 1 */}
                        <div className="rounded-2xl border border-gray-200 p-7">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                                🚚
                            </div>

                            <h3 className="mt-5 font-semibold text-gray-900">
                                Fast Delivery
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Get your orders delivered quickly and safely to your doorstep.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="rounded-2xl border border-gray-200 p-7">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                                🔒
                            </div>

                            <h3 className="mt-5 font-semibold text-gray-900">
                                Secure Shopping
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Your account and shopping experience are built with security in
                                mind.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="rounded-2xl border border-gray-200 p-7">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                                💬
                            </div>

                            <h3 className="mt-5 font-semibold text-gray-900">
                                Helpful Support
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Have a question? Our support team is here to help when you need
                                it.
                            </p>
                        </div>

                    </div>
                </section>

                {/* ================= CTA ================= */}
                <section className="px-5 pb-16 sm:px-8">
                    <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-blue-600">
                        <div className="relative px-6 py-14 text-center sm:px-12">

                            <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-white/10" />
                            <div className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-white/10" />

                            <div className="relative">
                                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    Ready to explore?
                                </h2>

                                <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-blue-100">
                                    Browse our collection and discover products that fit your
                                    everyday needs.
                                </p>

                                <Link
                                    to="/products"
                                    className="mt-7 inline-flex rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-blue-600 shadow-lg transition hover:bg-gray-50"
                                >
                                    Start Shopping
                                </Link>
                            </div>

                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    )
}

export default Home

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
const ProductDetails = () => {
    const [product, setProduct] = useState([])
    const { id } = useParams()
    console.log(id)

    const getProductDetail = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v1/product/product-detail/${id}`)

            setProduct(data.product)
        } catch (error) {
            toast.error("Sometihng went wrong")
        }
    }

    useEffect(() => {
        getProductDetail()
    }, [])
    // console.log(product)

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-slate-50">

                {/* Breadcrumb */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Link
                            to="/"
                            className="hover:text-blue-600 transition"
                        >
                            Home
                        </Link>

                        <span>/</span>

                        <Link
                            to="/products"
                            className="hover:text-blue-600 transition"
                        >
                            Products
                        </Link>

                        <span>/</span>

                        <span className="text-slate-900">
                            Product Details
                        </span>
                    </div>
                </div>

                {/* Product */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                        <div className="grid grid-cols-1 lg:grid-cols-2">

                            {/* Product Image */}
                            <div className="bg-slate-100 min-h-[450px] lg:min-h-[600px] flex items-center justify-center p-8">

                                <img
                                    src={product?.image}
                                    alt="Product"
                                    className="w-full h-full max-h-[550px] object-contain rounded-2xl"
                                />

                            </div>

                            {/* Product Information */}
                            <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-center">

                                {/* Category */}
                                <span className="w-fit px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold">
                                    {product?.category}
                                </span>

                                {/* Title */}
                                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-5">
                                    {product?.title}
                                </h1>

                                {/* Rating */}
                                <div className="flex items-center gap-3 mt-4">
                                    <div className="flex text-yellow-400">
                                        ★★★★★
                                    </div>

                                    <span className="text-sm text-slate-500">
                                        4.8 / 5
                                    </span>
                                </div>

                                {/* Price */}
                                <div className="mt-7">
                                    <span className="text-3xl font-bold text-slate-900">
                                        $ {product?.price}
                                    </span>
                                </div>

                                {/* Description */}
                                <div className="mt-7">
                                    <h2 className="text-lg font-semibold text-slate-900">
                                        Description
                                    </h2>

                                    <p className="text-slate-500 leading-relaxed mt-2">
                                        {product?.description}
                                    </p>
                                </div>

                                {/* Stock */}
                                <div className="mt-6 flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>

                                    <span className="text-sm font-medium text-green-600">
                                        {product?.stocks} items available
                                    </span>
                                </div>

                                {/* Quantity */}
                                <div className="mt-7">
                                    <p className="text-sm font-semibold text-slate-700 mb-3">
                                        Quantity
                                    </p>

                                    <div className="flex items-center border border-slate-200 rounded-xl w-fit overflow-hidden">

                                        <button className="w-11 h-11 text-lg hover:bg-slate-100 transition">
                                            −
                                        </button>

                                        <span className="w-12 text-center font-semibold">
                                            1
                                        </span>

                                        <button className="w-11 h-11 text-lg hover:bg-slate-100 transition">
                                            +
                                        </button>

                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 mt-8">

                                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition shadow-lg shadow-blue-600/20">
                                        Add to Cart
                                    </button>

                                    <button className="flex-1 border border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-700 font-semibold py-3.5 rounded-xl transition">
                                        Buy Now
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Additional Information */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">

                        <div className="bg-white border border-slate-200 rounded-2xl p-6">
                            <div className="text-2xl mb-3">
                                🚚
                            </div>

                            <h3 className="font-semibold text-slate-900">
                                Fast Delivery
                            </h3>

                            <p className="text-sm text-slate-500 mt-1">
                                Get your order delivered quickly and safely.
                            </p>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-2xl p-6">
                            <div className="text-2xl mb-3">
                                🔒
                            </div>

                            <h3 className="font-semibold text-slate-900">
                                Secure Shopping
                            </h3>

                            <p className="text-sm text-slate-500 mt-1">
                                Your personal information is protected.
                            </p>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-2xl p-6">
                            <div className="text-2xl mb-3">
                                💬
                            </div>

                            <h3 className="font-semibold text-slate-900">
                                Customer Support
                            </h3>

                            <p className="text-sm text-slate-500 mt-1">
                                We're here whenever you need help.
                            </p>
                        </div>

                    </div>

                </section>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetails;
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const getAllProducts = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/v1/product/get-all-products"
            );

            setProducts(response.data.products);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    // Search Products
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-slate-50">

                {/* Header */}
                <section className="bg-slate-900 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                        <div className="max-w-2xl">
                            <p className="text-blue-400 font-semibold mb-3">
                                SHOP COLLECTION
                            </p>

                            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                                Find something you'll love.
                            </h1>

                            <p className="text-slate-400 mt-5 text-lg">
                                Explore our collection of quality products,
                                carefully selected for your everyday needs.
                            </p>
                        </div>

                    </div>
                </section>


                {/* Products */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                    {/* Top Bar */}
                    <div className="flex flex-col gap-6 mb-8">

                        {/* Title + Search */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">
                                    All Products
                                </h2>

                                <p className="text-slate-500 mt-1">
                                    {filteredProducts.length} products available
                                </p>
                            </div>


                            {/* Search */}
                            <div className="relative w-full md:w-80">

                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full px-4 py-3 pr-11 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                />

                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    🔍
                                </span>

                            </div>

                        </div>


                        {/* Category Buttons */}
                        <div className="flex flex-wrap gap-2">

                            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium">
                                All
                            </button>

                            <button className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:border-blue-500 hover:text-blue-600 transition">
                                Electronics
                            </button>

                            <button className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:border-blue-500 hover:text-blue-600 transition">
                                Fashion
                            </button>

                            <button className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:border-blue-500 hover:text-blue-600 transition">
                                Accessories
                            </button>

                        </div>

                    </div>


                    {/* Product Grid */}
                    {filteredProducts.length > 0 ? (

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                            {filteredProducts.map((product) => (

                                <div
                                    key={product._id}
                                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition duration-300"
                                >

                                    {/* Image */}
                                    <Link to={`/products/${product._id}`}>

                                        <div className="relative h-64 bg-slate-100 overflow-hidden">

                                            <img
                                                src={product?.image}
                                                alt={product.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            />

                                            {/* Category */}
                                            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-slate-700">
                                                {product?.category}
                                            </span>

                                            {/* Stock */}
                                            {product?.stocks < 10 && (
                                                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold">
                                                    Low Stock
                                                </span>
                                            )}

                                        </div>

                                    </Link>


                                    {/* Content */}
                                    <div className="p-5">

                                        <h3 className="text-lg font-semibold text-slate-900 truncate">
                                            {product?.title}
                                        </h3>

                                        <p className="text-sm text-slate-500 mt-2 line-clamp-2 min-h-[40px]">
                                            {product.description}
                                        </p>


                                        <div className="flex items-center justify-between mt-5">

                                            <div>

                                                <p className="text-xl font-bold text-slate-900">
                                                    $ {product.price.toLocaleString()}
                                                </p>

                                                <p className="text-xs text-slate-400 mt-1">
                                                    {product.stocks} in stock
                                                </p>

                                            </div>


                                            <Link
                                                to={`/products/${product._id}`}
                                                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition"
                                            >
                                                View
                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    ) : (

                        /* No Products */
                        <div className="text-center py-20">

                            <div className="text-5xl mb-4">
                                🔍
                            </div>

                            <h3 className="text-xl font-semibold text-slate-800">
                                No products found
                            </h3>

                            <p className="text-slate-500 mt-2">
                                Try searching with a different product name.
                            </p>

                        </div>

                    )}

                </section>

            </div>

            <Footer />
        </>
    );
};

export default Products;
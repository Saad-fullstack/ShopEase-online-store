import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const AddProduct = () => {

    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        stocks: '',
        category: '',
        image: ''
    })

    const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("/api/v1/product/create-product", form, {
                withCredentials: true
            })
            toast.success("Product created successfully")
            setForm({
                title: '',
                description: '',
                price: '',
                stocks: '',
                category: '',
                image: ''
            })
        } catch (error) {
            if (!form) {
                toast.error("All input fields are required")
            } else {
                toast.error("Something went wrong")
            }
        }
    }

    return (
        <>
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Add Product
                    </h1>

                    <p className="text-slate-500 mt-1">
                        Add a new product to your store.
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Product Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                required
                                placeholder="Enter product title"
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Description
                            </label>

                            <textarea
                                name="description"
                                rows="5"
                                value={form.description}
                                onChange={handleChange}
                                required
                                placeholder="Enter product description"
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Price + Stock */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Price
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter price"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Stock
                                </label>

                                <input
                                    type="number"
                                    name="stocks"
                                    value={form.stocks}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter stock quantity"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Category
                            </label>

                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none bg-white focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select a category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Fragnance">Fragnance</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Shoes">Shoes</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Beauty">Beauty</option>
                                <option value="Home">Home</option>
                                <option value="Sports">Sports</option>
                                <option value="Books">Books</option>
                                <option value="Toys">Toys</option>
                            </select>
                        </div>

                        {/* Image */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Product Image URL
                            </label>

                            <input
                                type="text"
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                required
                                placeholder="https://example.com/image.jpg"
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">

                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition"
                            >
                                Add Product
                            </button>

                            <button
                                type="button"
                                onClick={() => setForm({
                                    title: '',
                                    description: '',
                                    price: '',
                                    stocks: '',
                                    category: '',
                                    image: ''
                                })}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-medium transition"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            </div>
        </>
    );
};

export default AddProduct;
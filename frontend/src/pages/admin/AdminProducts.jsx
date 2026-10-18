import axios from "axios";
import { useEffect, useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminProducts = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [editingProduct, setEditingProduct] = useState(null)
    const [editForm, setEditForm] = useState({
        title: '',
        description: '',
        price: '',
        stocks: '',
        category: '',
        image: ''
    })
    const [search, setSearch] = useState("")

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/v1/product/get-all-products")
            // console.log(data.products)
            setProducts(data.products)
        } catch (error) {
            toast.error("Something is went wrong")
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])
    // console.log(products)

    // Delete Product
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:8000/api/v1/product/delete-product/${id}`, {
                withCredentials: true
            })

            toast.success("Product deleted successfully")

            setProducts((prev) => prev.filter((product) => product._id !== id))
        } catch (error) {
            toast.error("Failed to delete product")
        }
    }

    // Edit product
    const handleEdit = async (id) => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v1/product/product-detail/${id}`)
            // console.log(data)
            setEditingProduct(data.product)
            setEditForm({
                title: data.product.title,
                description: data.product.description,
                price: data.product.price,
                stocks: data.product.stocks,
                category: data.product.category,
                image: data.product.image
            })
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    const handleEditChange = (e) => setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    // Update Product
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            await axios.patch(`http://localhost:8000/api/v1/product/update-product/${editingProduct._id}`, editForm, { withCredentials: true })

            toast.success("Product update successfully")
            console.log(products.data)
            setProducts((prev) =>
                prev.map((product) =>
                    product._id === data.product._id
                        ? data.product
                        : product
                )
            )
            setEditingProduct(null)
            navigate("/admin/products")
        } catch (error) {
            console.log(error)
            toast.error("failed to update product")
        }
    }

    // Search Products
    const filteredProducts = products.filter((product) => {
        return product.title.toLowerCase().includes(search.toLowerCase())
    })
    return (
        <>
            <div>

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Products
                        </h1>

                        <p className="text-slate-500 mt-1">
                            Manage all products in your store.
                        </p>
                    </div>

                    <Link
                        to="/admin/add-product"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg font-medium transition text-center"
                    >
                        + Add Product
                    </Link>

                </div>

                {/* Products Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                    <div className="p-5 border-b border-slate-200">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full sm:w-80 px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full text-left">

                            <thead className="bg-slate-50">
                                <tr>

                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                        Product
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                        Category
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                        Price
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                        Stock
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                        Actions
                                    </th>

                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">

                                {filteredProducts.map((product) => (
                                    <tr
                                        key={product._id}
                                        className="hover:bg-slate-50"
                                    >

                                        <td className="px-6 py-4">

                                            <div className="flex items-center gap-4 min-w-[220px]">

                                                <img
                                                    src={product.image}
                                                    alt={product.title}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />

                                                <span className="font-medium text-slate-900">
                                                    {product.title}
                                                </span>

                                            </div>

                                        </td>

                                        <td className="px-6 py-4 text-slate-500">
                                            {product.category}
                                        </td>

                                        <td className="px-6 py-4 font-medium text-slate-700">
                                            ${product.price}
                                        </td>

                                        <td className="px-6 py-4">

                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${product.stocks <= 5
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-green-100 text-green-600"
                                                    }`}
                                            >
                                                {product.stocks}
                                            </span>

                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="flex gap-2">

                                                <button
                                                    onClick={() => { handleEdit(product._id) }}
                                                    className="px-3 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100">
                                                    Edit
                                                </button>


                                                <button onClick={() => handleDelete(product._id)} className="px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                                                    Delete
                                                </button>


                                            </div>

                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

                {editingProduct && (
                    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

                        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">

                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">
                                        Edit Product
                                    </h2>

                                    <p className="text-sm text-slate-500 mt-1">
                                        Update product information
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setEditingProduct(null)}
                                    className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 text-xl"
                                >
                                    ✕
                                </button>

                            </div>

                            {/* Edit Form */}
                            <form onSubmit={handleUpdate} className="p-6">

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                    {/* Title */}
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Product Title
                                        </label>

                                        <input
                                            type="text"
                                            name="title"
                                            value={editForm.title}
                                            onChange={handleEditChange}
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* Description */}
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Description
                                        </label>

                                        <textarea
                                            name="description"
                                            rows="4"
                                            value={editForm.description}
                                            onChange={handleEditChange}
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* Price */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Price
                                        </label>

                                        <input
                                            type="number"
                                            name="price"
                                            value={editForm.price}
                                            onChange={handleEditChange}
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* Stock */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Stock
                                        </label>

                                        <input
                                            type="number"
                                            name="stocks"
                                            value={editForm.stocks}
                                            onChange={handleEditChange}
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Category
                                        </label>

                                        <select
                                            name="category"
                                            value={editForm.category}
                                            onChange={handleEditChange}
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
                                            Image URL
                                        </label>

                                        <input
                                            type="text"
                                            name="image"
                                            value={editForm.image}
                                            onChange={handleEditChange}
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                </div>

                                {/* Buttons */}
                                <div className="flex justify-end gap-3 mt-7 pt-5 border-t border-slate-200">

                                    <button
                                        type="button"
                                        onClick={() => setEditingProduct(null)}
                                        className="px-5 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="px-5 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                                    >
                                        Update Product
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>
                )}

            </div>
        </>
    );
};

export default AdminProducts;
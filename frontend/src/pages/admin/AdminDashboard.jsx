import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";

const AdminDashboard = () => {
    const [products, setProducts] = useState([])
    const [users, setUsers] = useState([])

    const totalProducts = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/v1/product/get-all-products")
            // console.log(data.products)
            setProducts(data.products)
        } catch (error) {
            toast.error("Something is went wrong")
            console.log(error)
        }
    }
    const recentProducts = products.slice(0, 4)

    const totalUsers = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/v1/user/get-all-users", {
                withCredentials: true
            })
            // console.log(data)
            setUsers(data.user)
        } catch (error) {
            toast.error("Something went wrong")
        }
    }


    useEffect(() => {
        totalProducts()
        totalUsers()
    }, [])

    const stats = [
        {
            title: "Total Products",
            value: products.length,
            description: "Products in store"
        },
        {
            title: "Total Users",
            value: users.length,
            description: "Registered users"
        },
        {
            title: "Total Stock",
            value: products.reduce((total, product) => total + product.stocks, 0),
            description: "Items available"
        },
        {
            title: "Low Stock",
            value: products.filter((product) => product.stocks <= 5).length,
            description: "Products need attention"
        }
    ];



    return (
        <>
            <div>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Dashboard
                    </h1>

                    <p className="text-slate-500 mt-1">
                        Welcome back! Here's what's happening with your store.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

                    {stats.map((stat) => (
                        <div
                            key={stat.title}
                            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
                        >
                            <p className="text-sm text-slate-500">
                                {stat.title}
                            </p>

                            <h2 className="text-3xl font-bold text-slate-900 mt-2">
                                {stat.value}
                            </h2>

                            <p className="text-xs text-slate-400 mt-2">
                                {stat.description}
                            </p>
                        </div>
                    ))}

                </div>

                {/* Recent Products */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                    <div className="p-6 border-b border-slate-200">
                        <h2 className="text-xl font-bold text-slate-900">
                            Recent Products
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                            Recently added products in your store
                        </p>
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
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">

                                {recentProducts.map((product) => (
                                    <tr key={product._id} className="hover:bg-slate-50">

                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {product.title}
                                        </td>

                                        <td className="px-6 py-4 text-slate-500">
                                            {product.category}
                                        </td>

                                        <td className="px-6 py-4 text-slate-700">
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

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </>
    );
};

export default AdminDashboard;
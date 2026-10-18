import { Link } from "react-router-dom"

const OrderHistory = () => {
    return (
        <>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8">
                <h2 className="text-xl font-bold text-slate-900">
                    Order History
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                    View your previous purchases here.
                </p>

                <div className="py-16 text-center">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 flex items-center justify-center text-3xl">
                        📦
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mt-5">
                        No order history yet
                    </h3>
                    <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
                        Your orders will appear here once the ShopEase order system is implemented.
                    </p>
                    <Link
                        to="/products"
                        className="inline-block mt-6 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
                    >
                        Explore Products
                    </Link>
                </div>
            </div>
        </>
    )
}

export default OrderHistory

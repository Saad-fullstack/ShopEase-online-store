import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
    const navLinkClass = ({ isActive }) =>
        `block px-4 py-3 rounded-lg font-medium transition ${isActive
            ? "bg-indigo-600 text-white"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`;

    return (
        <>
            <div className="min-h-screen bg-slate-100 flex">

                {/* Sidebar */}
                <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">

                    <div className="px-6 py-6 border-b border-slate-800">
                        <h1 className="text-2xl font-bold">
                            Shop<span className="text-indigo-400">Ease</span>
                        </h1>

                        <p className="text-xs text-slate-400 mt-1">
                            ADMIN PANEL
                        </p>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-2">

                        <NavLink to="/admin" end className={navLinkClass}>
                            Dashboard
                        </NavLink>

                        <NavLink to="/admin/products" className={navLinkClass}>
                            Products
                        </NavLink>

                        <NavLink to="/admin/add-product" className={navLinkClass}>
                            Add Product
                        </NavLink>

                        <NavLink to="/admin/users" className={navLinkClass}>
                            Users
                        </NavLink>

                    </nav>

                    <div className="p-4 border-t border-slate-800">

                        <NavLink
                            to="/"
                            className="block px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            ← Back to Store
                        </NavLink>

                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">

                    {/* Mobile Header */}
                    <header className="md:hidden bg-slate-900 text-white px-5 py-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-bold">
                                Shop<span className="text-indigo-400">Ease</span>
                            </h1>

                            <NavLink
                                to="/"
                                className="text-sm text-slate-300"
                            >
                                Store
                            </NavLink>
                        </div>
                    </header>

                    <div className="p-5 md:p-8">
                        <Outlet />
                    </div>

                </main>
            </div>
        </>
    );
};

export default AdminLayout;
import { Link } from "react-router-dom"

const Sidebar = ({
    user,
    tabs,
    setActiveTab,
    setMessage,
    setName,
    setEmail,
    setProfileImage,
    setIsEditing,
    activeTab
}) => {
    return (
        <>
            <aside className="bg-white border border-slate-200 rounded-2xl p-3 h-fit">
                <p className="px-3 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Account Settings
                </p>

                <nav className="flex flex-col gap-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setMessage("");

                                if (tab.id === "edit") {
                                    setName(user.name || "");
                                    setEmail(user.email || "");
                                    setProfileImage(user.profileImage || "");
                                    setIsEditing(true);
                                } else {
                                    setIsEditing(false);
                                }
                            }}
                            className={`flex items-center gap-3 text-left px-4 py-3 rounded-xl transition ${activeTab === tab.id
                                ? "bg-indigo-50 text-indigo-700 font-semibold border-l-4 border-indigo-600"
                                : "text-slate-600 hover:bg-slate-50"
                                }`}
                        >
                            <span className="text-lg">{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="mt-5 mx-1 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 p-5">
                    <div className="text-3xl mb-3">🛍️</div>
                    <h3 className="font-bold text-slate-800">
                        Shop Smarter
                    </h3>
                    <p className="text-sm text-slate-500 mt-2">
                        Explore products made for your everyday needs.
                    </p>
                    <Link
                        to="/products"
                        className="block text-center mt-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 text-sm font-semibold transition"
                    >
                        Browse Products
                    </Link>
                </div>
            </aside>
        </>
    )
}

export default Sidebar

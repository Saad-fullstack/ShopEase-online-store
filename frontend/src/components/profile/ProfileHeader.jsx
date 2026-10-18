
import { useRef } from "react";

const ProfileHeader = ({
    user,
    setActiveTab,
    setIsEditing
}) => {
    const fileInputRef = useRef(null);

    return (
        <>
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-900 p-6 sm:p-10 text-white">

                {/* Background Decoration */}
                <div className="absolute -right-10 -bottom-32 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl" />

                <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">

                    {/* Profile Picture */}
                    <div className="relative shrink-0">
                        {user?.profileImage ? (
                            <img
                                src={user.profileImage}
                                alt="Profile"
                                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white/80"
                            />
                        ) : (
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-indigo-600 border-4 border-white/80 flex items-center justify-center text-4xl font-bold">
                                {(user?.name || "U").charAt(0).toUpperCase()}
                            </div>
                        )}

                        {/* Upload Picture Button */}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center border-2 border-white transition"
                            title="Change profile picture"
                        >
                            📷
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (file) {
                                    console.log("Selected picture:", file);
                                }
                            }}
                        />
                    </div>

                    {/* User Details */}
                    <div className="min-w-0 flex-1">
                        <p className="text-blue-300 text-sm font-semibold mb-2">
                            MY ACCOUNT
                        </p>

                        <h1 className="text-2xl sm:text-3xl font-bold break-words">
                            {user?.name || "Your Name"}
                        </h1>

                        <p className="text-slate-300 mt-2 break-all">
                            {user?.email || "Your email address"}
                        </p>

                        <p className="text-slate-400 text-sm mt-3">
                            Welcome to your ShopEase account
                        </p>
                    </div>

                    {/* Edit Profile Button */}
                    <button
                        onClick={() => {
                            setActiveTab("edit")
                            setIsEditing(true)
                        }}
                        type="button"
                        className="shrink-0 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold transition"
                    >
                        ✎ Edit Profile
                    </button>

                </div>
            </section>
        </>
    );
};

export default ProfileHeader;

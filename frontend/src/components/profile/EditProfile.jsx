const EditProfile = ({
    user,
    setActiveTab,
    setIsEditing,
    handleSaveProfile,
    setName,
    setEmail,
    email,
    name,
    handleImageChange,
    setProfileImage
}) => {
    return (
        <>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8">
                <h2 className="text-xl font-bold text-slate-900">
                    Edit Profile
                </h2>
                <p className="text-sm text-slate-500 mt-1 mb-7">
                    Update your account information.
                </p>

                <form onSubmit={handleSaveProfile} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Full Name
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Profile Picture
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full rounded-xl border border-slate-200 p-3 text-sm"
                        />
                        <p className="text-xs text-slate-400 mt-2">
                            Choose an image smaller than 2 MB. Preview is stored locally only.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                        <button
                            type="submit"
                            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
                        >
                            Save Changes
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setName(user.name || "");
                                setEmail(user.email || "");
                                setProfileImage(user.profileImage || "");
                                setIsEditing(false);
                                setActiveTab("overview");
                            }}
                            className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditProfile

const PersonalInformation = ({
    user,
    profileImage,
    name,
    setActiveTab,
    setIsEditing,
    handleImageChange
}) => {
    return (
        <>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8">
                <div className="flex items-center justify-between gap-4 mb-7">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">
                            Personal Information
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">
                            Your account details
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            setActiveTab("edit")
                            setIsEditing(true)
                        }}
                        className="px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-sm font-semibold"
                    >
                        Edit
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-8">
                    <div className="flex-1 space-y-5">
                        {[
                            ["Full Name", user?.name],
                            ["Email Address", user?.email],
                            ["Account ID", user?._id]
                        ].map(([label, value]) => (
                            <div
                                key={label}
                                className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 border-b border-slate-100 pb-4"
                            >
                                <p className="text-sm text-slate-500">
                                    {label}
                                </p>
                                <p className="sm:col-span-2 font-medium text-slate-800 break-all">
                                    {value || "Not provided"}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="sm:w-44 flex flex-col items-center justify-center bg-slate-50 rounded-2xl p-5">
                        {profileImage ? (
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-3xl font-bold">
                                {(name || "U").charAt(0).toUpperCase()}
                            </div>
                        )}

                        <p className="font-semibold text-slate-800 mt-3">
                            Profile Picture
                        </p>

                        <label
                            htmlFor="profile-picture-overview"
                            className="text-sm text-indigo-600 hover:underline mt-1 cursor-pointer"
                        >
                            Upload picture
                        </label>

                        <input
                            id="profile-picture-overview"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PersonalInformation

const ChangePassword = ({
    handlePasswordChange,
    currentPassword,
    newPassword,
    confirmPassword,
    setConfirmPassword,
    setNewPassword,
    setCurrentPassword
}) => {
    return (
        <>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8">
                <h2 className="text-xl font-bold text-slate-900">
                    Change Password
                </h2>
                <p className="text-sm text-slate-500 mt-1 mb-7">
                    Choose a strong password to protect your account.
                </p>

                <form
                    onSubmit={handlePasswordChange}
                    className="space-y-5"
                >
                    {[
                        {
                            label: "Current Password",
                            value: currentPassword,
                            setter: setCurrentPassword
                        },
                        {
                            label: "New Password",
                            value: newPassword,
                            setter: setNewPassword
                        },
                        {
                            label: "Confirm New Password",
                            value: confirmPassword,
                            setter: setConfirmPassword
                        }
                    ].map((field) => (
                        <div key={field.label}>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                {field.label}
                            </label>
                            <input
                                type="password"
                                value={field.value}
                                onChange={(e) => field.setter(e.target.value)}
                                required
                                minLength={8}
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </>
    )
}

export default ChangePassword

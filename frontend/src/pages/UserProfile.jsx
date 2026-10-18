import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileHeader from "../components/profile/ProfileHeader";
import PersonalInformation from "../components/profile/PersonalInformation";
import EditProfile from "../components/profile/EditProfile";
import ChangePassword from "../components/profile/ChangePassword";
import OrderHistory from "../components/profile/OrderHistory";
import Sidebar from "../components/profile/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";

const UserProfile = () => {
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setMessage("Please select a valid image.");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setMessage("Image size must be less than 2 MB.");
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            setProfileImage(reader.result);
            setMessage("");
        };

        reader.readAsDataURL(file);
    };

    const [user, setUser] = useState([])

    const [activeTab, setActiveTab] = useState("overview");
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user.name || "");
    const [email, setEmail] = useState(user.email || "");
    const [profileImage, setProfileImage] = useState(user.profileImage || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const userProfile = async () => {
        try {
            const { data } = await axios.get("/api/v1/user/user-profile", {
                withCredentials: true
            })
            // console.log(data)
            setUser(data.user)
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        userProfile()
    }, [])

    // update user
    const handleSaveProfile = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.patch("/api/v1/user/update-user",
                { name, email },
                { withCredentials: true }
            )
            console.log(data)
            setUser(data.user)
            toast.success(data.message)
            setIsEditing(false)
            setActiveTab("overview")
        } catch (error) {
            console.log(error)
        }
    };

    // UI only: connect this to a real password-change endpoint later.
    const handlePasswordChange = (e) => {
        e.preventDefault();

        if (newPassword.length < 8) {
            setMessage("New password must contain at least 8 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage("New passwords do not match.");
            return;
        }

        setMessage("Password API is not connected yet.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    const tabs = [
        { id: "overview", label: "Personal Information", icon: "♙" },
        { id: "edit", label: "Edit Profile", icon: "✎" },
        { id: "password", label: "Change Password", icon: "♙" },
        { id: "orders", label: "Order History", icon: "▣" }
    ];

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Profile Banner */}
                    <ProfileHeader
                        user={user}
                        setActiveTab={setActiveTab}
                        setIsEditing={setIsEditing}
                    />

                    {message && (
                        <div
                            role="status"
                            className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800"
                        >
                            {message}
                            <button
                                onClick={() => setMessage("")}
                                className="float-right font-bold"
                                aria-label="Dismiss message"
                            >
                                ✕
                            </button>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">

                        {/* Sidebar */}
                        <Sidebar
                            user={user}
                            tabs={tabs}
                            setActiveTab={setActiveTab}
                            setMessage={setMessage}
                            setName={setName}
                            setEmail={setEmail}
                            setProfileImage={setProfileImage}
                            setIsEditing={setIsEditing}
                            activeTab={activeTab}
                        />

                        {/* Main Content */}
                        <section className="lg:col-span-3 space-y-6">

                            {/* Personal Information */}
                            {activeTab === "overview" && (
                                <PersonalInformation
                                    user={user}
                                    profileImage={profileImage}
                                    name={name}
                                    setActiveTab={setActiveTab}
                                    setIsEditing={setIsEditing}
                                    handleImageChange={handleImageChange}
                                />
                            )}


                            {/* Edit Profile */}
                            {activeTab === "edit" && (
                                <EditProfile
                                    user={user}
                                    email={email}
                                    name={name}
                                    setActiveTab={setActiveTab}
                                    setIsEditing={setIsEditing}
                                    handleSaveProfile={handleSaveProfile}
                                    setName={setName}
                                    setEmail={setEmail}
                                    handleImageChange={handleImageChange}
                                    setProfileImage={setProfileImage}
                                />
                            )}


                            {/* Change Password */}
                            {activeTab === "password" && (
                                <ChangePassword
                                    handlePasswordChange={handlePasswordChange}
                                    currentPassword={currentPassword}
                                    newPassword={newPassword}
                                    confirmPassword={confirmPassword}
                                    setCurrentPassword={setCurrentPassword}
                                    setNewPassword={setNewPassword}
                                    setConfirmPassword={setConfirmPassword}
                                />
                            )}

                            {/* Order History */}
                            {activeTab === "orders" && (
                                <OrderHistory />
                            )}

                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default UserProfile;

import { subtle } from "crypto";
import User from "../models/usersModel.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendMail } from "../utils/sendMails.js";
import crypto from "crypto"

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, age, phone, profileImage } = req.body

        if (!name || !email || !password || !age || !phone || !profileImage) {
            return res.status(400).json({
                success: false,
                message: "All input fields are required"
            })
        }

        const user = await User.create({
            name,
            email,
            password,
            age,
            phone,
            profileImage
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not registered"
            })
        }

        sendToken(user, 200, res)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error
        })
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All input fields are required"
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const isPasswordMatched = await user.comparePassword(password)

        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        sendToken(user, 200, res)

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const userProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const user = await User.find()
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Users not found"
            })
        }

        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { name, email }, {
            new: true,
            runValidators: true
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error
        })
    }
}


export const resetPasswordRequest = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        let resetToken = user.resetPassword()
        await user.save()

        const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        const message = `If you want to reset your password click on the provided link ${resetPasswordUrl}`

        await sendMail({
            email: user.email,
            subject: "Reset Password Request",
            message
        })

        return res.status(200).json({
            success: true,
            message: `Email sent successfully to ${user.email}`
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error
        })
    }
}


export const resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid token or time has been expired"
            })
        }

        const { password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password doesn't match with each other"
            })
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save()
        sendToken(user, 200, res)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now())
        })

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            success: false,
            message: "Logout failed"
        })
    }
}
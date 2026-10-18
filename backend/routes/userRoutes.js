import express from "express"
import { deleteUser, getAllUsers, loginUser, logoutUser, registerUser, resetPassword, resetPasswordRequest, updateUser, userProfile } from "../controllers/userController.js"
import { isAdmin, isAuthenticatedUser } from "../utils/userAuth.js"


const userRouter = express.Router()

userRouter.post("/register-user", registerUser)
userRouter.post("/login-user", loginUser)
userRouter.get("/user-profile", isAuthenticatedUser, userProfile)
userRouter.get("/get-all-users", isAuthenticatedUser, isAdmin("admin"), getAllUsers)
userRouter.patch("/update-user", isAuthenticatedUser, updateUser)
userRouter.delete("/delete-user/:id", isAuthenticatedUser, isAdmin("admin"), deleteUser)
userRouter.post("/reset-password-request", resetPasswordRequest)
userRouter.post("/reset-password/:token", resetPassword)
userRouter.get("/logout-user", logoutUser)

export default userRouter
export { }
const express = require("express")
const router = express.Router()

import {
    login,
    signup,
    sendotp,
    changePassword,
} from '../controllers/auth'
import { resetPassword, resetPasswordToken } from "../controllers/resetPassword"
import { auth } from '../middlewares/auth'

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

router.post("/login", login)
router.post("/signup", signup)
router.post("/sendotp", sendotp)
router.post("/changepassword", auth, changePassword)


// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

router.post("/reset-password-token", resetPasswordToken)
router.post("/reset-password", resetPassword)

export default router
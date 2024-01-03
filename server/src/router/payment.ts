export { }
const express = require("express")
const router = express.Router()

import { capturePayment, verifySignature } from "../controllers/payment"
import { auth, isInstructor, isStudent, isAdmin } from "../middlewares/auth"
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifySignature", verifySignature)

export default router
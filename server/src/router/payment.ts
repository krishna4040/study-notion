export { }
import express from 'express'
const router = express.Router()

import { addToCart, capturePayment, removeFromCart, sendPaymentSuccessEmail, verifySignature } from "../controllers/payment"
import { auth, isStudent } from "../middlewares/auth"

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifySignature", auth, verifySignature);
router.put("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);
router.put("/addToCart", auth, isStudent, addToCart);
router.put("/removeFromCart", auth, isStudent, removeFromCart);

export default router
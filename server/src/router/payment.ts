export { }
import express from 'express'
const router = express.Router()

import { addToCart, capturePayment, removeFromCart, verifySignature } from "../controllers/payment"
import { auth, isStudent } from "../middlewares/auth"

router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifySignature", auth, verifySignature)
router.put("/addToCart", auth, isStudent, addToCart);
router.put("/addToCart", auth, isStudent, removeFromCart);

export default router
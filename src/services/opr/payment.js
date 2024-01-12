import axios from 'axios';
import toast from 'react-hot-toast';
import { courseEndpoints } from '@/services/api'
import { resetCart } from '@/lib/feature/cartSlice';

const { PAYMENT_CAPTURE_API, PAYMENT_SUCCESS_APT, PAYMENT_VERIFY_API } = courseEndpoints;

const loadScript = (src) => {
    return new Promise(resolve => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    })
}

const sendPaymentSuccessfulEmail = async (paymentRes, token) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, amount } = paymentRes;
        const res = await axios.post(PAYMENT_SUCCESS_APT, {
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            amount
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        toast.error(error.message);
        console.log(error);
    }
}

const verifyPayment = async (data, token, router, dispatch) => {
    const toastId = toast.loading("verifying");
    try {
        const res = await axios.post(PAYMENT_VERIFY_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!res.data.success) {
            throw new Error('Payment not verified');
        }
        sendPaymentSuccessfulEmail(res, token);
        dispatch(resetCart());
        router.push('/dashboard/enrolled-courses');
    } catch (error) {
        console.log(error);
    }
    toast.dismiss(toastId);
}

export const buyCourse = async (courses, token, user, dispatch, router) => {
    const toastId = toast.loading('loading...');
    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            throw new Error('Razorpay script unable to load');
        }
        const { data } = await axios.post(PAYMENT_CAPTURE_API, { courses }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const options = {
            key: process.env.KEY, // Enter the Key ID generated from the Dashboard
            amount: 4000,
            currency: "INR",
            name: "Study-notion",
            description: "Test Transaction",
            order_id: data,
            handler: function (res) {
                verifyPayment(res, token, router, dispatch);
            },
            theme: {
                "color": "#3399cc"
            }
        };
        const paymentWindow = new window.Razorpay(options);
        paymentWindow.open();
        paymentWindow.on("payment.failed", () => {
            toast.error("oops!! payment failed");
        })

    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
    toast.dismiss(toastId)
}
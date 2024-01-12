import axios from 'axios';
import toast from 'react-hot-toast';
import { courseEndpoints } from '@/services/api'
import { addToCart, resetCart } from '@/lib/feature/cartSlice';
import { setUser } from '@/lib/feature/profileSlice';

const { PAYMENT_CAPTURE_API, PAYMENT_SUCCESS_APT, PAYMENT_VERIFY_API, ADD_CART, REMOVE_CART } = courseEndpoints;

const loadScript = (src) => {
    return new Promise(resolve => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    })
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
            key: "rzp_test_ycPydRYvaIESAU",
            amount: data.data.amount,
            currency: data.data.currency,
            name: "Study-notion",
            description: "Thank you for Purchasing the Course.",
            prefill: {
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
            },
            // The response object is an important object it have all the details of payment
            handler: function (res) {
                verifyPayment({ ...res, courses }, token, router, dispatch);
                sendPaymentSuccessfulEmail(res, data.data.amount, token);
            }
        };
        const paymentWindow = new window.Razorpay(options);
        paymentWindow.open();
        paymentWindow.on("payment.failed", () => {
            toast.error("oops!! payment failed");
        });
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
}

const verifyPayment = async (data, token, router, dispatch) => {
    const toastId = toast.loading("verifying payment");
    try {
        const res = await axios.post(PAYMENT_VERIFY_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!res.data.success) {
            throw new Error('Payment not verified');
        }
        dispatch(resetCart());
        router.push('/dashboard/enrolled-courses');
    } catch (error) {
        console.log(error);
    }
    toast.dismiss(toastId);
}

const sendPaymentSuccessfulEmail = async (data, token) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, amount } = data;
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

export const addCourseToCart = async (courseId, dispatch) => {
    try {
        const { data } = await axios.put(ADD_CART, { courseId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        toast.success("course added to cart");
        dispatch(addToCart(data.data.course));
        dispatch(setUser(data.data.user));
    } catch (error) {
        toast.error("unable to add to cart!!");
        console.log(error);
    }
}

export const removeFromCart = async (courseId, token) => {
    try {
        const { data } = await axios.put(REMOVE_CART, { courseId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        toast.success("course removed from cart");
        dispatch(removeFromCart(courseId));
        dispatch(setUser(data.data));
    } catch (error) {
        toast.error("unable to Remove from cart!!");
        console.log(error);
    }
}
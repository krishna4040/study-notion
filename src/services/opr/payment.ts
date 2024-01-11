import axios from 'axios';
import toast from 'react-hot-toast';
import { courseEndpoints } from '@/services/api'
import { resetCart } from '@/lib/feature/cartSlice';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const { COURSE_PAYMENT_API } = courseEndpoints;

const loadScript = (src: string) => {
    return new Promise(resolve => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    })
}

const sendPaymentSuccessfulEmail = async (paymentRes, token: string) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, amount } = paymentRes;
        const res = await axios.post('', {
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            amount
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error: any) {
        toast.error(error.message);
        console.log(error);
    }
}

const verifyPayment = async (data, token: string, router: AppRouterInstance, dispatch) => {
    try {
        const res = await axios.post('', data, {
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
}

export const buyCourse = async (courses: string[], token: string) => {
    const toastId = toast.loading('loading...');
    try {
        const res = await loadScript("");
        if (!res) {
            throw new Error('Razorpay script unable to load');
        }
        const paymentRes = await axios.post(COURSE_PAYMENT_API, { courses }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const options = {}
        const paymentWindow = new window.Razorpay(options);
        paymentWindow.open();
        paymentWindow.on("payment.failed", () => {
            toast.error("oops!! payment failed");
        })

    } catch (error: any) {
        console.log(error);
        toast.error(error.message);
    }
    toast.dismiss(toastId)
}
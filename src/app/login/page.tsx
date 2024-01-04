import student from '@/assets/Images/login.webp'
import instructor from '@/assets/Images/new.svg'
import Template from '@/components/core/Auth/Template'

export default function Login() {
    return (
        <Template
            title="Welcome Back"
            desc1="Build skills for today , tommorow , and beyond."
            desc2="Education to future-proof your carrer."
            formType="login"
            instructorimg={instructor}
            studentimg={student}
        />
    )
}
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

interface props {
    text: string;
    active: boolean;
    linkto: string,
    arrow?: boolean;
}

const Button: React.FunctionComponent<props> = ({ text, active, linkto, arrow }) => {
    return (
        <Link href={linkto}>
            <button className={`flex shadow-[-2px_-2px_0px_0px_inset] gap-2 items-center justify-center text-center text-sm px-6 py-3 rounded font-bold hover:scale-95 transition-all duration-200 ${active ? 'bg-yellow-50 text-black shadow-[#FFFFFF82]' : 'bg-richblack-800 shadow-[#FFFFFF2E]'}`}>
                {text}
                {arrow ? <FaArrowRight /> : ''}
            </button>
        </Link>
    )
}

export default Button
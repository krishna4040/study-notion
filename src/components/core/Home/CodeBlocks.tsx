'use client'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'
import Button from './Button'
import HighLightText from './HighLightText'

interface button {
    text: string;
    active: boolean;
    linkto: string,
    arrow?: boolean;
}

interface props {
    position: string;
    heading: string;
    highlight: string;
    subheading: string;
    btn1: button;
    btn2: button;
    codeBlock: string;
    backgroundGradient: JSX.Element;
    codeColor: string;
}

export default function CodeBlocks({ position, heading, highlight, subheading, btn1, btn2, codeBlock, backgroundGradient, codeColor }: props): JSX.Element {
    return (
        <div className={`flex ${position} my-20 justify-between gap-10`}>

            {/* section1 */}
            <div className='flex flex-col w-full gap-8 lg:w-1/2'>

                <div className='text-4xl font-semibold'>
                    {heading}
                    <HighLightText text={highlight} />
                </div>

                {subheading}

                <div className='flex gap-7 mt-7'>

                    <Button active={btn1.active} linkto={btn1.linkto} text={btn1.text} arrow={btn1.arrow} />

                    <Button active={btn2.active} linkto={btn2.linkto} text={btn2.text} arrow={btn2.arrow} />

                </div>

            </div>

            {/* section2 */}
            <div className='flex w-full py-4 text-xs h-fit lg:w-[470px] code-border relative'>

                {backgroundGradient}

                <div className='text-center flex select-none flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                <div className={`w-[90%] flex text-richblack-400 gap-2 font-bold font-mono ${codeColor} pr-2`}>

                    <TypeAnimation
                        sequence={[codeBlock, 2000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        style={{
                            whiteSpace: 'pre-line',
                            display: 'block'
                        }}
                        omitDeletionAnimation={true}
                    />

                </div>

            </div>

        </div>
    )
}
/* eslint-disable no-unused-vars */

import CTAButton from "./Button"
import {ArrowRightFromLine} from "lucide-react"
import { TypeAnimation } from 'react-type-animation';
/* eslint-disable react/prop-types */
const CodeBlocks=({
    position,heading,subheading,ctab1,ctab2,codeblock,bggradient,codeColor
})=>{
    return (
        <>
        <div className={`flex ${position} my-20 justify-between gap-10`}>
            {/* {section 1} */}
            <div className="w-[50%] flex flex-col gap-8">
                {heading}
                <div className="text-rich-black-300 font-bold">
                    {subheading}
                </div>
                <div className="flex gap-7 mt-7">
                    <CTAButton active={ctab1.active} linkto={ctab1.linkto} >
                        <div className="flex gap-2 items-center">
                            {ctab1.text}
                            <ArrowRightFromLine/>

                        </div>

                    </CTAButton>
                    <CTAButton active={ctab2.active} linkto={ctab2.linkto} >
                        <div className="flex gap-2 items-center">
                            {ctab2.text}
                            <ArrowRightFromLine/>

                        </div>

                    </CTAButton>
                </div>

            </div>
            {/* section 2 */}
            <div className="h-fit flex flex-row text-10[px] w-[100%]  py-4 lg:w-[500px]">
                
                {/* gradient 2 */}
                <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
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
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
        {/* TypeAnimation for animated code display */}
        <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={false}
            style={
                {
                    whiteSpace:"pre-line",
                    display:"block",
                }
            }
        />
    </div>


            </div>


        </div>

        </>
    )
}
export default CodeBlocks
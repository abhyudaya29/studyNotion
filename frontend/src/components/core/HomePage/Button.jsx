/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
const CTAButton=({children,active,linkto})=>{
    return (
        <>
        <div>
            <Link to={linkto}>
                <button className={`text-center text-[13px] px-6 py-3 rounded-md font-bold
                ${active?"bg-yellow-50 text-black":"bg-richblack-800"}
                hover:scale-95 translate-all duration-95 
                
                `}>
                    {children}
                </button>
            </Link>
        </div>
        </>
    )
}
export  default CTAButton;
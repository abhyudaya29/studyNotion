/* eslint-disable no-unused-vars */

import { Link, matchPath } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { useLocation } from 'react-router-dom'
import { CiShoppingCart } from "react-icons/ci";
// import { matchPath } from 'react-router-dom'; // Make sure the import is correct.
import { useSelector } from 'react-redux'
import ProfileDropdown from '../core/Auth/ProfileDropdown';
import { useEffect, useState } from 'react';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import { FaRegArrowAltCircleDown } from "react-icons/fa";
const NavBar = () => {
    const{token}=useSelector((state)=>state.auth);
    const{user}=useSelector((state)=>state.profile);
    const{totalItems}=useSelector((state)=>state.cart);
    const location=useLocation()
    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname)
    }
    const [subLinks,setSubLinks]=useState([])
    const dummy=[
        {
            subContent:"Python",

        },
        {
            subContent:"Web Dev",
        }
    ]
    const fetchSublinks=async()=>{
        try {
            const result=await apiConnector("GET",categories.CATEGORIES_API);
            setSubLinks(result.data.data);
            console.log(result.data.data,">>>result Category")
            
        } catch (error) {
            console.log(error,">>error while fetching categorylist")
            
        }
    }
    useEffect(()=>{
        fetchSublinks();

    },[])

  return (
    <>
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between '>
            <Link to="/">
                <img src={logo} width={160} height={32} loading='lazy' alt="Logo" />
            </Link>
            {/* nav links */}
            <nav className=''>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((navItems,index)=>{
                            return (
                                <>
                                <div key={index}>
                                    <li>
                                        {
                                            navItems.title==="Catalog"?(
                                            <div className='relative flex items-center gap-2 group'>
                                                <Link to={navItems.path}>
                                                <p>{navItems.title}</p>
                                                </Link>
                                                <FaRegArrowAltCircleDown />
                                                <div className='invisible absolute left-[50%] top-[50%] 
                                                translate-x-[-50%] translate-y-[80%]
                                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                                opacity-0 transition-all duration-200 group-hover:visible
                                                group-hover:opacity-100 lg:w-[300px]
                                                '>
                                                    <div className='absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded bg-richblack-5 translate-x-[80%] translate-y-[-45%]'></div>
                                                        {
                                                            subLinks.length?(
                                                                
                                                                    subLinks.map((items,index)=>{
                                                                        return (
                                                                            <>
                                                                            <p key={index}>{items.name}</p>
                                                                            </>
                                                                        )
                                                                    })
                                                                
                                                            ):(
                                                                <>
                                                                <div>
                                                                </div>
                                                                </>
                                                            )
                                                        }

                                                    

                                                </div>


                                            </div>):(
                                                <Link to={navItems.path}>
                                                    <p className={`${matchRoute(navItems.path)?"text-yellow-25":"text-richblack-25"}`}>
                                                    {navItems.title}
                                                    </p>
                                                </Link>
                                            )
                                        }
                                    </li>
                                </div>
                                </>
                            )
                        })
                    }

                </ul>
            </nav>
            {/* Login/signup/dashbord */} 
            <div className='flex gap-x-4 items-center'>
                {
                    user&&user?.accountType!="Instructor" &&(
                        <>
                        <Link to="/dashboard/cart" className='relative'>
                        <CiShoppingCart />
                        {
                            totalItems>0&& (
                                <>
                                <span>
                                    {totalItems}
                                </span>
                                </>
                            )
                        }

                        </Link>
                        </>
                    ) 
                }
                {
                    token===null&&(
                        <>
                        <Link to="/login">
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                Log In
                            </button>
                        </Link>
                        </>
                    )

                }
                {
                    token ===null&&(
                        <>
                        <Link to="/signup">
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                Sign-Up
                            </button>
                        </Link>
                        </>
                    )
                }
                {
                    token!=null&&(
                        <>
                        <ProfileDropdown/>
                        </>
                    )
                }


            </div>

        </div>

    </div>
    </>
  )
}

export default NavBar
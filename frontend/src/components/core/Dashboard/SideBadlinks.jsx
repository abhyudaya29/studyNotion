/* eslint-disable react/prop-types */

import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux";
import { NavLink, matchRoutes, useLocation } from 'react-router-dom';
const SideBadlinks = ({links,iconName}) => {
    const Icon=Icons[iconName];
    const location=useLocation();
    const dispatch=useDispatch();
    const matchRoute=(route)=>{
        return matchRoute({path:route},location.pathname)
    }
  return (
    <NavLink
    to={links.path}
    className={` relative px-8 py-2 text-sm ${matchRoute(links.path)?"bg-yellow-800":"bg-opacity-0"}`}
    
    >
        <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(links.path)?"opacity-100":"opacity-0"}`}></span>
        <div className="flex items-center gap-x-2">
            <Icon className="text-lg"/>
            <span>{links.name}</span>

        </div>


    </NavLink>
  )
}

export default SideBadlinks
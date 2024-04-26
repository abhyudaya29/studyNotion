import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom";
import SideBar from "../components/core/Dashboard/SideBar";
import {BounceLoader} from "react-spinners"
import {PulseLoader} from "react-spinners"
const Dashboard = () => {
    const{loading:authLoading}=useSelector((state)=>state.auth);
    const{loading:profileLoading}=useSelector((state)=>state.profile);
    if(profileLoading || authLoading){
        return (
            <>
            <div className="mt-[200px] text-white flex flex-col gap-2 justify-center items-center ">
            <BounceLoader color="hsla(248, 67%, 53%, 1)"/>
            <p >
               <BounceLoader color="hsla(248, 67%, 53%, 1)"/> <span><PulseLoader color="#36d7b7" size="10" /></span>
            </p>
            </div>
            </>
        )
    }
  return (
    <>
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <SideBar/>
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
            <div className="mx-auto w-11/12 max-w-[1000px] py-10">
            <Outlet/>
            </div>

        </div>

    </div>
    </>
  )
}

export default Dashboard
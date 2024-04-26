/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
import { useDispatch, useSelector } from "react-redux";
import { sidebarLinks } from "../../../data/dashboard-links";
import SideBadlinks from "./SideBadlinks";
import { VscGear } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logOut } from "../../../services/operations/auth";
import { VscSignOut } from "react-icons/vsc";
import { BounceLoader } from "react-spinners";
const SideBar = () => {
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const[conformationModal,setConformationModal]=useState(null);

    if (profileLoading || authLoading) {
        return (
            <div className="mt-10"><BounceLoader color="hsla(248, 67%, 53%, 1)"/></div>
        );
    }

    return (
        <div>
            <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
                <div className="flex flex-col">
                    {sidebarLinks.map((link) => {
                        if (link.type && user?.accountType !== link.type) return null;
                        return (
                            <div>
                                <SideBadlinks key={link.id} link={link} iconName={link.icon} />
                            </div>
                        );
                    })}
                </div>
                <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700">

                </div>
                <div className="flex flex-col">
                    <SideBadlinks
                    link={{name:"Seetings",path:"dashboard/seetings"}}
                    iconName="VscGear" 
                    />
                <button onClick={() => {
                setConformationModal({
                    text1: "Are you Sure?",
                    text2: "You will be Logged out of your account",
                    btn1Text: "Logout",
                    btn2Text: "Cancel",
                    btn1Handler: () => dispatch(logOut(navigate)),
                    btn2Handler: () => setConformationModal(null)
                });
            }} className="px-8 py-2 text-sm font-medium text-richblack-300">
                <div className="flex items-center gap-x-2">
                <VscSignOut  className="text-lg"/>
                <span>Logout</span>

                </div>
            </button>


                </div>
            </div>
            {conformationModal&& <conformationModal modalData={conformationModal} />}
        </div>
    );
};

export default SideBar;

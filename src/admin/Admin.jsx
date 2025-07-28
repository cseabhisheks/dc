import { useState } from "react"
import { MdOutlineClose, MdOutlineMenu } from "react-icons/md";
import { BrowserRouter, NavLink, Outlet } from "react-router-dom";
export default function Admin() {

    const [isMenubar, setMenubar] = useState(true)

    const adminMenu = [
  
        { title: 'Manage Gallery', link: '' },
        { title: 'Manage Project', link: 'manage-project' },

    ]
    return (<>
        <section className="w-full  h-[calc(100vh-40px)] ">
            <div onClick={() => setMenubar(!isMenubar)} className="relative top-0 flex items-center bg-primary  h-[40px] px-10 ">{<MdOutlineMenu className="text-text-primary text-3xl " />}</div>
            <div className="relative flex w-full h-full">
                {/* admin navabar */}
                {
                    isMenubar && (
                        <div className=" absolute md:static bg-primary text-text-primary  w-40 h-full flex flex-col justify-evenly items-center z-[1]">
                            <h1 className="text-xl font-semibold tracking-[1px]">
                                <NavLink to="">Admin Panel</NavLink>
                            </h1>
                            <ul className=" text-center capitalize  h-[80%]  flex flex-col justify-evenly">
                                {
                                    adminMenu.map((item, index) => (
                                        <li key={index} ><NavLink to={item.link} end className={ (({isActive})=>isActive?'bg-yellow-800 p-2 rounded-xl text-white':'')} >{item.title}</NavLink></li>
                                    ))
                                }
                            </ul>
                        </div>
                    )
                }
                {/* admin pages */}
                <div className=" h-full grow w-full bg-gray-700 p-5 md:p-10  ">
                    <div className="border-2 h-full rounded-xl overflow-scroll ">
                        <div className="bg-primary h-12 w-full "></div>
                        <div className="bg-yellow-300 h-full p-5 md:p-10">
                            {/* link to pe open here path is given above */}
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>

        </section>
    </>)
}
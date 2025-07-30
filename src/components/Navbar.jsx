
import { MdOutlineClose, MdOutlineMenu } from "react-icons/md";
import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { navData } from '../componentsData/navbar'
export default function Navbar() {
    const [isMenuClicked, setMenuClicked] = useState(false)
    const handleMenuBar = () => {
        setMenuClicked(!isMenuClicked);
    }
    const navigate = useNavigate()

    return (<>

        <nav className=" px-10 flex sticky top-0 w-full z-10 bg-primary text-text-primary  justify-between h-12 items-center text-base">
            {/* text color  and bg and px-10 */}
            <NavLink to=''>
                <h1>Abhishek Construction</h1>
            </NavLink>
            <ul className="hidden md:flex gap-4 ">
                {navData.map((item, index) => (

                    <li key={item.title}>
                        <NavLink
                            className={(({ isActive }) =>
                                isActive ? "border-b-2 border-text-primary text-yellow-100" : "hover:text-yellow-100")}
                            to={item.link}>
                            {item.title}
                        </NavLink>
                    </li>

                ))}
            </ul>
            <div className="md:hidden" onClick={handleMenuBar}>
                {isMenuClicked ? <MdOutlineClose /> : <MdOutlineMenu />}
            </div>

            {isMenuClicked && (
                <ul className="left-0 absolute top-12 w-full gap-8 py-5 bg-gray-800 text-text-primary backdrop-blur-[7px] flex flex-col items-center">
                    {navData.map((item, index) => (
                        <li onClick={handleMenuBar} key={index}><NavLink to={item.link}>{item.title}</NavLink></li>
                    ))}
                </ul>
            )}

        </nav>
    </>)

}
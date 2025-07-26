import { NavLink } from "react-router-dom"
import {companyData,footerData} from '../componentsData/footer'
export default function Footer() {

    // add companydata with link
    return (<>

        <footer className='  px-10 py-10 bg-primary text-text-primary  min-h-[400px]  flex flex-col justify-between gap-2 w-full '>
            {/* text color and bg and px-10 */}
            <div className="grid md:grid-cols-4   gap-4 min-h-[300px] ">
                <div className=' min-h-[100px] flex flex-col items-center justify-center'>
                    <h1 className="text-white text-xl">Dilip Construction</h1>
                    <h2 className="text-sm">Premium False Ceiling Contractor</h2>
                </div>

                {

                    footerData.map((data, index) => (
                        <div key={index} className=' flex flex-col md:justify-center md:flex-wrap content-center   max-w-[200px] '>
                            <h1 className="text-white text-base" key={index} >{data.title}</h1>
                            <ul>
                                {data.item.map((li, idx) => (
                                    <li className="text-sm list-disc" key={idx}>{
                                        typeof (li) === 'string' ? li : <NavLink to={li.link} className="hover:underline">{li.title}</NavLink>
                                    }
                                    </li>
                                ))}
                            </ul>
                        </div >
                    )) }

            </div>
            <div className=' text-xs f flex flex-col md:flex-row justify-between items-center'>
                <span>Copyright :@2025.Dilip Construction.All rights reserved</span>
                <span>Website Design and Developyment by DevMagnets</span>
            </div>
        </footer >
    </>)
}
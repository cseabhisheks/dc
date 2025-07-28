
import { MdOutlineClose } from "react-icons/md";
import { useState, useEffect } from 'react'
export default function Project() {
    const [isVideoSelected, setVideoSelected] = useState(false)
    const [data, setData] = useState('')
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res=await fetch(`${import.meta.env.VITE_BACKEND_LINK}/manage-project/fetch`)
                if(res.ok){
                    const data=await res.json()
                    setProjects(data.project )
                }
            } catch (err) {
                console.log(err)
            }
        }


        fetchProject()
    }, [])


    const handleVideo = (item) => {
        setVideoSelected(!isVideoSelected)
        setData(item)
    }
    
    return (<>
        <section>
            <div className='relative '>        {/* img */}
                <img src="home.jpg" alt="" className="h-[30vh] md:h-[70vh] object-cover object-center w-full " />

                {/* project video */}
                <div className="min-h-[30vh] bg-text-primary py-10 px-10 ">
                    <h1 className="text-xl font-semibold text-center">Recent Projects</h1>
                    <div className="mt-[12px]  w-full min-h-[200px] items-center p-2 flex text-center text-sm font-medium text-gray-700 overflow-x-scroll gap-[12px]">
                        {
                            projects.map((item, index) => (
                                <div key={index}
                                    onClick={() => { handleVideo(item) }}
                                    className=" bg-primary rounded-xl  text-white  p-2 w-[200px] md:w-[300px] h-[250px]  flex flex-shrink-0  flex-col justify-center gap-[12px]">
                                    <video className="w-full h-full object-cover rounded-xl" src={item.video} controls autoPlay loop muted></video>
                                    <p>{item.siteLocation}</p>
                                    <span className="text-xs text-blue-200 underline cursor-pointer">tap to see </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {
                    isVideoSelected && (
                        <div className=' fixed inset-0 m-auto w-[80%]  h-[60%] border-2 border-gray-900 bg-primary/45 backdrop-blur-[12px] rounded-2xl overflow-hidden '>
                            <span onClick={handleVideo} className='absolute top-[1%] right-[1%] text-xl p-2 text-white'><MdOutlineClose /></span>
                            <div className="flex flex-col justify-center gap-[12px] items-center  h-full">
                                <video src={data.video} controls className="w-[80%] h-[80%] object-cover "></video>
                                <p className="text-xl text-white">{data.title}</p>

                            </div>
                        </div>
                    )
                }
            </div>



        </section>
    </>)
}
import { step, falseCeilingProcess, falseCeilingHighlights } from '../pagesData/processData.JS'

export default function Process() {


    return (<>
        <section>
            {/* process img */}
            <img src="home.jpg" alt="" className="h-[30vh] md:h-[70vh] object-cover object-center w-full" />

            {/* process step */}
            <div className="bg-text-primary min-h-[30vh] px-10 py-10 text-center flex flex-col gap-[12px]">
                <h1 className='text-xl font-semibold'>Your Dream Ceiling in 5 Creative Steps</h1>
                <p className="">Here's how we bring your dream ceiling to life—one imaginative step at a time:</p>
                <div className="grid grid-cols-2 md:grid-cols-6  h-[70%] gap-[12px]">
                    {
                        step.map((item, index) => (
                            <div key={index} className="border-gray-700 bg-primary text-white border-2 p-2">
                                <img src="home.jpg" alt="" className="font-bold min-w-[80px] w-[30%] aspect-square m-auto mb-5" />
                                <h1 className="text-sm">{item.title}</h1>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* process detail */}
            <div className="min-h-[70vh] bg-yellow-300  flex flex-col-reverse md:grid md:grid-cols-2 gap-[12px] px-10 py-10">
                <div className="border-2 border-dotted border-gray-900 p-2">
                    {
                        falseCeilingProcess.map((item, index) => (
                            <div key={index} className=" mb-[12px] px-5 border-b-[1px] p-3 border-black hover:bg-black/45 hover:border-black hover:border-2  ">
                                <div className=" flex gap-[12px] items-center">
                                    <img src="home.jpg" alt="" className="w-[20px] h-[20px]" />
                                    <h1 className="text-xl    font-semibold">{item.title}</h1>
                                </div>
                                <p className="text-gray-900 mt-2">{item.description}</p>
                            </div>
                        ))
                    }
                </div>
                <div className=" flex flex-col gap-[12px]" >
                    <img src="home.jpg" alt="" className="h-[50%] w-full object-cover rounded-xl" />
                    {
                        falseCeilingHighlights.map((item, index) => (
                            <div key={index} className="">
                                <h1 className="text-xl  font-semibold">{item.title}</h1>
                                <p className="text-gray-900">{item.description}</p>
                            </div>
                        ))
                    }
                </div>
            </div>


        </section>
    </>)
}
import {processSteps,reviews,expertData,homeData} from '../pagesData/HomeData'
import { useState } from 'react'
export default function Home() {
  
    const formStructure = { name: '', email: '', phoneNo: '', message: '' }
    const [formData, setFormData] = useState(formStructure)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => {
            return { ...prev, [name]: value }
        })
    }
    const [sendingStatus, setSendingStatus] = useState(false)
    const sendMail = async (e) => {
        setSendingStatus(true)
        e.preventDefault();

        try {
            const response = await fetch(import.meta.env.VITE_MAIL_LINK, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                // Handle non-200 errors
                const errorText = await response.text();
                console.error("Server error route error:", errorText);
                alert("Something went wrong on the server.");
                return;
            }

            const data = await response.json();
            console.log("Response:", data);
            alert(data.message || "Mail sent successfully!");
        } catch (error) {
            console.error("Fetch error port error:", error.message);
            alert("Failed to send. Please check the server connection or console for details.");
        }
        finally {
            setSendingStatus(false); // Re-enable button
        }
    };


    // px 10 is used 
    return (<>
        <section>
            {/* home image */}
            <img src="home.jpg" className="h-[30vh] md:h-[70vh] object-cover object-center w-full" alt="" />

            {/* home data page */}
            <div className="py-2 px-7 min-h-[80px]  bg-text-primary grid grid-cols-2 md:grid-cols-4 gap-[10px] items-center ">
                {
                    homeData.map((item, index) => (
                        <div key={index} className=" text-xs font-bold text-black rounded-lg border-2 min-h-[80%] p-[4px] border-gray-700 flex items-center gap-[10px] ">
                            <img src="home.jpg" className="rounded-lg min-w-[40px] w-[15%] aspect-square  " alt="" />
                            <div className="flex flex-col ">
                                <span>{item.stats}</span>
                                <span>{item.title}</span>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* our expertise section */}
            <div className="py-5 px-7 bg-yellow-300 text-center text-2xl ">

                <h1 className="mb-4 font-semibold">Our Expertise</h1>
                <div className=" min-h-[200px]  grid grid-cols-2 md:grid-cols-4 gap-4">

                    {expertData.map((item, index) => (
                        <div key={index} className="relative overflow-hidden px-1  border-gray-700 rounded-lg border-[2px]  h-[150px] flex flex-col items-center justify-center gap-[12px]">
                            <div className="absolute top-0 w-full border-t-[6px] rounded-xl border-yellow-500 "></div>
                            <img src="home.jpg" className="border-2 w-[60px] aspect-[1/1]" alt="" />
                            <span className="text-sm font-bold text-center border-b-[4px] rounded-sm border-text-primary ">{item.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* contact form section */}
            <div className="py-10 px-10 bg-[url(home.jpg)]  min-h-[60vh] flex flex-col md:flex-row justify-between items-center gap-[12px]">
                <div className="py-5 px-5 md:w-[60%] h-[80%] flex  flex-col items-center justify-center gap-[12px]  ">
                    <h1 className="text-2xl font-semibold">False Ceiling Designs</h1>
                    <p className="text-4xl text-white">Elegant and functional ceilings</p>
                    <p className="text-gray-900"> enhance your space with stye, comfort, and creativity</p>
                    {/* <button type="button" className=" bg-text-primary border-black/45 border-2 px-7 py-2 rounded-2xl">Book Now</button> */}
                </div>

                <form  onSubmit={sendMail} className="rounded-2xl px-5 py-5 text-gray-300 bg-primary  w-full md:w-[30%] h-[80%] flex flex-col gap-[12px]" action="">
                    <label htmlFor="name">Name</label>
                    <input placeholder="Enter your Name" type="text" name='name' id='name' className="bg-primary border-[1px] px-3 rounded-lg h-8" onChange={handleChange} />
                    <label htmlFor="email">Email *</label>
                    <input placeholder='Enter your Email' type="email" name="email" id='email' required className="bg-primary border-[1px] px-3 rounded-lg h-8" onChange={handleChange} />
                    <label htmlFor="phoneNo">Phone No. *</label>
                    <input placeholder='Enter Phone No' type="tel" name="phoneNo" id='phoneNo' required className="bg-primary border-[1px] px-3 rounded-lg h-8 " onChange={handleChange} />
                    <label htmlFor="message">Message *</label>
                    <textarea name="message" id="message" placeholder='Message' required className="bg-primary border-[1px] px-3 rounded-lg h-16 resize-none " onChange={handleChange} ></textarea>
                    <button disabled={sendingStatus} className=' text-white ml-auto mr-auto w-[80%] bg-text-primary hover:bg-text-primary/20 border-black/45 border-2 px-7 py-2 rounded-2xl' > {sendingStatus ? "Sending..." : "Submit"}</button>
                </form>


            </div>
            {/* working process */}
            <div className="py-10 px-10 bg-gray-800 min-h-[50vh] ">
                <div className="border-2 border-gray-600 w-max p-[1px] rounded-3xl m-auto mb-4">
                    <div className="flex gap-1 items-center border-2 border-gray-600 w-max rounded-3xl p-2">
                        <img src="home.jpg" alt="a" className='w-[50px] aspext-[1/1] border-2' />
                        <h1 className=" text-sm text-center text-text-primary font-extrabold">HOW IT WORKS</h1>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-[12px] border-l-text-primary border-l-[4px] md:border-t-text-primary md:border-t-[4px] rounded-2xl md:border-l-0">
                    {
                        processSteps.map((item, index) => (
                            <div key={index} className=" relative rounded-xl border-2 p-8 min-h-[150px] text-center flex flex-col justify-center">
                                <span className='absolute top-[calc(50%-20px)] left-[-20px]  md:left-[calc(50%-20px)] md:top-[-20px] text-white border-2 w-[40px] h-[40px] p-2 rounded-[100%] bg-text-primary border-black/40 '>{item.id}</span>
                                <h1 className='font-bold text-white my-6'>{item.title}</h1>
                                <p className="text-gray-400">{item.description}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* testinomial */}
            <div className='py-10 px-10 bg-yellow-300 '>
                <h1 className="text-center text-xl mb-4 font-semibold">What Our Client Says</h1>
                <div className="flex items-center  h-[30vh] w-full gap-[12px] overflow-x-scroll overflow-y-hidden scrollbar-">
                    {reviews.map((item, index) => (
                        <div key={index} className="m-8 px-[12px]  flex  flex-col  border- justify-center  rounded-xl h-[150px] min-w-[350px] text-center bg-text-primary border-2 border-gray-700">
                            <h1 className='font-bold text-lg'>{item.name}</h1>
                            <p>{item.paragraph}</p>
                            <span>{item.star}</span>
                        </div>
                    ))}
                </div>
            </div>


        </section>
    </>)

}
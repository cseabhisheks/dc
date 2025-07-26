import { useState, useEffect } from 'react'
export default function Gallery() {
    const [img, setImg] = useState([])
    useEffect(() => {
        console.log("1")
        const fetchimg = async () => {
            try {
                const res = await fetch('http://localhost:2030/manage-gallery/fetch');
                if (res.ok) {
                    const data = await res.json();
                    setImg(data.img );
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchimg();
    }, []);

    return (<>
        <section>
            <div className="px-10  flex border-2 border-red-800 min-h-[10vh] bg-text-primary justify-between items-center">
                <h1 className="
                 text-xl font-semibold">Explore</h1>
                <input type="search" name="search" id="" placeholder="search it" className="h-[40px] w-[min(60%,500px)] p-4 rounded-3xl border-2 border-primary placeholder:text-black " />

            </div>
            <div className="px-10 py-10 min-h-[70vh] bg-yellow-500 flex flex-wrap gap-5 justify-center">
                {
                  img.length>0?  img.map((item, index) => (
                        <div key={index} className="border-2 w-[300px] h-[300px] rounded-xl overflow-hidden">
                            <img src={item.imageUrl} alt="" className='w-full h-full object-cover' />
                        </div>
                    )):'no img'
                }



            </div>
        </section>
    </>)
}
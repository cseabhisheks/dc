
import { useEffect, useState } from 'react'
export default function ManageGallery() {
  const [galleryData, setgalleryData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [modifyBox, setModifyBox] = useState(false)
  const [modifyData, setModifyData] = useState({ id: '', category: '' })
  
  const modifyfn = (item) => {
    setModifyBox(true);
    setModifyData({ id: item.id, category: item.category });
  }
  const modifychange = (e) => {
    const { name, value } = e.target;
    setModifyData((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    const fetchgalleryData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/manage-gallery/fetch`)
        if (res.ok) {
          const data = await res.json()
          setgalleryData(data.img)
        }

      } catch (err) {
        alert(err)
      }
    }
    fetchgalleryData()
  }, [refresh])

  const deleteImage = async (id) => {
    try {
      const res = await fetch(`http://localhost:2030/manage-gallery/delete${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        setRefresh(!refresh)
        alert('Image deleted Successfully')

      }
    } catch (err) {
      alert(err)
    }
  }
  const modifygallery = async (e) => {
  e.preventDefault();

  const { id, category } = modifyData
  try {
    const res = await fetch(`http://localhost:2030/manage-gallery/patch${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({category: category }) 
    })
    if (res.ok) {
      setRefresh(!refresh)
      setModifyBox(!modifyBox)
      alert('gallery modified Successfully')
    }
  } catch (err) {
    alert(err)
  }
}
  return (<>
    <form className="h-[70%] w-[100%] bg-white shadow-[1px_1px_10px_2px_black] rounded-xl border-2 text-2xl border-primary  flex flex-col justify-between items-center p-5 md:p-10 " action="http://localhost:2030/manage-gallery" method='POST' encType="multipart/form-data">
      <h1 className=" font-semibold ">Upload Images</h1>
      <input className="text-xs border-2 border-black" type="file" name="fcDesign" multiple />
      <input className="text-xs border-2 border-black p-2 rounded-xl" type="text" name="category" placeholder='category' />
      <input className="border-2 border-black rounded-3xl px-6 py-2 bg-primary text-white text-xl" type="submit" value="Upload" />
    </form>

    <div className='bg-green-200 p-5 mt-5 rounded-xl overflow-scroll'>
      <h1 className='text-xl text-center font-extrabold'>History</h1>
      <table className="mt-5 border-2 border-red-400 w-full bg-primary text-gray-300" >
        <thead>
          <tr className="border-2 h-[30px]">
            <th className="border-2 border-text-primary w-40 ">Date</th>
            <th className="border-2 border-text-primary ">Category</th>
            <th className="border-2 border-text-primary w-40">Image</th>
            <th className="border-2 border-text-primary w-40">Edit</th>
            <th className="border-2 border-text-primary w-40">Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            galleryData.map((item, index) => (
              <tr key={index} className="bg-slate-900 text-center">
                <td className="border-2 border-text-primary w-40">{item.date}</td>
                <td className="border-2 border-text-primary w-40">{item.category}</td>
                <td className="border-2 border-text-primary w-40 "><img src={item.imageUrl} className='' alt="" /></td>
                <td  onClick={() => modifyfn(item)} className="border-2 border-text-primary w-20 text-blue-500 hover:underline">Edit</td>
                <td onClick={() => { deleteImage(item.id) }} className="border-2 border-text-primary w-20 text-red-500 hover:underline cursor-pointer">delete</td>
              </tr>
            ))
          }

        </tbody>
      </table>
    </div>
      {modifyBox && (
      <form onSubmit={modifygallery} className='flex bg-green-300  flex-col  justify-evenly items-center absolute p-5 top-20 w-[70%] border-2 border-black rounded-xl  h-[300px] '>
        <h1 className='text-center text-xl font-semibold'>Modify gallery</h1>
        <label htmlFor="category" className='p-2'>
          <span>category</span>
          <input type="text" name="category" placeholder='New Address' id="category" className='pl-2 ml-2 border-2 border-black ' onChange={modifychange} />

        </label>
        <button type="submit" className='border-2 p-2 rounded-xl bg-primary text-text-primary border-gray-500 w-[50%]'>Change category</button>
      </form>
    )}
    
  </>)
}
import { useEffect, useState } from 'react'
export default function ManageProject() {
  const [refresh, setRefresh] = useState(false)
  const [modifyBox, setModifyBox] = useState(false)
  const [modifyData, setModifyData] = useState({ cid: '', siteLocation: '' })
  const [videoData, setVideoData] = useState([])

  const modifyfn = (item) => {
    setModifyBox(true);
    setModifyData({ cid: item.cid, siteLocation: item.siteLocation });
  }
  const modifychange = (e) => {
    const { name, value } = e.target;
    setModifyData((prev) => ({ ...prev, [name]: value }))
  }
  useEffect(() => {
    const fetchVideoData = async () => {
      
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/manage-project/fetch`)
        if (res.ok) {
          const data = await res.json()
          setVideoData(data.project)
        }

      } catch (err) {
        alert(err)
      }
    }
    fetchVideoData()
  }, [refresh])

  const deleteProject = async (cid) => {
    try {
      const res = await fetch(`http://localhost:2030/manage-project/delete${cid}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        setRefresh(!refresh)
        alert('project deleted Successfully')
      }
    } catch (err) {
      alert(err)
    }
  }

const modifyProject = async (e) => {
  e.preventDefault();

  const { cid, siteLocation } = modifyData
  try {
    const res = await fetch(`http://localhost:2030/manage-project/patch${cid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({siteLocation: siteLocation }) 
    })
    if (res.ok) {
      setRefresh(!refresh)
      setModifyBox(!modifyBox)
      alert('project modified Successfully')
    }
  } catch (err) {
    alert(err)
  }
}




  return (<>
    <form className="h-[70%] w-[100%] bg-white shadow-[1px_1px_10px_2px_black] rounded-xl border-2 text-2xl border-primary  flex flex-col justify-between items-center p-5 md:p-10 " action="http://localhost:2030/manage-project" method='POST' encType="multipart/form-data">
      <h1 className=" font-semibold ">Projects</h1>
      <input required className="text-xs border-2 file:rounded-xl file:hover:bg-gray-500 file:p-1 border-black  rounded-xl cursor-pointer " type="file" name="fcProject" multiple />
      <input type="text" name="siteLocation" required className="text-xs border-2 border-black p-2 rounded-xl" placeholder="address" />
      <input className="border-2 border-black rounded-3xl px-6 py-2  bg-primary text-white text-xl" type="submit" value="Upload" />
    </form>

    <div className='bg-green-200 p-5 mt-5 rounded-xl overflow-scroll'>
      <h1 className='text-xl text-center font-extrabold'>History</h1>
      <table className="mt-5 border-2 border-red-400 w-full bg-primary text-gray-300" >
        <thead>
          <tr className="border-2 h-[30px]">
            <th className="border-2 border-text-primary ">Date</th>
            <th className="border-2 border-text-primary">SiteLocation</th>
            <th className="border-2 border-text-primary">Video</th>
            <th className="border-2 border-text-primary">Modify</th>
            <th className="border-2 border-text-primary">Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            videoData.map((item, index) => (
              <tr key={index} className="bg-slate-900 text-center">
                <td className="border-2 border-text-primary">{item.Date}</td>
                <td className="border-2 border-text-primary">{item.siteLocation}</td>
                <td className="border-2 border-text-primary "><video className='w-full h-[100px]' controls src={item.video}></video></td>
                <td onClick={()=>modifyfn(item)} className="border-2 border-text-primary text-blue-500 hover:underline">Edit</td>
                <td onClick={() => { deleteProject(item.cid) }} className="border-2 border-text-primary text-red-500 hover:underline cursor-pointer">delete</td>
              </tr>
            ))
          }

        </tbody>
      </table>
    </div>

    {/* modify box open */}
    {modifyBox && (
      <form onSubmit={modifyProject} className='flex bg-green-300  flex-col  justify-evenly items-center absolute p-5 top-20 w-[70%] border-2 border-black rounded-xl  h-[300px] '>
        <h1 className='text-center text-xl font-semibold'>Modify Project</h1>
        <label htmlFor="siteLocation" className='p-2'>
          <span>SiteLocation</span>
          <input type="text" name="siteLocation" placeholder='New Address' id="siteLocation" className='pl-2 ml-2 border-2 border-black ' onChange={modifychange} />

        </label>
        <button type="submit" className='border-2 p-2 rounded-xl bg-primary text-text-primary border-gray-500 w-[50%]'>Change SiteLocation</button>
      </form>
    )}
  </>)
}
import { useState } from 'react'
export default function Login() {
    const [form, setForm] = useState({ username: '', password: '' })

    const change = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        console.log(form)
    }
    const handleForm = async (e) => {
        e.preventDefault()

            try {
                const res = await fetch('http://localhost:2030/login-admin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                })
                if (res.ok) {
                    const m = await res.json()
                    console.log(m)
    
                }
            }
            catch (err) {
                alert(err)
            }
        
        
    }
    return (<>
       <div className="bg-gray-600  h-[100vh] ">

         <div className="bg-primary text-text-primary w-full h-12  text-center flex items-center justify-center text-xl font-semibold tracking-wider border-b-red-500 border-b-2">
            <span >Dilip Construction</span>
        </div>
        <div className="flex  justify-center bg-gray-700 p-5">
            <form onSubmit={handleForm} className="mt-5 bg-white w-full md:w-[50%] min-h-[40%] rounded-xl p-5 flex flex-col border-2 border-black items-center justify-between gap-3" >
                <label htmlFor="username">
                    <span>Username</span>
                    <br />
                    <input required onChange={change} type="text" name="username" placeholder="Enter Username" id="username" className=" border-2 border-black pl-2 rounded-xl" />
                </label>
                <label htmlFor="password">
                    <span> Password</span>
                    <br />
                    <input required onChange={change} type="password" name="password" placeholder='Enter Password' id="password" className=" border-2 border-black pl-2 rounded-xl" />
                </label>
                <button type="submit" className="border-2 border-gray-800 rounded-xl px-8 py-1 bg-yellow-400 text-gray-800 ">Login</button>
             

            </form>
        </div>
       </div>
    </>)
}
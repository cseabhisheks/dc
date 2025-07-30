import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Login({ setIsLoggedIn }) {
    const [form, setForm] = useState({ un: '', pd: '' })
    const navigate = useNavigate()
    const change = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }
    const submit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form),
                credentials: 'include'  // it is must to store session in cookies
            })
            if (res.ok) {
                const login = await res.json()
                console.log(login)
                if (login.login === true) {
                    localStorage.setItem('loggedIn', 'true'); // ✅ set here only
                    setIsLoggedIn(true);
                    navigate('/admin/manage-gallery');
                }
                else {
                    localStorage.setItem('loggedIn', 'false'); // ✅ set here only
                    setIsLoggedIn(false);
                    navigate('/login');
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (<>
        <div className="bg-gray-600  h-[100vh] ">

            <div className="bg-primary text-text-primary w-full h-12  text-center flex items-center justify-center text-xl font-semibold tracking-wider border-b-red-500 border-b-2">
                <span >Abhishek Construction</span>
            </div>
            <div className="flex  justify-center bg-gray-700 p-5">
                <form onSubmit={submit} className="mt-5 bg-white w-full md:w-[50%] min-h-[40%] rounded-xl p-5 flex flex-col border-2 border-black items-center justify-between gap-3" >
                    <label htmlFor="username">
                        <span>Username</span>
                        <br />
                        <input required onChange={change} type="text" name="un" placeholder="Enter Username" id="username" className=" border-2 border-black pl-2 rounded-xl" />
                    </label>
                    <label htmlFor="password">
                        <span> Password</span>
                        <br />
                        <input required onChange={change} type="password" name="pd" placeholder='Enter Password' id="password" className=" border-2 border-black pl-2 rounded-xl" />
                    </label>
                    <button type="submit" className="border-2 border-gray-800 rounded-xl px-8 py-1 bg-yellow-400 text-gray-800 ">Login</button>


                </form>
            </div>
        </div>
    </>)
}
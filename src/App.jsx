import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Gallery from './pages/Gallery.jsx'
import Process from './pages/Process.jsx'
import Project from './pages/Project.jsx'
import Admin from './admin/Admin.jsx'


import ManageGallery from './admin/ManageGallery.jsx'
import ManageProject from './admin/ManageProject.jsx'
import Login from './admin/authentication/Login.jsx'

import { BrowserRouter, Route, Routes, Outlet, useNavigate } from 'react-router-dom'

function PublicLayout() {
  const navigate = useNavigate();
  return (<>
    <button className='border-b-2 border-b-blue-600 w-full text-xs text-red-800 font-extrabold tracking-wide bg-slate-500' onClick={() => navigate('/admin')}>Go To Developer Mode</button>
    <Navbar />
    <Outlet />
    <Footer />
  </>)

}
function AdminLayout() {
  const navigate = useNavigate();
  return (<>
    <button className='border-b-2 border-b-blue-600  w-full text-xs  text-red-800 font-extrabold tracking-wide bg-slate-500' onClick={() => navigate('/')}>Go To Reading Mode</button>
    <Admin />
  </>)

}
export default function App() {

  return (<>
    <BrowserRouter>

      <Routes>

        <Route path='/login' element={<Login />} />


        <Route path='/admin' element={<AdminLayout />} >
          <Route path='' element={<ManageGallery />} />
          <Route path='manage-project' element={<ManageProject />} />
        </Route>

        <Route path='/' element={<PublicLayout />}>
          <Route path='' element={<Home />} />
          <Route path='process' element={<Process />} />
          <Route path='projects' element={<Project />} />
          <Route path='gallery' element={<Gallery />} />
        </Route>
        
      </Routes>

    </BrowserRouter>
  </>)
}
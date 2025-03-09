import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {

  const authState = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  }

  const handleLogoutClick = () => {
    dispatch(logout());
  }

  return (
    <>
      <header className="flex justify-between items-center sticky top-0 p-3 bg-white shadow-sm ">
      <h2 className="cursor-pointer font-medium text-2xl tracking-wide text-gray-800 hover:text-gray-500 transition-colors duration-300">
      <Link to="/">Wee</Link>
      </h2>

      <ul className='hidden md:flex gap-4 font-medium'>
          {authState.isLoggedIn ? (
            <>
             <li className="py-2 px-3 cursor-pointer hover:bg-gray-200 transition rounded-sm">
                <Link to='/tasks/add' className='block w-auto text-left px-2 py-1'>
                    Create
                </Link>
              </li> 

              <div className="flex items-center space-x-2">
                <input
                type="text"
                placeholder="Search tasks"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 w-[300px]"
                />
              </div>

              <li className="py-2 px-3 cursor-pointer hover:bg-gray-200 transition rounded-sm"  onClick={handleLogoutClick}>Logout</li>
            </>

          ) : (
            <li className="py-2 px-3 cursor-pointer hover:bg-gray-200 transition rounded-sm"><Link to="/login">Login</Link></li>
          )}

<span className="text-2xl cursor-pointer text-gray-700 hover:text-gray-500">
      <i className="fa-solid fa-bell"></i>
    </span>

    {/* Account Circle Icon */}
    <span className="text-2xl cursor-pointer text-gray-700 hover:text-gray-500">
      <i className="fa-solid fa-user-circle"></i>
    </span>
        </ul>
    

        <span className='md:hidden cursor-pointer' onClick={toggleNavbar}><i className="fa-solid fa-bars"></i></span>

        <div className={`absolute md:hidden right-0 top-0 bottom-0 transition ${(isNavbarOpen === true) ? 'translate-x-0' : 'translate-x-full'} bg-gray-100 shadow-md w-screen sm:w-9/12 h-screen`}>
          <div className='flex'>
            <span className='m-4 ml-auto cursor-pointer' onClick={toggleNavbar}><i className="fa-solid fa-xmark"></i></span>
          </div>
          <ul className='flex flex-col gap-4 uppercase font-medium text-center'>
            {authState.isLoggedIn ? (
              <>
                <li className="bg-blue-500 text-white hover:bg-blue-600 font-medium transition py-2 px-3">
                  <Link to='/tasks/add' className='block w-full h-full'> <i className="fa-solid fa-plus"></i> Add task </Link>
                </li>
                <li className='py-2 px-3 cursor-pointer hover:bg-gray-200 transition rounded-sm' onClick={handleLogoutClick}>Logout</li>
              </>
            ) : (
              <li className='py-2 px-3 cursor-pointer text-primary hover:bg-gray-200 transition rounded-sm'><Link to="/login">Login</Link></li>
            )}
          </ul>
        </div>
      </header>
    </>
  )
}

export default Navbar
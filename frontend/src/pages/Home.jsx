import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';

const Home = () => {

  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = authState.isLoggedIn ? `${authState.user.name}'s tasks` : "Task Manager";
  }, [authState]);

  return (
    <>
      <MainLayout>
        {!isLoggedIn ? (
          <div className="bg-primary text-white w-full h-full py-8 text-center bg-cover bg-center" style={{ backgroundImage: "url('/DeWatermark.ai_1741362733650.png')" }}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h1 className="text-5xl font-bold">Welcome to Project Manager</h1>
            <Link to="/signup" className="mt-10 text-2xl  block space-x-2 hover:space-x-4">
              <span className="transition-[margin]">Join now to manage your projects</span>
              <span className="relative ml-4 text-base transition-[margin]">
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </Link>
          </div>
        ) : (
          <>
            <h1 className='text-lg mt-8 mx-8 border-b border-b-gray-300'>Welcome {authState.user.name}</h1>
            <Tasks />
          </>
        )}

      </MainLayout>
    </>
  );
}

export default Home;

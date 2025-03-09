import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validateManyFields from '../validations';
import Input from './utils/Input';
import { useDispatch, useSelector } from "react-redux";
import { postLoginData } from '../redux/actions/authActions';
import Loader from './utils/Loader';

const LoginForm = ({ redirectUrl }) => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const authState = useSelector(state => state.authReducer);
  const { loading, isLoggedIn } = authState;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectUrl || "/");
    }
  }, [authState, redirectUrl, isLoggedIn, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateManyFields("login", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }
    dispatch(postLoginData(formData.email, formData.password));
  };

  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  );

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen">
      
      {/* Left Side: Image */}
      <div className="hidden lg:block w-1/2">
        <img src="vecteezy_people-team-meeting-at-office_.jpg" alt="A descriptive "className="w-full h-screen aspect-auto object-cover"/>
      </div>

      {/* Right Side: Login Form */}
      <form className='w-10 lg:w-1/3 p-8  mx-auto'>
        {loading ? (
          <Loader />
        ) : (
          <>
          <h6 className='text-left mb-2  font-serif text-gray-600'>Start where you left</h6>
            <h2 className='text-left mb-2  font-sans text-3xl font-bold'>Good to see you Back</h2>
            <br></br>
            <div className="mb-2">
              {/*<label htmlFor="email" className="block text-gray-700">Email</label>*/}
              <Input type="text" name="email" id="email" value={formData.email}  placeholder="youremail@domain.com" onChange={handleChange}/>
              {fieldError("email")}
            </div>
            <br></br>
            <div className="mb-2">
              {/*<label htmlFor="password" className="block text-gray-700">Password</label>*/}
              <Input type="password" name="password" id="password" value={formData.password} placeholder="Your password..." onChange={handleChange}/>
              {fieldError("password")}
            </div>
            <br></br>
            <button
              className='bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark w-full'onClick={handleSubmit}>Login</button>

            <div className='pt-4'>
              <Link to="/signup" className='text-blue-400'>
                Don't have an account? Sign up here
              </Link>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default LoginForm;

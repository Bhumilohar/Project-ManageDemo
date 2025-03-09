import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import validateManyFields from '../validations';
import Input from './utils/Input';
import Loader from './utils/Loader';

const SignupForm = () => {

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [fetchData, { loading }] = useFetch();
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("signup", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    const config = { url: "/auth/signup", method: "post", data: formData };
    fetchData(config).then(() => {
      navigate("/login");
    });

  }

  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between my-1">
      
      {/* Left Side: Registration Form */}
      <form className='w-10 lg:w-1/3 p-8  mx-auto'>
        {loading ? (
          <Loader />
        ) : (
          <>
             <h6 className='text-left mb-2  font-serif text-gray-600'>Start your journey</h6>
            <h2 className='text-left mb-2  font-sans text-3xl font-bold'>SignUp To Wee</h2>
            <br></br>
            <div className="mb-2">
              {/*<label htmlFor="name" className="after:content-['*'] after:ml-0.5 after:text-red-500">Name</label>*/}
              <Input type="text" name="name" id="name" value={formData.name} placeholder="Your name" onChange={handleChange} />
              {fieldError("name")}
            </div>
            <br></br>
            <div className="mb-2">
              {/*<label htmlFor="email" className="after:content-['*'] after:ml-0.5 after:text-red-500">Email</label>*/}
              <Input type="text" name="email" id="email" value={formData.email} placeholder="youremail@domain.com" onChange={handleChange} />
              {fieldError("email")}
            </div>
            <br></br>
            <div className="mb-2">
              {/*<label htmlFor="password" className="after:content-['*'] after:ml-0.5 after:text-red-500">Password</label>*/}
              <Input type="password" name="password" id="password" value={formData.password} placeholder="Your password.." onChange={handleChange} />
              {fieldError("password")}
            </div>
            <br></br>
            <button className='bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark w-full' onClick={handleSubmit}>Submit</button>

            <div className='pt-4'>
              <Link to="/login" className='text-blue-400'>Already have an account? Login here</Link>
            </div>
          </>
        )}
      </form>

      {/* Right Side: Image */}
      <div className="hidden lg:block w-1/2">
        <img src="group-of-people-working-out-business-plan-in-an-office-vector.jpg" alt="A person smiling while holding a cup of coffee" className="w-full h-screen aspect-auto object-cover" />
      </div>
    </div>
  );
}
 
export default SignupForm;

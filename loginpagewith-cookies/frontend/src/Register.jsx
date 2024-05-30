

import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const history = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phonenumber: "",
    password: "",
    corrpassword: "",
  });

  const handleInput = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, phonenumber, password, corrpassword } = user;
    if (!name || !email || !phonenumber || !password || !corrpassword) {
      window.alert("all field are mandatory");
      console.log("all field are mandatory");
    } else {
      if (password !== corrpassword) {
        window.alert("Password mismatch");
        console.log("Password mismatch");
      } else {
        try {
          let data = await fetch('/api/register', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              phonenumber,
              password,
              corrpassword
            })
          });
          if (data.status === 422) {

            window.alert("data are already exist");
            console.log("existed data");
          } else {
            window.alert("Registration successful");
            console.log("Success in posting data");
            history('/login')
          }
        } catch (error) {
          console.log("error in api")
        }


      }
    }

  };

  return (
    <>
      <div className="bg-gray-100 p-8">
        <div className="max-w-md mx-auto">
          <div className='cardapp bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className="text-xl font-bold mb-4">Enter your data</h2>
            <form className='formc' onSubmit={postData}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                <input type="text" name="name" id="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder='Enter your name' value={user.name} onChange={handleInput} />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                <input type="email" name="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder='Enter your email' value={user.email} onChange={handleInput} />
              </div>
              <div className="mb-4">
                <label htmlFor="phonenumber" className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
                <input type="text" name="phonenumber" id="phonenumber" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder='Enter your number' value={user.phonenumber} onChange={handleInput} />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                <input type="password" name="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder='Enter your password' value={user.password} onChange={handleInput} />
              </div>
              <div className="mb-6">
                <label htmlFor="corrpassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
                <input type="password" name="corrpassword" id="corrpassword" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder='Confirm your password' value={user.corrpassword} onChange={handleInput} />
              </div>
              <div className="flex items-center justify-center">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* <div>
        <div className='cardapp'>
          <h2>Enter your data</h2>
          <form className='formc' onSubmit={postData}>
            <input type="text" name="name" id="name" placeholder='Enter your name' value={user.name} onChange={handleInput} />
            <input type="email" name="email" id="email" placeholder='Enter your email' value={user.email} onChange={handleInput} />
            <input type="text" name="phonenumber" id="phonenumber" placeholder='Enter your number' value={user.phonenumber} onChange={handleInput} />
            <input type="password" name="password" id="password" placeholder='Enter your password' value={user.password} onChange={handleInput} />
            <input type="password" name="corrpassword" id="corrpassword" placeholder='Confirm your password' value={user.corrpassword} onChange={handleInput} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div> */}
    </>
  );
};

export default Register;


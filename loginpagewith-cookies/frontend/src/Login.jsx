import React, { useState } from "react";
import './App.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const checkData = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        window.alert("all field are mandatory")
      } else {
        const confirm = await fetch('/api/login', {

          headers: {
            "Content-Type": "application/json",
          },

          method: "POST",

          body: JSON.stringify({
            email,
            password
          })

        });

        if (confirm.status === 400 || !confirm) {
          window.alert("check your password and email also");
        } else {
          window.alert("Login successful");
          history('/home')

        }

      }

    } catch (error) {
      console.error("error in login " + error);
    }
  }

  return (
    <>
      <div className="bg-gray-100 p-8">
        <div className="max-w-md mx-auto">
          <div className='cardapp bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className="text-xl font-bold mb-4">Login to your account</h2>
            <form className='formc' onSubmit={checkData}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                <input type="email" name="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                <input type="password" name="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="flex items-center justify-center">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* <div>
        <div className='cardapp'>
          <h2>Login your page</h2>
          <form className='formc' onSubmit={checkData}>
            <input type="email" name="email" id="email" placeholder='Enter your email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <input type="password" name="password" id="password" placeholder='Enter your password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div> */}
    </>
  );
};

export default Login;

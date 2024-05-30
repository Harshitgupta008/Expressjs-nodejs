
import React, { useEffect, useState } from "react";
import './App.css';
import { useNavigate } from 'react-router-dom';
const Home = () => {

  const history = useNavigate();
  const [user, setUser] = useState([])

  const callAboutPage = async () => {

    try {
      const res = await fetch('/api/contact', {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json()
      setUser(data)
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }


    } catch (error) {
      history('/login')
      console.log("error effect ::" + error)
    }
  }


  useEffect(() => {
    callAboutPage();
  }, []);
  return (
    <>
      <div className="bg-gray-200 min-h-screen flex justify-center items-center">
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-8">Welcome to our Home page</h1>
          <div className="grid grid-cols-1  gap-4">
            {user.map((ele, i) => (
              <div key={i} className="p-4 bg-gray-100 rounded-lg shadow">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold mb-2">{ele.name}</h3>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">+ Add friend</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default Home;

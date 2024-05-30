

import React from 'react';
import './App.css';
import { Link } from 'react-router-dom'
const Navbar = () => {


  return (
    <>

      <nav className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex">
              <Link to={'/home'} className="text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to={'/contact'} className="text-white px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
              <Link to={'/about'} className="text-white px-3 py-2 rounded-md text-sm font-medium">About</Link>
            </div>
            <div className="flex">
              <Link to={'/register'} className="text-white px-3 py-2 rounded-md text-sm font-medium">Register</Link>
              <Link to={'/login'} className="text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
            </div>
          </div>
        </div>
      </nav>
      {/* <div>
        
         <div>
            <Link to={'/home'}>Home</Link><br /><br />
            <Link to={'/contact'}>Contact</Link><br /><br />
            <Link to={'/about'}>About</Link><br /><br />
            <Link to={'/register'}>Register</Link><br /><br />
            <Link to={'/login'}>Login</Link><br /><br />
         </div>
          
       
      </div> */}
    </>
  );
};

export default Navbar;


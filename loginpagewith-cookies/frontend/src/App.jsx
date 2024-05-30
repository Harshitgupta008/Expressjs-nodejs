import React  from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Register from'./Register'
import Navbar from './Navbar'
import Home from './Home'
import About from './About'
import Login from './Login'
import Contact from './Contact'
const App = () => {


  return (
    <>
      <div>
        <Navbar/>
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
          
          
       
      </div>
    </>
  );
};

export default App;


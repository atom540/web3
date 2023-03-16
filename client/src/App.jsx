import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
 
} from "react-router-dom";
import {Navbar,Welcome,Services,Footer,Transactions} from './components';

import Stock from './components/Stock';
import CheckIn from './components/CheckIn';
function App() {
  return (

    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
      <Navbar/>
        {/* <Welcome/> */}
       
      </div>
      <Services/>
      <Transactions/>
   
    <Router>
    {/* <Navbar/> */}
   
    <Routes>
{/*      
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/user" element={<User/>}/>
        <Route exact path="/login" element={<Login/>}/>
        */}
      {/* <Route exact path="/" element={ <Welcome/>}/> */}
     {/* <Route exact path="/trade" element={<Stock/>}/> */}
     {/* <Route exact path="/trade/CheckIn/query" element={<CheckIn/>}/> */}
   
     </Routes>
   
   
 </Router>
 </div>
  )
}

export default App

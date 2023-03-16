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
    <Router>
    <Navbar/>
   
    <Routes>
     {/* 
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/user" element={<User/>}/>
        <Route exact path="/login" element={<Login/>}/>
        */}
      <Route exact path="/" element={ <Welcome/>}/>
     <Route exact path="/trade" element={<Stock/>}/>
     <Route exact path="/trade/CheckIn/query" element={<CheckIn/>}/>
   
     </Routes>
   
   
 </Router>
  )
}

export default App

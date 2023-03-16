/** @format */
import react from "react"
import { useState } from "react";
import {AiOutlineClose} from 'react-icons/ai'
import {HiMenuAlt4} from 'react-icons/hi'
import logo from "../assets/images/logo.png";
import "./Navbar.css";
const NavbarItems = ({ title, classProps }) => {
  return <li className={` mx-4 cursor-pointer ${classProps}`}>{title}</li>;
};
const Navbar = () => {

    const [togglemenu,setToggle]=useState(true);
  return (
    <>
      <div className="wh nav-container">
        <div className="img-container">
          <img src={logo} alt="" />
        </div>
        <div className="navitems">
          <ul>
            {["Market", "Exahange", "Wallets"].map((items, index) => (
              <NavbarItems key={items + index} title={items} />
            ))}
            <li className="btn">
            <button>Login</button>
          </li>
          </ul>
                <div className="flex-relative">
                    {togglemenu
                    ?<AiOutlineClose fontSize={28} className=" " onclick={()=>setToggle(false)}/>:
                    <HiMenuAlt4 fontSize={28} className="" onclick={()=>setToggle(true)}/>}
                </div>
         
        </div>
      </div>
    </>
  );
};

export default Navbar;

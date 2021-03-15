import React from "react";
import { NavLink } from "react-router-dom";
import c from './Header.module.css'


const Header = (props) => {

    return <div className={c.header}>

        <div className={c.block1}><img src="https://image.freepik.com/free-vector/abstract-people-logo_23-2147493307.jpg"></img></div>
    <div className={c.block2}>
        {props.isAuthorized ?<div><p>Logged in as {props.login} <button onClick={props.singOutLogin}>Sign Out</button> </p></div> :<NavLink className={c.linkstyle} to="/login">Login</NavLink>}
        </div>
    
    </div>
}

export default Header;
import React, { Component } from 'react';
import { BrowserRouter as Route, Link} from "react-router-dom";

export default function NavBar(props) {


    return (
        <div className="navbar-2">
            <h2 className="float-left"><Link  to="/quik">Pins</Link></h2>
            <h2 className="float-left potentials"><Link  to="/potentials">Potentials</Link></h2>
            <h2 className="float-left"><Link  to="/connects">Connects</Link></h2>
            <h2 className="float-left"><Link  to="/profile">Profile</Link></h2> 
        </div>

    )


}
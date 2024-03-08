import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Link,useNavigate } from 'react-router-dom'
import Login from '../screen/login';


export default function Navbar() {
    const navigate=useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        
          navigate("/home.js")
          localStorage.removeItem("authT");
          localStorage.removeItem("E-mail");

    }

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark shadow-5-strong5">
                <Link className="navbar-brand" to="">BookSTORE</Link>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/home.js">Home </Link>
                        </li>
                        {(localStorage.getItem("authT"))
                            ? (<div><Link className='m-2' style={{ "color": "red" }} to='/cart.js'>Cart</Link>
                            <Link className='m-2' style={{ "color": "red" }} to='/myorders.js'>My Orders</Link>
                            <Link className='m-2' style={{ "color": "red" }} to='/profile.js'>Profile</Link>
                            <Link type='submit' className='m-2' style={{ "color": "red" }} onClick={handleLogout}>LogOut</Link></div>) : (<div className='d-flex'><Link className='m-2' style={{ "color": "red" }} to='/login.js'>Login</Link>
                                <Link className='m-2' style={{ "color": "red" }} to="/signup.js">SignUP </Link>
                        </div>)
                        }
                    </ul>
                </div>
            </nav >
        </div>
)
}

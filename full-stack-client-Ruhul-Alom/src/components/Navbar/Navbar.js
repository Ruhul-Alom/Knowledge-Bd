import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../image/logo.png';


const Navbar = (props) => {
    const {isSignedIn, name} = props.user;
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <a className="navbar-brand ms-5" href="/"><img width="100px" src={logo} alt=""/>Knowledge House</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item me-5">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item me-5">
                            <Link className="nav-link active" aria-current="page" to="/myOrders">Orders</Link>
                        </li>
                        <li className="nav-item me-5">
                            <Link className="nav-link active" aria-current="page" to="/allBooks" >Admin</Link>
                        </li>
                        {
                            (props.user.isSignedIn) ? <button className=" me-2" type="button"><Link className="text-decoration-none text-dark" to="/login">{name}</Link></button>
                            :
                            <button className=" me-2" type="button"><Link className="text-decoration-none text-dark"  to="/login">Login</Link></button>
                        }
                    
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
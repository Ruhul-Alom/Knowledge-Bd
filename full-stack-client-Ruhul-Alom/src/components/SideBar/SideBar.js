import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <div className="bg-secondary" style={{height:'100vh'}}>
            <h2 className="text-center text-white">Manage Book </h2>
            <Link to="/allBooks"><h5 className="fas fa-border-all">All Book List</h5></Link><br/>
            <Link to="/addBook"><h5 className="fas fa-plus-square">Add Book </h5></Link>
        </div>
    );
};

export default SideBar;
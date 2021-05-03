import React, { useEffect, useState } from 'react';
import SideBar from '../SideBar/SideBar';
import AllBookInfoTable from '../AllBookInfoTable/AllBookInfoTable';

const AllBookInfo = () => {

    const [allBooks, setallBooks] = useState([]);

    useEffect(() => {
        fetch('https://radiant-plateau-90950.herokuapp.com/books')
        .then(res => res.json())
        .then(data => setallBooks(data))
        
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <SideBar />
                </div>
                <div className="col-md-8">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Book</th>
                                <th>Auther</th>
                                <th>Price</th>
                
                                <th>Action</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allBooks.map(reg => <AllBookInfoTable reg={reg}></AllBookInfoTable>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllBookInfo;
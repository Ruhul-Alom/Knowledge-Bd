import React, { useEffect, useState } from 'react';
// import bookData from '../fakeData/fakeData.json';
import BookInfo from '../BookInfo/BookInfo';
// const { email } = JSON.parse(localStorage.getItem('user'));

const Home = () => {
    const [bookData, setBookData] = useState([]);

    useEffect(()=>{
        fetch('https://radiant-plateau-90950.herokuapp.com/books')
        .then(res => res.json())
        .then(data => setBookData(data))
    }, [])

    return (
        <div className="container">
            <div className="d-flex justify-content-center m-5">
                <input type="text" className="form-control w-50 " placeholder="Search for book..." />
                <input className="btn btn-primary" type="submit" value="Search"/>
            </div>
            <div className="row mx-auto">
                {
                    bookData.map(book => <BookInfo key={book._id} book={book}></BookInfo>)
                }
            </div>
        </div>
    );
};

export default Home;
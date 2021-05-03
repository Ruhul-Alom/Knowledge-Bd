import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import SideBar from '../SideBar/SideBar';

const AddBook = () => {

    const [newBook, setNewBook] = useState({});
    const history = useHistory();

    const handleOnBlur = (e) => {
        const newBookadd = newBook;
        newBookadd[e.target.name] = e.target.value;
        setNewBook(newBookadd);
    }

    const handleAddBook = (e) => {
        e.preventDefault();
        fetch('https://radiant-plateau-90950.herokuapp.com/addBooks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBook)
        })
            .then(res => res.json())
            .then(data => {
                alert('Your Book is inserted');
                history.replace('/');
            })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <SideBar />
                </div>
                <div className="col-md-8">
                    <form onSubmit={handleAddBook }>
                        <input onBlur={handleOnBlur} name="name" className="form-control" type="text" placeholder="Book Name" required /> <br />
                        <input onBlur={handleOnBlur} name="writer" className="form-control" type="text" placeholder="Author Name" required /> <br />
                        <input onBlur={handleOnBlur} name="price" className="form-control" type="text" placeholder="Price" required /> <br />
                        <input onBlur={handleOnBlur} name="img" className="form-control" type="text" placeholder="Image URL" required /> <br />
                        <button className="form-control" className="btn btn-primary w-100">Add Book</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBook;
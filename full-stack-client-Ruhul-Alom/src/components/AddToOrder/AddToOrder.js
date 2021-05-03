import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

const AddToOrder = (props) => {
    const {isSignedIn, name} = props.user;
    console.log(isSignedIn,name);
    const {_id } = useParams();
    const [addToCart, setaddToCart] = useState({});
    // const user = JSON.parse(localStorage.getItem('user'));
  
    const [cart, setCart] = useState({
        userName: props.user.name,
        email: props.user.email,
        name:addToCart.name
    })

    
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        {
            fetch('https://radiant-plateau-90950.herokuapp.com/addCart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cart)
            })
            .then(res => res.json())
            .then(data => {
                alert('Your registration is successful');
                history.replace('/');
            })
        }
    }

    useEffect(() => {
        fetch(`https://radiant-plateau-90950.herokuapp.com/books/${_id}`)
            .then(res => res.json())
            .then(data => {
                setaddToCart(data);
                const newCart = cart;
                newCart.bookName = data.name;
                newCart.bookPrice= data.price;
                newCart.bookImg = data.img;
                setCart(newCart);
            })
    }, [])

    return (
        <div className="container">
            <div style={{width:'35%',margin:'0 auto'}}>
            <h3>ADD TO ORDER FOR BUYING</h3> <br />
            <form onSubmit={handleSubmit}>
                 <img  width="100%" src={addToCart.img} alt=""/>
                <input className="form-control " type="text" placeholder="Your Full Name" value={props.user.name} hidden /> <br />
                <input className="form-control " type="text" placeholder="Your Email" value={props.user.email} hidden/> <br />
                <input className="form-control " type="text" placeholder="Book Name" value={addToCart.name} /> 
                <input className="form-control " type="text" placeholder="Book Price" value={addToCart.price} /> 
                <button className="btn btn-primary w-100">Add To Order</button>
            </form>
              </div>
        </div>
    );
};

export default AddToOrder;
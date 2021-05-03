import React from 'react';
import { Link } from 'react-router-dom';

const BookInfo = (props) => {

    const book = props.book;
    const { _id, name, img,price } = book;

    return (
        <div className=" card col-md-3 col-sm-4  mb-5 me-5">
 <div style={{margin:'20px'}} >
  <img style={{height:'200px'}} className="card-img-top" width="100%" src={img} alt="Card image cap"/>
  </div>
  <div className="card-body">
    <h5 className="card-title">{name}</h5>
  </div>
  <h4 className="text-warning">${price}</h4>
  <Link to={`/addToCart/${_id}`}className="btn btn-success mb-2" >BUY</Link> 
        </div>

    );
};

export default BookInfo;
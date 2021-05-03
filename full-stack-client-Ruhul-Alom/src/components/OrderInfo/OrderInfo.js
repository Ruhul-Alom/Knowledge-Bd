import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router';

const OrderInfo= (props) => {
    // const { email } = JSON.parse(localStorage.getItem('user'));
const email= props.user.email;
    // const event = props.product;
    const [myBook, setMyBooks] = useState([]);
   
    useEffect(() => {
        fetch('https://radiant-plateau-90950.herokuapp.com/cartInfoByEmail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
            .then(res => res.json())
            .then(data => setMyBooks(data))
    }, [])

    let price= 0
    myBook.map(p =>
        price=parseInt(p.price)+ price
      
        )

    return (
       
        <div className="col-md-12">
        <table class="table table-striped">
  <thead>
    <tr>
     
      <th scope="col">Description</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>

                         { 
                               myBook.map(reg =>  
                                
                             <tr>
                                 <td>{reg.bookName}</td>
                                 <td>1</td>
                                 <td>{reg.bookPrice}</td>
                             </tr>   
                           
                                
                            
                             ) 
                             }
                               
                            <button className="btn btn-info mt-5 w-50">Check Out</button> 
                          
                        </tbody>
  
</table>
</div>
    );
};

export default OrderInfo;
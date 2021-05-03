import React from 'react';
import { useHistory } from 'react-router';

const AllBookInfoTable = (props) => {

    const allbook = props.reg;
   
    const { _id, name, writer,price } =allbook;
    const history = useHistory();

    const handleDelete = () => {
        fetch(`https://radiant-plateau-90950.herokuapp.com/cartDelete/${_id}`, {method:'DELETE'})
        .then(res => res.json())
        .then(data => {
            alert('Deleted successfully');
            history.replace('/');
        })
    }

    return (
        <tr>
            <td>{name}</td>
            <td>{writer}</td>
            <td>{price}</td>
           
            <td><i onClick={handleDelete} className="fas fa-trash-alt"></i>   <i className="fas fa-edit"></i></td>
            
        </tr>
    );
};

export default AllBookInfoTable;

import OrderInfo from '../OrderInfo/OrderInfo';

const MyOrders = (props) => {

    // const { email,user } = JSON.parse(localStorage.getItem('user'));
    return (
        <div className="container">
            <div className="row">
                {
                    <OrderInfo user={props.user}></OrderInfo>
                }
            </div>
        </div>
    );
};

export default MyOrders;
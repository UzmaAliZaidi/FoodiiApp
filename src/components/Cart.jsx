import { useContext } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./UI/CartItem.jsx";

export default function Cart(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    
    const cartTotal = cartCtx.items.reduce(
        (totalPrice , item) => totalPrice + item.quantity *  item.price, 0);

    function handleCloseCart(){
      userProgressCtx.hideCart();
    }

    function handleGoToCheckout() {
        userProgressCtx.showCheckout();
    }

    return <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map(item => 
            <CartItem key={item.id} 
            {...item} 
            onIncrease={() => cartCtx.addItem(item)} 
            onDecrease={() => cartCtx.removeItem(item.id)}/>
        )}
        </ul>
        <p className="cart-total">${cartTotal}</p>
        <p className="modal-actions">
            <Button textOnly onClick = {handleCloseCart}>Close</Button>
            {cartCtx.items.length > 0 && <Button onClick = {handleGoToCheckout}>Go to Checkout</Button> }   
        </p>
    </Modal>
}
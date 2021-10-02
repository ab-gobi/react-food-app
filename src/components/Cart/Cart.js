import React , { useContext,useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../Store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const CartCtx = useContext(CartContext);
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [didSubmit,setDidSubmit] = useState(false);
    const cartItemAddHandler = (item) =>{
        CartCtx.addItem({...item,amount:1});
    }
    const cartItemRemoveHandler = (id) => {
        CartCtx.removeItem(id);
    }
    const orderHandler = () => {
        setIsCheckout(true);
    }

    const cartList = <ul className={classes['cart-items']}>{
    CartCtx.items
    .map(item => 
        <CartItem 
        key={item.id} 
        name={item.name} 
        amount={item.amount} 
        price={item.price} 
        onAdd={cartItemAddHandler.bind(null,item)} 
        onRemove={cartItemRemoveHandler.bind(null,item.id)}/>
        )
    }
    </ul>;
    const totalAmount = CartCtx.amount.toFixed(2);
    const hasItem = CartCtx.items.length > 0;
    const modalActions = <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
    { hasItem && <button className={classes.button} onClick={orderHandler}>Order</button> }
</div>

const confirmHandler = async (userData) => {
    setIsSubmitting(true);
   await fetch('https://meals-6b55a-default-rtdb.firebaseio.com/orders.json',{
        method:'POST',
        body:JSON.stringify({
            user:userData,
            orderedItems:CartCtx.items
        })
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    CartCtx.clearCart();
}

const cartContent = <React.Fragment>{cartList}
<div className={classes.total}>
    <span>Total Amount</span>
    <span>{totalAmount}</span>
</div>
{isCheckout && <Checkout onConfirm={confirmHandler} onCancel={props.onClose}/>}
{!isCheckout && modalActions}
</React.Fragment>

const isSubmittingModalContent = <p>Sending the order...</p>;
const didSubmitModalContent = <React.Fragment>
    <p>Your Order placed successfully!!</p>
    <div className={classes.actions}>
    <button className={classes.button} onClick={props.onClose}>Close</button>
    </div>
    </React.Fragment>;
    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart

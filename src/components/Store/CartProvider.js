import { useReducer } from 'react';
import CartContext from './cart-context';


const cartReducer = (state,action) =>{
    if(action.type==='ADD'){
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartIndex = state.item.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.item[existingCartIndex];

        let updatedItems;
        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount:existingCartItem.amount+action.item.amount
            };
            updatedItems = [...state.item];
            updatedItems[existingCartIndex] = updatedItem;
        }
        else{
            updatedItems = state.item.concat(action.item);
        }
        return {
            item:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }

    if(action.type==='REMOVE'){
        const existingCartIndex = state.item.findIndex(item => item.id === action.id);
        const existingCartItem = state.item[existingCartIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems;
        if(existingCartItem.amount===1){
                updatedItems = state.item.filter(item => item.id !== action.id)
        }
        else{
            const updatedItem = {...existingCartItem,amount:existingCartItem.amount - 1 };
            updatedItems = [...state.item];
            updatedItems[existingCartIndex] = updatedItem;
        }
        return{
            item:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }
    if(action.type==='CLEAR'){
        return defaultCartState;
    }

    return defaultCartState;
}
const defaultCartState={
    item:[],
    totalAmount:0
}
const CartProvider = props => {

    const[cartState,dispatchCartAction] = useReducer(cartReducer,defaultCartState);
    
    const addItemHandler = (item)=>{
        dispatchCartAction({type:'ADD',item:item})
    };
    const removeItemHandler = (id)=>{
        dispatchCartAction({type:'REMOVE',id:id});
    };

    const clearCartHandler = ()=>{
        dispatchCartAction({type:'CLEAR'});
    };

    const cartContext = {
        items:cartState.item,
        amount:cartState.totalAmount,
        addItem:addItemHandler,
        removeItem:removeItemHandler,
        clearCart:clearCartHandler
    }
    return (
       <CartContext.Provider value={cartContext}>
           {props.children}
           </CartContext.Provider>
    )
}

export default CartProvider

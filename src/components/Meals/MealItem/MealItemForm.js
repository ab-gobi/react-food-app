import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes  from './MealItemForm.module.css';


const MealItemForm = (props) => {
    const[validAmountFlag,setValidAmountFlag] = useState(true)
    const amountInputRef = useRef();

    const onSubmitHandler = event =>{
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if(enteredAmount.trim().length === 0 || 
        enteredAmountNumber < 0 || 
        enteredAmountNumber > 5){
            setValidAmountFlag(false);
            return;
        }
        props.onAddToCart(enteredAmountNumber);
    }
    return (
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <Input
            ref = {amountInputRef}
            label = "amount"
            input = {{
                id : "amount_"+ props.id,
                type : "number",
                step : "1", 
                min : "1" ,
                max : "5" ,
                value : '1',
            }}
                
            />
            <button>+ Add</button>
            {!validAmountFlag && <p>Please enter valid amount</p>}
        </form>
    )
}

export default MealItemForm;

import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const [formInputValidity, setFormInputValidity] = useState({
        name:true,
        street:true,
        city:true,
        postal:true
    })

    const isEmpty = (value) => value.trim().length === 0;
    const isNotFiveChars = (value) => value.trim().length !== 5;

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPost = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostIsValid = !isNotFiveChars(enteredPost);

    setFormInputValidity({
        name:enteredNameIsValid,
        street:enteredStreetIsValid,
        city:enteredCityIsValid,
        postal:enteredPostIsValid
    });

    const formisValid = 
    enteredNameIsValid && 
    enteredStreetIsValid && 
    enteredCityIsValid &&
    enteredPostIsValid;

    if(!formisValid){
        return;
    }

    props.onConfirm({
        name:enteredName,
        street:enteredStreet,
        city:enteredCity,
        postal:enteredPost
    });
   
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputValidity.name ? "" : classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputValidity.name && <p>Please enter valid name!</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.street ? "" : classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputValidity.street && <p>Please enter valid street!</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.postal ? "" : classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef}/>
        {!formInputValidity.postal && <p>Please enter valid postal!</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.city ? "" : classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputValidity.city && <p>Please enter valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
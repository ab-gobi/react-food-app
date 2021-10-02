import { Fragment } from 'react';
import classes from './Header.module.css';
import mealImage from '../../assets/mealimg.jpeg';
import HeaderCartButton from './HeaderCartButton';
const Header = (props)=> {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Order your meals</h1>
                <HeaderCartButton onClick = {props.onShowCart}/>
            </header>
            
            <div className={classes['main-image']}>
                <img src={mealImage} alt="Meals Table!!"/>
            </div>
        </Fragment>
    )
}

export default Header

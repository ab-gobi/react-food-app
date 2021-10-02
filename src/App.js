import React, {useState }from 'react';
import Header from './components/Layout/Header.js';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './components/Store/CartProvider';
function App() {

  const[showCart,setShowCart] = useState(false);

  const showCartHandler=()=>{
    setShowCart(true);
  }

  const hideCartHandler = () =>{
    setShowCart(false);
  }

  return (
    <CartProvider>
      {showCart && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;

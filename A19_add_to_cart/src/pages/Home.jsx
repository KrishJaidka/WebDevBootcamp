import React, { useContext } from 'react'
import styles from './Home.module.css'
import Card from '../components/Card'
import { useCart } from '../contexts/CartContext'

const Home = ({isCartOpen, toggleCartDiv}) => {

  const { products, cartItems, removeItemFromCart } = useCart();
  // console.log(products);

  return (
    <div className={styles.home}>
      <h1>Recommended Products</h1>
      <div className={styles.cardDiv}>
        {
          products.map((item) =>
            <Card key={item.id} title={item.title} imgSrc={item.images[0]} price={item.price} id={item.id} />
          )
        }
      </div>

      <div 
        className={`${styles.cartDiv} ${!isCartOpen?styles.hide:""}`}
        tabIndex="-1"
        aria-hidden={!isCartOpen}
        inert={!isCartOpen?true:undefined } // doesnt work with safari
      >
        <h2>
          Cart:
        </h2>
        {cartItems.map((item) => (
          <div key={item.id}>
            <div>
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <button onClick={() => removeItemFromCart(item.id,null)}>-</button>
            <button type="button" onClick={() => removeItemFromCart(item.id,'delete')}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
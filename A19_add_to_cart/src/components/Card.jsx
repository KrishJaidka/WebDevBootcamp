import React from 'react'
import styles from './Card.module.css'
import { useCart } from '../contexts/CartContext'

const Card = ({id,imgSrc,title,price}) => {

  const { addItemToCart } = useCart();

  // const addHandler = () => {
  //   return;
  // }

  return (
    <div className={styles.card}>
      <img src={imgSrc ||"./asus.jpg"} alt="" className={styles.img} />
      <div>
        <div className={styles.cardContent}>
          <h3>{title || "Asus TUF A15 (2021)"}</h3>
          <h2 className={styles.price}>{"$"+price || "$899"}</h2>
        </div>
        <button type="button" className={styles.add} onClick={()=>addItemToCart({id,title,price})}>+</button>
      </div>
    </div>
  )
}

export default Card
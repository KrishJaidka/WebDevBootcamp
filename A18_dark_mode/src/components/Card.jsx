import React from 'react'
import styles from './Card.module.css'

const Card = () => {
  return (
    <div className={styles.card}>
      <img src="./asus.jpg" alt="" className={styles.img} />
      <div>
        <div className={styles.cardContent}>
          <h3> Asus TUF A15 (2021)</h3>
          <h2 className={styles.price}>$899</h2>
        </div>
        <button type="button" className={styles.add} disabled>+</button>
      </div>
    </div>
  )
}

export default Card
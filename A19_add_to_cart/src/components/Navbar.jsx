import React from 'react'
import { useTheme } from '../contexts/ThemeContext';
import { MapPin, Search, ShoppingCart, CircleUser } from 'lucide-react';
import styles from "./Navbar.module.css"
import { useCart } from '../contexts/CartContext';

const Navbar = ({toggleCartDiv}) => {
  const { darkTheme, setDarkTheme } = useTheme();
  const { quantity  } = useCart();

  const toggleTheme = () => {
    return setDarkTheme((prevTheme) => !prevTheme);
  }

  return (
    <>
      <nav>
        <div>
          <h1 className={styles.brandName} >Amazon
          </h1>
          <div className={styles.addressDiv}>
            <MapPin strokeWidth={1.8} />
            <div className={styles.address}>
              <h6>Deliver to krish</h6>
              <h5>New Delhi 1100XX</h5>
            </div>
          </div>
          <div className={styles.searchBarDiv}>
            <input type="text" placeholder='Search Item' className={styles.searchBar} />
            <button type="submit" className={styles.searchBtn}><Search /></button>
          </div>
        </div>
        <div>
          <button type="button" onClick={toggleTheme} className={styles.themeBtn}>Toggle Theme</button>
          <div className={styles.cartDiv}>
            <button className={styles.cartBtn} onClick={toggleCartDiv}>
            <ShoppingCart size={32} />
            </button >
            <div className={styles.cartNum}>{quantity}</div>
            </div>

          <div className={styles.profileBtn}><CircleUser size={32} /></div>
        </div>
      </nav >
    </>
  )
}

export default Navbar
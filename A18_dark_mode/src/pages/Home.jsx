import React from 'react'
import styles from './Home.module.css'
import Card from '../components/Card'

const Home = () => {
  return (
    <div className={styles.home}>
        <h1>Recommended Products</h1>
        <div className={styles.cardDiv}>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        </div>
    </div>
  )
}

export default Home
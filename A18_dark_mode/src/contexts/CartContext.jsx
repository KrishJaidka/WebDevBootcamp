import { createContext, useContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({children}) => {
    const [ cartItems, setCartItems ] = useState([])

    const addItemToCart = (item) => {
        return setCartItems((prevCartItems)=>{
            [...prevCartItems,item]
        })
    }

    const removeItemFromCart = (id) => {
        return setCartItems((prevCartItems)=>{
            prevCartItems.filter((item)=> item.id !== id  )
        })
    }

    return(
        <CartContext.Provider value={{cartItems,addItemToCart,removeItemFromCart}}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext)

export { CartProvider , useCart }
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const [products, setProducts] = useState([])
    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
        const getData = async () => {
            const res = await fetch("https://dummyjson.com/products/category/laptops");
            const data = await res.json();
            // await data.carts.splice(5);
            setProducts(data.products);
            console.log('data fetched successfully.');
        };
        getData();
    }, []);

    const addItemToCart = (item) => {
        setQuantity(prevQuantity => prevQuantity + 1)
        setCartItems((prevCartItems) => {
            const cartItems = [...prevCartItems];
            const index = cartItems.findIndex((i) => i.id === item.id)
            if (index === -1) {
                return [...cartItems, { ...item, "quantity": 1 }];
            } else {
                cartItems[index] = {
                    ...cartItems[index],
                    "quantity": cartItems[index].quantity + 1
                };
                return cartItems;
            }
        })
    }

    const removeItemFromCart = (id, type) => {
        // First, find the item and calculate quantity change
        const item = cartItems.find(item => item.id === id);
        if (!item) return;

        // Update quantity first
        if (type === 'delete' || item.quantity === 1) {
            setQuantity(prevQuantity => prevQuantity - item.quantity);
        } else {
            setQuantity(prevQuantity => prevQuantity - 1);
        }

        // Then update cart items
        setCartItems((prevCartItems) => {
            const cartItems = [...prevCartItems];
            const index = cartItems.findIndex((i) => i.id === id);
            if (index === -1) return cartItems;

            if (type === 'delete' || cartItems[index].quantity === 1) {
                return cartItems.filter((item) => item.id !== id);
            } else {
                cartItems[index] = {
                    ...cartItems[index],
                    "quantity": cartItems[index].quantity - 1
                };
                return cartItems;
            }
        });
    }

    return (
        <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, products, quantity }}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext)

export { CartProvider, useCart }
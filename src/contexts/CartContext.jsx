import { useState, createContext, useContext } from "react";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const isInCart = (id) => cart.some((prod) => prod.id === id);

  const addProduct = (productToAdd) => {
    if (isInCart(productToAdd.id)) {
      const cartUpdated = cart.map((prod) =>
        prod.id === productToAdd.id ? productToAdd : prod
      );

      setCart(cartUpdated);
    } else {
      setCart([...cart, productToAdd]);
    }
  };

  const clear = () => {
    setCart([]);
  };

  const remove = (id) => setCart(cart.filter((x) => x.id !== id));

  const getTotalPrice = () => cart.reduce(
    (acc, { price, quantity }) => acc + price * quantity,
    0
  );

  const getCartQuantity = () =>
    cart.reduce((total, { quantity }) => total + quantity, 0);

  const getProductQuantity = (id) => {
    const product = cart.find((x) => x.id === id);

    return product ? product.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        getTotalPrice,
        addProduct,
        clear,
        remove,
        getProductQuantity,
        getCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

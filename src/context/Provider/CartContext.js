import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({});
import { toast } from "react-toastify";
export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (userInfo?.length > 0) {
      ls?.setItem("userInfo", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  function addProduct(productId, productPrice) {
    const updatedCart = cartProducts.map((product) =>
      product.id === productId
        ? { ...product, price: productPrice, quantity: product.quantity + 1 }
        : product,
    );
    const productAlreadyInCart = updatedCart.some(
      (product) => product.id === productId,
    );
    if (!productAlreadyInCart) {
      setCartProducts((prev) => [
        ...prev,
        { id: productId, price: productPrice, quantity: 1 },
      ]);
      toast.success("Product added successfully!");
    } else {
      setCartProducts(updatedCart);
    }
  }

  function removeProduct(productId) {
    setCartProducts((prev) =>
      prev.filter((product) => product.id !== productId),
    );
    ls?.removeItem("cart");
    toast.info("Removed product successfully!");
  }

  function updateProduct(productId, newQuantity) {
    const updatedCart = cartProducts.map((product) =>
      product.id === productId
        ? { ...product, quantity: newQuantity }
        : product,
    );

    setCartProducts(updatedCart);
  }

  function addUserInfo(Email, name, address, phone, payment) {
    setUserInfo({
      email: Email,
      name: name,
      address: address,
      phone: phone,
      payment: payment,
    });
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        updateProduct,
        addUserInfo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

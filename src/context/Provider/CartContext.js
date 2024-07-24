"use client";
import CommonUtil from "@/common/commonUtils";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (userInfo.length > 0) {
      ls?.setItem("userInfo", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
    if (ls && ls.getItem("userInfo")) {
      setUserInfo(JSON.parse(ls.getItem("userInfo")));
    }
  }, []);

  function addProduct(productId, productPrice, selectedSize) {
    const updatedCart = cartProducts.map((product) =>
      product.id === productId && product.size === selectedSize
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );

    const productAlreadyInCart = updatedCart.some(
      (product) => product.id === productId && product.size === selectedSize
    );

    if (!productAlreadyInCart) {
      setCartProducts((prev) => [
        ...prev,
        { id: productId, price: productPrice, size: selectedSize, quantity: 1 },
      ]);
      toast.success("Product added successfully!");
    } else {
      setCartProducts(updatedCart);
      console.log("Updated cartProducts:", updatedCart);
    }
  }

  function removeProduct(productId, selectedSize) {
    const updatedCart = cartProducts.filter(
      (product) => !(product.id === productId && product.size === selectedSize)
    );
    setCartProducts(updatedCart);
    CommonUtil.setStorageValue("cart", updatedCart);
    toast("Removed product successfully!", {
      icon: "🗑️",
    });
  }

  function updateProduct(productId, selectedSize, newQuantity) {
    console.log("updateProduct called with:", productId, selectedSize, newQuantity);
    const updatedCart = cartProducts.map((product) =>
      product.id === productId && product.size === selectedSize
        ? { ...product,size:selectedSize, quantity: newQuantity }
        : product
    );
    CommonUtil.setStorageValue("cart", updatedCart);
    setCartProducts(updatedCart);
  }

  function addUserInfo(email, name, address, phone, payment) {
    console.log("addUserInfo called with:", email, name, address, phone, payment);

    const newUserInfo = { email, name, address, phone, payment };
    setUserInfo(newUserInfo);
    ls?.setItem("userInfo", JSON.stringify(newUserInfo));
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

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
      console.log("Updated cartProducts:", updatedCart);
    }
  }

  function removeProduct(productId) {
    const updatedCart = cartProducts.filter(
      (product) => product.id !== productId,
    );
    setCartProducts(updatedCart);
    CommonUtil.setStorageValue("cart", updatedCart);
    toast("Removed product successfully!", {
      icon: "🗑️",
    });
  }

  function updateProduct(productId, newQuantity) {
    console.log("updateProduct called with:", productId, newQuantity);
    const updatedCart = cartProducts.map((product) =>
      product.id === productId
        ? { ...product, quantity: newQuantity }
        : product,
    );
    CommonUtil.setStorageValue("cart", updatedCart);

    setCartProducts(updatedCart);
  }

  function addUserInfo(Email, name, address, phone, payment) {
    console.log(
      "addUserInfo called with:",
      Email,
      name,
      address,
      phone,
      payment,
    ); // Debugging line

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

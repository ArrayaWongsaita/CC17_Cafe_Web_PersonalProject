import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import productApi from "../apis/product";

export const ProductContext = createContext();

export default function ProductContainerProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isProductLoading, setIsProductLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productApi.getAllProduct();
        console.log(res);
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setIsProductLoading(false);
      }
    };
    fetchProduct();
  }, []);

  const createProduct = async (formData) => {
    try {
      const res = await productApi.createProduct(formData);
      if (res) {
        const newProduct = res.data;
        setProducts([newProduct, ...products]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const editProduct = async (formData) => {
    try {
      const res = await productApi.editProduct(formData);
      console.log(res);
      const newdata = products.map((item) => {
        if (item.id === res.data.id) return res.data;
        return item;
      });
      setProducts(newdata);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    createProduct,
    products,
    isProductLoading,
    setProducts,
    editProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

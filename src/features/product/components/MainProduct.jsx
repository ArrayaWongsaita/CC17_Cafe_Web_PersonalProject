import useProduct from "../../../hooks/useProduct";
import Spinner from "../../../components/Spinner";
import ProductContainer from "../../home/components/ProductContainer";
import Input from "../../../components/Input";
import { useState } from "react";

export default function MainProduct() {
  const [input, setInput] = useState("");

  const { isProductLoading } = useProduct();

  if (isProductLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="bg-customBeige">
      <div className="flex justify-between items-center pt-10 px-12 h-20 ">
        <h1 className="text-3xl text-customPink">Product</h1>
        <div className="text-customPink">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"search product"}
          />
        </div>
      </div>
      <ProductContainer search={input} />
    </div>
  );
}

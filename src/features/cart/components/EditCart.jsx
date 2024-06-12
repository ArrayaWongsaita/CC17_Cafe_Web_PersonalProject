import { useState, useEffect } from "react";
import Button from "../../../components/Button";
import imageUrl from "../../../image/TheRibbon.jpg";

export default function EditCart({
  image = imageUrl,
  price = 1,
  cartId ,
  amountCart = 1,
  productName,
  deleteItemInCart,
  editCartItem,
  productId
}) {
  const [amount, setAmount] = useState(+amountCart);
  const [hasChanged, setHasChanged] = useState(false); // State to track if the amount has changed

  useEffect(() => {
    if (hasChanged) {
      const timer = setTimeout(() => {
        console.log(amount);
        editCartItem({amount,productId})

      }, 800);

      return () => clearTimeout(timer); // Clear the timeout if amount changes within 1 second
    } else {
      setHasChanged(true); 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);
  const handleDeleteCart = ()=>{
    deleteItemInCart(cartId)
  }

  return (
    <div className="m-auto  relative flex flex-col justify-start gap-4 items-center rounded-lg bg-white px-5 py-[15px] ">
      <div
        style={{
          backgroundImage: `url(${image || imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "165px",
          height: "100px", // Adjusted height to match the width
        }}
        className="rounded-xl"
      ></div>
      <div className="flex flex-col gap-4 justify-start items-start">
        <div>{productName}</div>
        <div className="flex justify-start gap-4 text-customPink">
          <div>Total</div>
          <div>{+price * amount}</div>
          <div>THB</div>
        </div>
        <div className="items-center flex w-full justify-between">
          <div className="flex gap-4">
            <div>Amount:</div>
            <div>{amount}</div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <div>
          <Button onClick={() => setAmount(amount + 1)} style="increase">
            Increase
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              if (amount > 1) setAmount(amount - 1);
            }}
            style="decrease"
          >
            Decrease
          </Button>
        </div>
      </div>
      <div onClick={handleDeleteCart} role="button" className="absolute -top-2.5 -right-2.5 bg-red-600 w-6 h-6  rounded-full flex justify-center items-center"><div className="text-white text-sm">&#10005;</div></div>
    </div>
  );
}

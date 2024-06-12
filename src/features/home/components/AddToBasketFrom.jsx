import { useState } from "react";
import imageUrl from "../../../image/TheRibbon.jpg";
import Button from "../../../components/Button";
import useModal from "../../../hooks/useModal";
import { useNavigate } from "react-router-dom";
export default function AddToBasketFrom({ image, price, productId }) {
  const [amount, setAmount] = useState(1);
  const { addToBasket } = useModal();
  const navagate = useNavigate()

  const handleAddToBasket = () => {
    const body = {
      productId,
      amount,
    };
    addToBasket(body);
  };
  const handleByNow = async () => {
    try {
      const body = {
        productId,
        amount,
      };
      await addToBasket(body);
      await setTimeout(() => {
        navagate('/cart')
      }, 800); 
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="m-auto flex flex-col items-center  w-[328px] rounded-lg  bg-white px-[10px] py-[15px] ">
      <div
        style={{
          backgroundImage: `url(${image || imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-[290px] h-[200px] mb-3 rounded-sm m-auto "
      ></div>
      <div className="flex justify-between w-full text-customPink text-2xl py-4">
        <div>Total</div>
        <div>{+price * amount}</div>
        <div>THB</div>
      </div>
      <div className=" items-center py-5 flex w-full justify-between">
        <div>Amount</div>
        <div>{amount}</div>
        <div className="flex gap-3">
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
      </div>
      <div className="w-full py-5 ">
        <Button onClick={handleAddToBasket} style="addToBasket">
          Add to basket
        </Button>
      </div>
      <div className="w-full ">
        <Button onClick={handleByNow} style="byNow">By now</Button>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import useModal from "../../../hooks/useModal";
import useUser from "../../../hooks/useUser";
import AllCartDetail from "./AllCartDetail";
import EditCart from "./EditCart";
import Button from "../../../components/Button";
import { useEffect } from "react";

export default function MainCart() {
  const { cartUser, deleteItemInCart, editCartItem } = useUser();
  const { confirmAddress } = useModal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalPayMent = cartUser.reduce((acc, item) => {
    acc = acc + (item.amount * item.productDetail?.price);
    return acc;
  }, 0);

  return (
    <>
      <div className="w-full h-24  bg-customPink flex justify-center items-center"></div>
      <div className="w-full min-h-[85vh]  flex justify-center bg-customBeige">
        <div className="w-full  flex">
          <div className="w-full  grid grid-cols-auto-fit-minmax-200 px-4 bg-customFooter">
            {cartUser.length > 0 ? (
              cartUser.map((item, index) => (
                <EditCart
                  key={index}
                  cartId={item.id}
                  amountCart={item.amount}
                  price={item.productDetail?.price || 1}
                  image={item.productDetail.image}
                  productName={item.productDetail.productName}
                  deleteItemInCart={deleteItemInCart}
                  editCartItem={editCartItem}
                  productId={item.productId}
                />
              ))
            ) : (
              <div className="flex justify-center items-center w-full h-full">
                <Link to="/product">
                  <div className="px-10 py-5 bg-customPink rounded-lg">
                    <Button>You cart is Empty. Shop now</Button>
                  </div>
                </Link>
              </div>
            )}
          </div>
          {cartUser.length > 0 && (
            <div className="w-1/3 relative min-w-[300px] pt-[25vh] h-full flex justify-center items-start bg-customLightBrown">
              <AllCartDetail totalPayMent={totalPayMent} confirmAddress={confirmAddress} />
            </div>
          )}
        </div>
      </div>
      {/* <div className="w-full h-24 bg-customPink flex justify-center items-center"></div> */}
    </>
  );
}

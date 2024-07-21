import imageUrl from "../../../image/TheRibbon.jpg";
import Button from "../../../components/Button";
export default function CardProduct({
  productId,
  productName,
  image,
  description,
  price,
  onClick,
  handleParent = null,
  isShow = true,
  // id
}) {
  const data = {
    productId,
    price,
    image,
  };

  const handleOnClick = () => {
    if (handleParent) {
      return;
    }
    onClick(productName, data);
  };

  const handleByAdmin = () => {
    if (!handleParent) {
      onClick(productName, data);
    } else {
      const data = {
        productId,
        productName,
        image,
        description,
        price,
        isShow,
      };
      handleParent(data);
      console.log("modal");
    }
  };

  return (
    <div
      onClick={handleByAdmin}
      className={` ${
        isShow === true ? "bg-white" : "bg-red-100"
      } hover:scale-[110%]  flex flex-col mx-auto w-[255px] rounded-lg   px-[10px] py-[15px]`}
    >
      <div
        style={{
          backgroundImage: `url(${image || imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-[235px] h-[156px] rounded-lg "
      ></div>
      <div className="flex-1  w-[235px] gap-2 px-[8px]  py-[10px] flex flex-col items-start justify-start">
        <h1 className="text-customPink">{productName}</h1>
        <div>
          <small>{description}</small>
        </div>
      </div>
      <div className="w-full mt-3 ">
        <Button onClick={handleOnClick}>{price} THB</Button>
      </div>
    </div>
  );
}

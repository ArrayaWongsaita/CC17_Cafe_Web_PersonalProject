const styleButton = {
  CardProduct:
    "bg-customPink w-full py-2  rounded-md text-white font-extralight",
  login: "border-customBrown border px-5 h-[32px] rounded-lg",
  addToBasket:
    "rounded-[20px]  bg-customSilverSand w-full py-3   text-customLightBrown font-extralight",
  increase:
    "text-[12px]   text-white bg-customMintGreen w-fill py-2 px-3 rounded-[17px]",
  decrease:
    " text-[12px]  text-white bg-customRoyalPurple w-fill py-2 px-3 rounded-[17px]",
  byNow:
    "rounded-[22px]  bg-customPink w-full py-3   text-white font-extralight",
  register:
    "rounded-md  bg-customSilverSand w-full py-2  text-customLightBrown font-extralight",
  logout:
    "text-customBrown block w-full text-left px-4 py-2 text-sm  hover:bg-gray-100",
  cancel: "bg-slate-400  w-full py-2  rounded-md text-white font-extralight",
};

export default function Button({ children, style = "CardProduct", onClick }) {
  return (
    <>
      <button onClick={onClick} className={`${styleButton[style]} `}>
        {children}
      </button>
    </>
  );
}

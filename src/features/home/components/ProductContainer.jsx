import CardProduct from "./CardProduct";
import useModal from "../../../hooks/useModal";
import useProduct from "../../../hooks/useProduct";
import useAuth from "../../../hooks/useAuth";

export default function ProductContainer() {
  const { products, isProductLoading } = useProduct();
  const {modalLogin,modalAddToBasket} =useModal()
  const {authUser} = useAuth()
  


  const handleOnClick = (title,data) =>{
    if(!authUser){
      return modalLogin()
      }
      modalAddToBasket(
      title,data
      )
  }


  if (isProductLoading) {
    return;
  }

  const productForShow = products.filter(item => item.isShow === true)

  
  return (
    <div  className="w-full grid grid-cols-auto-fit-minmax-255 gap-x-5 gap-y-8 px-10 py-10">
      { (products.length > 0) &&
        productForShow.map((item) => 
        <CardProduct 
          key={item.productName} 
          productId={item.id}
          productName={item.productName}
          image={item.image}
          description={item.description}
          price={item.price}
          onClick={handleOnClick}
        />)}
    </div>
  );
}

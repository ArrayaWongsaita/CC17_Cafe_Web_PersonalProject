import CardProduct from "./CardProduct";
import useModal from "../../../hooks/useModal";
import useProduct from "../../../hooks/useProduct";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../../components/Spinner";

export default function ProductContainer({ style = null, search = null }) {
  const { products = [], isProductLoading = true } = useProduct();
  const { modalLogin, modalAddToBasket } = useModal();
  const { authUser } = useAuth();

  const handleOnClick = (title, data) => {
    if (!authUser) {
      return modalLogin();
    }
    modalAddToBasket(title, data);
  };

  let productForShow = products.filter((item) => item.isShow === true);
  if (style === "home") {
    if (products.length > 0) {
      productForShow = productForShow.slice(0, 12);
    }
  }
  if (search) {
    productForShow = productForShow.filter(
      (item) =>
        item.productName.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        `${item.price}`.includes(search)
    );
  }

  if (isProductLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full grid grid-cols-auto-fit-minmax-255 gap-x-5 gap-y-8 px-10 py-10">
      {products.length > 0 &&
        productForShow.map((item) => (
          <CardProduct
            key={item.productName}
            productId={item.id}
            productName={item.productName}
            image={item.image}
            description={item.description}
            price={item.price}
            onClick={handleOnClick}
          />
        ))}
    </div>
  );
}

import useAuth from "../../../hooks/useAuth";
import useModal from "../../../hooks/useModal";
import useProduct from "../../../hooks/useProduct";
import CardProduct from "../../home/components/CardProduct";
import useModalAdmin from "../hooks/useModalAdmin";

export default function EditProduct() {
  const { products, isProductLoading } = useProduct();
  const { modalLogin, modalAddToBasket } = useModal();
  const { authUser } = useAuth();
  const { showEditProduct } = useModalAdmin();

  const handleOnClick = (title, data) => {
    if (!authUser) {
      return modalLogin();
    }
    modalAddToBasket(title, data);
  };

  if (isProductLoading) {
    return;
  }

  const handleModalEdit = (data) => {
    showEditProduct(data);
  };

  return (
    <div className="w-full grid grid-cols-auto-fit-minmax-255 gap-x-5 gap-y-8 px-10 py-10">
      {products.length > 0 &&
        products.map((item) => (
          <CardProduct
            isShow={item.isShow}
            handleParent={handleModalEdit}
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


import OrderDetail from "../../../components/OrderDetail";
import useModalAdmin from "../hooks/useModalAdmin";
import useOrder from "../hooks/useOrder";

export default function AllOrder() {
  const { allOrder,  editOrder} = useOrder();
  const {showImageModal, } = useModalAdmin()



  return (
    <div className="flex flex-col px-20 py-10 gap-7 ">
      {allOrder.length > 0 &&
        allOrder.map((item) => (
          <OrderDetail
            key={item.id}
            address={item.address}
            slipImage={item.slipImage}
            phone={item.phone}
            price={item.price}
            orderId={item.id}
            firstName={item.firstName}
            lastName={item.lastName}
            status={item.status}
            showImage={showImageModal}
            editOrder={editOrder}
          />
        ))}
    </div>
  );
}

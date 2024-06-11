
import OrderDetail from "../../../components/OrderDetail";
import useModalAdmin from "../hooks/useModalAdmin";
import useOrder from "../hooks/useOrder";

export default function ShippedOrder() {
  const { allOrder,  editOrder} = useOrder();
  const {showImageModal} = useModalAdmin()

  const shippedOrder = allOrder.filter(item => item.status === "Shipped")

  return (
    <div className="flex flex-col px-20 py-10 gap-7 min-h-screen ">
      {shippedOrder.length > 0 &&
        shippedOrder.map((item) => (
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

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import OrderDetail from "../../../components/OrderDetail";
import useUser from "../../../hooks/useUser";
import useModalAdmin from "../../admin/hooks/useModalAdmin";

export default function OrderForm({ filterBy = null }) {
  const { userOrder, fetchOrder } = useUser();
  const { showImageModal } = useModalAdmin();

  useEffect(() => {
    if (userOrder.length === 0) {
      fetchOrder();
    }
  }, []);

  let shippedOrder;

  if (filterBy) {
    const result = userOrder.filter((item) => item.status === filterBy);
    shippedOrder = result.reverse();
  } else {
    shippedOrder = userOrder.reverse();
  }

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
            // editOrder={editOrder}
          />
        ))}
    </div>
  );
}

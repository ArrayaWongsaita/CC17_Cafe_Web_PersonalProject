import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

const MainAdminContent = lazy(() =>
  import("../features/admin/components/MainAdminContent")
);
const ModalAdminContextProvider = lazy(() =>
  import("../features/admin/contexts/ModalAdminContext")
);
const OrderContextProvider = lazy(() =>
  import("../features/admin/contexts/OrderContext")
);
const AllOrder = lazy(() => import("../features/admin/components/AllOrder"));
const ProcessingOder = lazy(() =>
  import("../features/admin/components/ProcessingOrder")
);
const ShippedOrder = lazy(() =>
  import("../features/admin/components/ShippedOrder")
);
const DeliveredOrder = lazy(() =>
  import("../features/admin/components/DeliveredOrder")
);
const CreateProduct = lazy(() =>
  import("../features/admin/components/CreateProduct")
);
const EditProduct = lazy(() =>
  import("../features/admin/components/EditProduct")
);
const MainOrderContainer = lazy(() =>
  import("../features/ordered/components/MainOrderContainer")
);
const OrderForm = lazy(() =>
  import("../features/ordered/components/OrderForm")
);
const UserContextProvider = lazy(() =>
  import("../contexts/UserContext")
);
const OrderPendingForm = lazy(() =>
  import("../features/admin/components/OrderPendingForm")
);
const MainContainer = lazy(() => import("../layouts/MainContainer"));
const HomeContainer = lazy(() =>
  import("../features/home/components/HomeContainer")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <OrderContextProvider>
          <ModalAdminContextProvider>
            <UserContextProvider>
              <MainContainer />
            </UserContextProvider>
          </ModalAdminContextProvider>
        </OrderContextProvider>
      </Suspense>
    ),
    children: [
      { path: "/", element: <HomeContainer /> },
      { path: "/cart", element: <h1>cart</h1> },
      { path: "product", element: <h1>product</h1> },
      {
        path: "admin",
        element: <MainAdminContent />,
        children: [
          { path: "/admin/order/pending", element: <OrderPendingForm /> },
          { path: "/admin/order/processing", element: <ProcessingOder /> },
          { path: "/admin/order/shipped", element: <ShippedOrder /> },
          { path: "/admin/order/delivered", element: <DeliveredOrder /> },
          { path: "/admin/order/all", element: <AllOrder /> },
          { path: "/admin/product/create", element: <CreateProduct /> },
          { path: "/admin/product/edit", element: <EditProduct /> },
        ],
      },
      {
        path: "ordered",
        element: <MainOrderContainer />,
        children: [
          {
            path: "/ordered/pending",
            element: <OrderForm filterBy={"Pending"} />,
          },
          {
            path: "/ordered/processing",
            element: <OrderForm filterBy={"Processing"} />,
          },
          {
            path: "/ordered/shipped",
            element: <OrderForm filterBy={"Shipped"} />,
          },
          {
            path: "/ordered/delivered",
            element: <OrderForm filterBy={"Delivered"} />,
          },
          { path: "/ordered/all", element: <OrderForm /> },
        ],
      },
    ],
  },
]);

export default function RouterFn() {
  return <RouterProvider router={router} />;
}

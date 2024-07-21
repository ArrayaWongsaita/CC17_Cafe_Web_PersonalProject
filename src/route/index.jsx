import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import OrderAdminForm from "../features/admin/components/OrderAdminForm";
import MainProduct from "../features/product/components/MainProduct";
import MainUser from "../features/user/components/MainUser";
import Spinner from "../components/Spinner";

const MainCart = lazy(() => import("../features/cart/components/MainCart"));
const MainAdminContent = lazy(() =>
  import("../features/admin/components/MainAdminContent")
);
const ModalAdminContextProvider = lazy(() =>
  import("../features/admin/contexts/ModalAdminContext")
);
const OrderContextProvider = lazy(() =>
  import("../features/admin/contexts/OrderContext")
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
// const UserContextProvider = lazy(() =>
//   import("../contexts/UserContext")
// );
const MainContainer = lazy(() => import("../layouts/MainContainer"));
const HomeContainer = lazy(() =>
  import("../features/home/components/HomeContainer")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div>
            <Spinner />
          </div>
        }
      >
        <OrderContextProvider>
          <ModalAdminContextProvider>
            <MainContainer />
          </ModalAdminContextProvider>
        </OrderContextProvider>
      </Suspense>
    ),
    children: [
      { path: "/", element: <HomeContainer /> },
      { path: "/user", element: <MainUser /> },
      { path: "/cart", element: <MainCart /> },
      { path: "product", element: <MainProduct /> },
      {
        path: "admin",
        element: <MainAdminContent />,
        children: [
          {
            path: "/admin/order/pending",
            element: <OrderAdminForm filterBy={"Pending"} />,
          },
          {
            path: "/admin/order/processing",
            element: <OrderAdminForm filterBy={"Processing"} />,
          },
          {
            path: "/admin/order/shipped",
            element: <OrderAdminForm filterBy={"Shipped"} />,
          },
          {
            path: "/admin/order/delivered",
            element: <OrderAdminForm filterBy={"Delivered"} />,
          },
          { path: "/admin/order/all", element: <OrderAdminForm /> },
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

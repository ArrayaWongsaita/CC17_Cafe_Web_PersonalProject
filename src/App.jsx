import { Suspense } from "react";
import AuthContextProvider from "./contexts/AuthContext";
import ProductContainerProvider from "./contexts/ProductContext";
import RouterFn from "./route";
import Spinner from "./components/Spinner";
import UserContextProvider from "./contexts/UserContext";
import ModalContextProvider from "./contexts/ModalContext";

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <AuthContextProvider>
        <UserContextProvider>
          <ProductContainerProvider>
            <ModalContextProvider>
              <RouterFn />
            </ModalContextProvider>
          </ProductContainerProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </Suspense>
  );
}

export default App;

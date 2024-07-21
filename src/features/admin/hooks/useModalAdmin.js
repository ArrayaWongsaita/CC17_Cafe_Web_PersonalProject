import { useContext } from "react";
import { ModalAdminContext } from "../contexts/ModalAdminContext";

export default function useModalAdmin() {
  return useContext(ModalAdminContext);
}

import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";



export default function useModal (){
  return useContext(ModalContext)
}
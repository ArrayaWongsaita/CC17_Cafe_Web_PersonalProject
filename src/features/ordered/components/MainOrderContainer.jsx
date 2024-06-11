import { Outlet } from "react-router-dom";
import SidebarOrderedFrom from "./SidebarOrderedFrom";
import ModalAdmin from "../../admin/components/MoalAdmin";

export default function MainOrderContainer() {
  return (
    <div className="flex justify-start  items-stretch">
      <div className="bg-customFooter w-60 flex flex-col gap-3 py-4 items-start px-4 ">

        <SidebarOrderedFrom />
      </div>
      <div className="flex-1 bg-customBeige  overflow-scroll">
        <Outlet />
      </div>
      <ModalAdmin />
    </div>
  );
}

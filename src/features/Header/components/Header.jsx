import RightHeader from "./RightHeader";
import CenterHeader from "./CenterHeader";
import LeftHeader from "./LeftHeader";

export default function Header() {
  return (
    <header className="px-3 z-10  sticky top-0 bg-white  opacity-90 flex text-customBrown justify-between h-[48px] items-center">
      <div>
        <LeftHeader />
      </div>
      <div className="flex gap-6">
        <CenterHeader />
      </div>
      <div className="h-[48px] gap-6 flex justify-center items-center text-customBrown">
        <RightHeader />
      </div>
    </header>
  );
}

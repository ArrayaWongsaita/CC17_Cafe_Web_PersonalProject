import useModal from "../hooks/useModal";
import imageUrl from '../image/cake.png';

export default function AnimationAddToBasket() {
  const { isShowAnimationToBasket = false } = useModal(); // ให้ค่าเริ่มต้นเป็น false

  return (
    <>
      {isShowAnimationToBasket && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div
            style={{ backgroundImage: `url(${imageUrl})` }}
            className="aspect-[12/9] bounce-to-top-right bg-cover absolute w-20 h-20"
          ></div>
        </div>
      )}
    </>
  );
}

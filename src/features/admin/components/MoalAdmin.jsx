import { createPortal } from "react-dom";
import useModalAdmin from "../hooks/useModalAdmin";

export default function ModalAdmin() {
  const {
    fadeOut,
    titleAdminModal,
    contentAdminModal,
    isModalAdminOpen,
    handleCloseModal,
  } = useModalAdmin();

  const handleBackgroundClick = (e) => {
    // ป้องกันการปิดเมื่อคลิกใน children div

    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <>
      {isModalAdminOpen &&
        createPortal(
          <div
            className={`${
              fadeOut ? "fadeOut" : "fade-in"
            }  fixed  inset-0 z-10 bg-gray-500 bg-opacity-50 flex items-center justify-center`}
            onClick={handleBackgroundClick}
          >
            <div
              className="bg-white p-5 rounded-[17px] min-w-10 "
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex p-3 gap-2 items-center justify-between min-w-20">
                <div></div>
                <div className="text-2xl text-customBrown">
                  {titleAdminModal}
                </div>
                <div
                  role="button"
                  className="text-2xl"
                  onClick={handleCloseModal}
                >
                  &#10005;
                </div>
              </div>
              <hr />
              {contentAdminModal}
            </div>
          </div>,
          document.getElementById("modal")
        )}
    </>
  );
}

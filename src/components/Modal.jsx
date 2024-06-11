
import useModal from "../hooks/useModal";
import { createPortal } from "react-dom";


export default function Modal() {
  const { fadeOut, isModalOpen,titleModal,handleCloseModal ,contentModal} = useModal()



  const handleBackgroundClick = (e) => {
    // ป้องกันการปิดเมื่อคลิกใน children div

    if (e.target === e.currentTarget) {
      handleCloseModal()
    }
  };

  return <>

   {isModalOpen && createPortal(    
    <div
        className={`${fadeOut ?  "fadeOut":"fade-in" }  fixed  inset-0 z-10 bg-gray-500 bg-opacity-50 flex items-center justify-center`}
        onClick={handleBackgroundClick}
      >
        <div className="bg-white p-5 rounded-[17px] min-w-10 " onClick={(e) => e.stopPropagation()}>
          <div className="flex p-3 gap-2 items-center justify-between min-w-20">
            <div></div>
            <div className="text-2xl text-customBrown">{titleModal}</div>
            <div role="button" className="text-2xl" onClick={handleCloseModal}>&#10005;</div>
          </div>
          <hr  />
          {contentModal}
        </div>
      </div>,
      document.getElementById('modal')
    )
    }
  </>
  
}

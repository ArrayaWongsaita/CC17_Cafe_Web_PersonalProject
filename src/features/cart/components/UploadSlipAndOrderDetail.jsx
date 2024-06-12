import { useState, useRef } from 'react';
import Button from '../../../components/Button';
import qrCodeImage from '../../../image/qrCode.png';
import Spinner from '../../../components/Spinner';
import useModal from '../../../hooks/useModal';
import { useNavigate } from 'react-router-dom';

export default function UploadSlipAndOrderDetail({ orderDetail, AllOrderItem = [] }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const fileEl = useRef();
  const {createOrderAndCloseModal} =  useModal()
  const navigate = useNavigate()

  const handleOnclick = async () => {
    fileEl.current.click(); // กระตุ้นให้คลิก input ของไฟล์
  };
  console.log(orderDetail,"---------------")
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      event.target.value = ""; // รีเซ็ตค่า input เพื่อให้สามารถเลือกไฟล์เดิมได้อีกครั้ง
    }
  };

  const handleCancel = () => {
    setSelectedImage(null);
    setFile(null);
  };

  const handleConfirmOrder = async () => {
    try {
      console.log("confirm")

      setIsLoading(true)
      if(!file|| !orderDetail.totalPayMent || orderDetail.lastName || orderDetail.firsNam ||orderDetail.phone  || isNaN(+orderDetail.totalPayMent) || !orderDetail.address){
        console.log("empty")
      }
      const formData = new FormData()

      formData.append("slipImage",file)
      formData.append("firstName",orderDetail.firstName)
      formData.append("lastName",orderDetail.lastName)
      formData.append("price",orderDetail.totalPayMent)
      formData.append("phone",orderDetail.phone)
      formData.append("address",orderDetail.address)
      await createOrderAndCloseModal(formData)
      await navigate('/ordered/pending')


    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
        {isLoading && <Spinner/>}
      <input
        ref={fileEl}
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      <div className="flex flex-grow w-full gap-4 px-2 py-2">
        {!selectedImage && (
          <>
            <div className="flex-1 w-full flex flex-col gap-2 min-w-[350px] border-r-gray-300 border-r-2 px-2">
              <h1 className="font-semibold">รายละเอียดการสั่งซื้อ</h1>
              {AllOrderItem.map((item, index) => (
                <div key={index} className="flex text-gray-400 justify-between">
                  <p>{`${item.productName} (${item.amount})`}</p>
                  <p>{item.totalPrice} บาท</p>
                </div>
              ))}
            </div>
            <div className="flex-1 min-w-[300px] gap-4 flex flex-col py-2 px-2 justify-between">
              <div
                style={{ backgroundImage: `url(${qrCodeImage})` }}
                className="py-0.5 rounded-lg border-white aspect-[12/9] w-full bg-no-repeat bg-cover"
              ></div>
              <h1 className="text-lg font-semibold">รายละเอียดการโอนเงิน</h1>
              <p className="text-gray-400">ชื่อธนาคาร: กสิกรไทย</p>
              <p className="text-gray-400">ชื่อบัญชี: Somthing Name</p>
              <p className="text-gray-400">เลขที่บัญชี: 123-456-789</p>
              <div className="flex text-customPink justify-between text-lg gap-4">
                <h1>ยอดชำระทั้งหมด</h1>
                <h1>{orderDetail.totalPayMent} บาท</h1>
              </div>
              <hr />
              <div>
                <Button onClick={handleOnclick}>อัพโหลดสลิป</Button>
              </div>
            </div>
          </>
        )}
        {selectedImage && (
          <div className="flex flex-col h-[500px] justify-between">
            <div
              style={{ backgroundImage: `url(${selectedImage})` }}
              className="py-0.5 rounded-lg border-white aspect-square w-[350px] bg-no-repeat bg-cover mt-4"
            ></div>
            {selectedImage && (
              <div className="flex flex-col gap-4">
                <Button style="addToBasket" onClick={handleCancel}>
                  ยกเลิก
                </Button>
                <Button onClick={handleConfirmOrder}>ยืนยันการสั่งซื้อ</Button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

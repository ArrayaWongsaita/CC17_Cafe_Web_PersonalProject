import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { useRef } from "react";
import Spinner from "./Spinner";
import useModalAdmin from "../features/admin/hooks/useModalAdmin";

export default function OrderDetail({
  firstName,
  lastName,
  orderId,
  phone,
  address,
  price,
  slipImage,
  status,
  showImage,
  editOrder = null
}) {
  const fileEl = useRef();
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    orderId: orderId,
    phone: phone,
    address: address,
    price: price,
    status: status,
    firstName: firstName,
    lastName: lastName,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading ,setIsLoading] = useState(false)

  const {successModal,    handleCloseModal,    showOrderItem} = useModalAdmin()
  

  const handleSave = async () =>{
    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append("orderId",data.orderId)
      if(file){formData.append("slipImage",file)}
      formData.append("phone",data.phone)
      formData.append("address",data.address)
      formData.append("price",data.price)
      formData.append("status",data.status)
      formData.append("firstName",data.firstName)
      formData.append("lastName",data.lastName)
      
      console.log(await editOrder(formData))
      await successModal()
      await setTimeout(() => {
        handleCloseModal()
      }, 800);
      setFile(null)
      setIsEdit(false)
    } catch (error) {
      console.log(error)
    } finally {
       await setIsLoading(false)
    }


  }

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleCancel = () => {
    setData({
      orderId: orderId,
      phone: phone,
      address: address,
      price: price,
      status: status,
      firstName: firstName,
      lastName: lastName,
    });
    setIsEdit(false);
  };

  const handleShowImage = () => {
    showImage(slipImage);
  };
  const handleChangeImage = async () => {
    try {
    await fileEl.current.click();

    } catch (error) {
      console.log(error)
    }
  }
  const handleShowDetail = () =>{

    showOrderItem(orderId)
  }

  if (isEdit) {
    return (
      <>
      {isLoading && <Spinner/>}
      <div className=" flex h-full bg-customFooter px-5 gap-4 rounded-xl ">
      
        <div className="w-full flex flex-col gap-3 bg-customFooter  flex-wrap py-5 rounded-lg ">
          <div className="flex items-center justify-start gap-10 flex-wrap">
            <div className="w-30 flex gap-2 items-center text-customPink">
              Order id <h1 className="text-customBrown">{orderId}</h1>
            </div>
            <div className="w-[350px] text-customPink flex items-center gap-5">
              User name
              <Input
                onChange={handleChange}
                value={data.firstName}
                name={"firstName"}
                placeholder={"First name"}
                />
              <Input
                onChange={handleChange}
                value={data.lastName}
                name={"lastName"}
                placeholder={"Last name"}
                />{" "}
            </div>
            <div className="text-customPink flex items-center gap-5">
              Phone
              <Input
                name={"phone"}
                value={data.phone}
                onChange={handleChange}
                placeholder={"Phone"}
                />{" "}
            </div>
            <div className="text-customPink flex items-center gap-5">
              Price
              <Input
                name={"price"}
                value={data.price}
                onChange={handleChange}
                placeholder={"price"}
                />{" "}
            </div>
            <div className="text-customPink flex items-center gap-5">
              Status
              <div className="relative">
                <select
                  id="status"
                  name="status"
                  value={data.status}
                  onChange={handleChange}
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                  <option value="Pending; ">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <div className="w-full py-3 pr-5 text-customPink flex items-center gap-5">
              Address
              <Input
                name={"address"}
                value={data.address}
                onChange={handleChange}
                placeholder={"Address"}
                />{" "}
            </div>
          </div>

        </div>
        <div className="py-3 flex flex-col justify-around">
          <div className="w-40">
            <Button onClick={handleSave}>Save</Button>
          </div>
          <div className="w-40">
            <Button onClick={handleCancel}>Cancel</Button>
          </div>

          <input type="file" className="hidden" ref={fileEl} onChange={e => {
            if (e.target.files[0]) {
              console.log(e.target.files[0])
              setFile(e.target.files[0])
              }
              }} />

          <div className="w-40">
            <Button onClick={handleChangeImage}>Change Image</Button>
          </div>
        </div>
      </div>
            </>
    );
  }
  return (
    <div className=" flex h-full bg-customFooter px-5 gap-4 rounded-xl ">
      <div className="w-full flex flex-col gap-3 bg-customFooter  flex-wrap py-5 rounded-lg ">
        <div className="flex items-center justify-start gap-10 flex-wrap">
          <div className="w-30 flex gap-2 items-center text-customPink">
            Order id <h1 className="text-customBrown">{orderId}</h1>
          </div>
          <div className="w-[250px] text-customPink flex items-center gap-5">
            User name{" "}
            <h1 className="text-customBrown">
              {firstName} {lastName}
            </h1>{" "}
          </div>
          <div className="text-customPink flex items-center gap-5">
            Phone <h1 className="text-customBrown">{phone}</h1>{" "}
          </div>
          <div className="text-customPink flex items-center gap-5">
            Price <h1 className="text-customBrown">{price}</h1>{" "}
          </div>
          <div className="text-customPink flex items-center gap-5">
            Status <h1 className="text-customBrown">{status}</h1>{" "}
          </div>
        </div>
          <div className="w-full mt-5 pr-5 text-customPink flex items-center gap-5">
            Address <h1 className="text-customBrown w-full">{address}</h1>{" "}
          </div>
        <div>
        </div>
      </div>
      <div className="py-3 flex flex-col justify-around">
        {    editOrder && <div className="w-40">
          <Button onClick={() => setIsEdit(true)}>Edit</Button>
        </div>}
        <div className="w-40">
          <Button onClick={handleShowDetail}>Show details</Button>
        </div>
        <div className="w-40">
          <Button onClick={handleShowImage}>Show slip image</Button>
        </div>
      </div>
    </div>
  );
}

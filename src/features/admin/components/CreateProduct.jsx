import { useRef } from "react";
import { useState } from "react";
import imageUrl from "../../../image/TheRibbon.jpg";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import useProduct from "../../../hooks/useProduct";
import Spinner from "../../../components/Spinner";
import useModalAdmin from "../hooks/useModalAdmin";
import { useEffect } from "react";

const defaultInput = {
  productName: "",
  description:"",
  price:"",
  isShow: "true"
}

export default function CreateProduct({data = null}) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null);
  const [input, setInput] =useState(defaultInput)
  const [file,setFile] = useState()
  const fileEl = useRef()
  const {createProduct,editProduct} = useProduct()
  const {  successModal,handleCloseModal} = useModalAdmin()

  useEffect(()=>{
    if(data){
      setInput({
        productName: data?.productName,
        description: data?.description,
        price:data.price,
        isShow: data.isShow
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file)
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleEditProduct  = async () => {
    try {
      setIsLoading(true)
      if( !input.productName || data?.image || !input.price || !input.description|| isNaN(+input.price) ){
        console.log("empty")
      }
      const formData = new FormData()

      if(file)formData.append("image",file)
      formData.append("id",data.productId)
      formData.append("price",input.price)
      if(input.productName !== data.productName)formData.append("productName",input.productName)
      formData.append("description",input.description)
      formData.append("isShow",input.isShow)
      await editProduct(formData)
      await successModal()
      await handleCloseModal()

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }

  }
  const handleCreateProduct = async () => {
    try {
      setIsLoading(true)
      if(!file || !input.productName || data?.image || !input.price || !input.description|| isNaN(+input.price) ){
        console.log("empty")
      }
      const formData = new FormData()
      
      formData.append("image",file)
      formData.append("price",input.price)
      formData.append("productName",input.productName)
      formData.append("description",input.description)
      await createProduct(formData)
      await successModal()
      await handleCloseModal()

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
    <div className="w- min-h-[70vh] flex justify-center items-center">
      
    <div className="bg-white w-[400px] py-5 px-7  flex flex-col gap-4 rounded-lg">
      <Input onChange={handleChange} value={input.productName} name={"productName"} placeholder={"Product Name"}/>
    <div
        style={{
          backgroundImage: `url(${selectedImage || data?.image || imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          }}
        onClick={()=>fileEl.current.click()}
        className="  border w-[290px] h-[200px]  rounded-sm m-auto "
      ></div>
        <textarea
          value={input.description}
          onChange={handleChange}
          name="description"
        className="block w-full border my-5  resize-none"
        rows={5}
        placeholder={`description`}
      ></textarea>
        <Input onChange={handleChange} value={input.price} name={"price"} placeholder={"price"}/>
        {data &&
          <select
          id="true-false-select"
          name="isShow"
          value={input.isShow}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select> 
        }
        <div></div>
        {data ?
          <Button onClick={handleEditProduct}>Edit</Button>:
          <Button onClick={ handleCreateProduct }>Create</Button>

        }
        <div></div>
    </div>

      
    </div>
    </>
  );
}
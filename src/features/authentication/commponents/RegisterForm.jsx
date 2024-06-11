import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { AxiosError } from "axios";
import validateRegister from "../validators/Validate-register";
import authApi from "../../../apis/auth";
import useModal from "../../../hooks/useModal";

const initialInput = {
  firstName: "",
  lastName:"",
  phone:"",
  email: "",
  password: "",
  confirmPassword:"",
  address:""

};
export default function RegisterForm() {
  const [input, setInput] = useState({...initialInput})
  const [inputError, setInputError] = useState({...initialInput});

  const {registerSuccessModal} = useModal()

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmitFrom = async (e) => {
    try {
      e.preventDefault();

      const error = validateRegister(input)
      if(error) return setInputError(error)
      setInputError({...initialInput})

      await authApi.register(input)
      await registerSuccessModal(input.email,input.password)


    } catch (error) {
      console.log(error)
      if(error instanceof AxiosError){
        if(error.response.data.field === 'email'){
          setInputError(prive =>({...prive, email: 'email already in use'}) )
        }
        if(error.response.data.field === 'phone'){
          setInputError(prive =>({...prive, phone: 'phone already in use'}) )
        }
    }

  }}

  return (
    <form className="w-[350px]" onSubmit={handleSubmitFrom}>
      <div className="flex items-center gap-1 -mb-3">
        <div className="py-3">
      {input.firstName ? <p className="px-3 py-3 text-[14px] text-customBrown">First name</p> : <div className="h-11" ></div>}
        <Input 
          onChange={handleChangeInput}
          name={'firstName'}
          value={input.firstName}
          error={(inputError.firstName)}
          placeholder={"First name "}
        />

      </div>
        <div className="py-3">
      {input.lastName ? <p className="px-3 py-3 text-[14px] text-customBrown">Last name</p> : <div className="h-11" ></div>}
        <Input 
          onChange={handleChangeInput}
          name={'lastName'}
          value={input.lastName}
          error={(inputError.lastName)}
          placeholder={"Last name"}
        />

      </div>
      </div>
    <div className="py-3">
    {input.phone ? <p className="px-3 py-3 text-[14px] text-customBrown">Phone number</p> : <div className="h-8" ></div>}
      <Input 
        onChange={handleChangeInput}
        name={'phone'}
        value={input.phone}
        error={(inputError.phone)}
        placeholder={"Phone number"}
       />

    </div>
    <div className="py-3">
    {input.email ? <p className="px-3 py-3 text-[14px] text-customBrown">Email</p> : <div className="h-8" ></div>}
      <Input 
        onChange={handleChangeInput}
        name={'email'}
        value={input.email}
        error={(inputError.email)}
        placeholder={"Email address "}
       />

    </div>
    <div>
    {input.password ? <p className="px-3 py-3 text-[14px] text-customBrown">Password</p> : <div className="h-8" ></div>}
      <Input 
        type="password"
        onChange={handleChangeInput}
        name={'password'}
        value={input.password}
        error={(inputError.password)}
        placeholder={"password"}
       />

    </div>
    <div>
    {input.confirmPassword ? <p className="px-3 py-3 text-[14px] text-customBrown">Confirm password</p> : <div className="h-8" ></div>}
      <Input 
        type="password"
        onChange={handleChangeInput}
        name={'confirmPassword'}
        value={input.confirmPassword}
        error={(inputError.confirmPassword)}
        placeholder={"Confirm password"}
       />

    </div>
    <div>
    {input.address ? <p className="px-3 py-3 text-[14px] text-customBrown">Address</p> : <div className="h-8" ></div>}
      <Input 
        onChange={handleChangeInput}
        name={'address'}
        value={input.address}
        error={(inputError.address)}
        placeholder={"Address"}
       />

    </div>
    <div className="py-7">
      <Button>Register</Button>
    </div>
  </form>
  
  )
}

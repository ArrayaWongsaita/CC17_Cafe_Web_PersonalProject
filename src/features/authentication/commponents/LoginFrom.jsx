import { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import validateLogin from "../validators/validate-login";
import useAuth from "../../../hooks/useAuth";
import useModal from "../../../hooks/useModal";
import { useEffect } from "react";





const initialInput = {
  email: "",
  password: "",
};
export default function LoginFrom({data = null}) {
  const [input, setInput] = useState({...initialInput})
  const [inputError, setInputError] = useState({...initialInput});
  const {login} = useAuth()
  const {modalRegister,loginSuccessModal} = useModal()
  // console.log(a)

  useEffect(()=>{

    if(data){
      return setInput({email:data.email,password:data.password})
    }
    setInput({...initialInput})
  },[data])

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitFrom = async (e) => {
    try {
      e.preventDefault();
      const error = validateLogin(input)
      console.log(error)
      if (error) {
        return setInputError(error);
      }
      setInputError({...initialInput});
      await login(input)
      await loginSuccessModal()


    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
    <form className="w-[350px]" onSubmit={handleSubmitFrom}>
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
      <div className="py-7">
        <Button>Login</Button>
      </div>
    </form>
    <div className="mb-3" ><Button onClick={modalRegister} style="register">register</Button></div>
    </>    
  )
}

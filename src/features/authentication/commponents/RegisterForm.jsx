import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { AxiosError } from "axios";
import validateRegister from "../validators/Validate-register";
import authApi from "../../../apis/auth";
import useModal from "../../../hooks/useModal";
import { useEffect } from "react";

const initialInput = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  address: "",
};
export default function RegisterForm({ data = null, editUserProfile }) {
  const [input, setInput] = useState({ ...initialInput });
  const [inputError, setInputError] = useState({ ...initialInput });
  const [editPassword, setEditPassword] = useState(true);
  const { registerSuccessModal } = useModal();

  useEffect(() => {
    if (data) {
      setInput({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        password: "123456",
        confirmPassword: "123456",
        address: data.address,
      });
      setEditPassword(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeInput = (e) => {
    if (data && e.target.name === "email") {
      return;
    }
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmitFrom = async (e) => {
    try {
      e.preventDefault();

      const error = validateRegister(input);
      if (error) return setInputError(error);
      setInputError({ ...initialInput });
      if (data) return editUser();

      await authApi.register(input);
      await registerSuccessModal(input.email, input.password);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response.data.field === "email") {
          setInputError((prive) => ({
            ...prive,
            email: "email already in use",
          }));
        }
        if (error.response.data.field === "phone") {
          setInputError((prive) => ({
            ...prive,
            phone: "phone already in use",
          }));
        }
      }
    }
  };
  const editUser = async () => {
    try {
      const data = { ...input };

      data.isChangePassword = editPassword;
      await editUserProfile(data);
      window.location.reload();
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response.data.field === "email") {
          setInputError((prive) => ({
            ...prive,
            email: "email already in use",
          }));
        }
        if (error.response.data.field === "phone") {
          setInputError((prive) => ({
            ...prive,
            phone: "phone already in use",
          }));
        }
      }
    }
  };

  const handleChangePassword = () => {
    if (!editPassword) {
      setEditPassword(!editPassword);
      const data = input;
      data.password = "";
      data.confirmPassword = "";
      setInput(data);
    } else {
      setEditPassword(!editPassword);
      const data = input;
      data.password = "123456";
      data.confirmPassword = "123456";
      setInput(data);
    }
  };

  return (
    <>
      <form className="w-[350px]" onSubmit={handleSubmitFrom}>
        {!!data && (
          <div>
            <p className="px-3 py-3 text-[14px] text-customBrown">Email</p>
            <h1 className=" px-4">{data.email}</h1>
          </div>
        )}
        <div className="flex items-center gap-1 -mb-3">
          <div className="py-3">
            {input.firstName ? (
              <p className="px-3 py-3 text-[14px] text-customBrown">
                First name
              </p>
            ) : (
              <div className="h-11"></div>
            )}
            <Input
              onChange={handleChangeInput}
              name={"firstName"}
              value={input.firstName}
              error={inputError.firstName}
              placeholder={"First name "}
            />
          </div>
          <div className="py-3">
            {input.lastName ? (
              <p className="px-3 py-3 text-[14px] text-customBrown">
                Last name
              </p>
            ) : (
              <div className="h-11"></div>
            )}
            <Input
              onChange={handleChangeInput}
              name={"lastName"}
              value={input.lastName}
              error={inputError.lastName}
              placeholder={"Last name"}
            />
          </div>
        </div>
        <div className="py-3">
          {input.phone ? (
            <p className="px-3 py-3 text-[14px] text-customBrown">
              Phone number
            </p>
          ) : (
            <div className="h-8"></div>
          )}
          <Input
            onChange={handleChangeInput}
            name={"phone"}
            value={input.phone}
            error={inputError.phone}
            placeholder={"Phone number"}
          />
        </div>
        {!data && (
          <div className="py-3">
            {input.email ? (
              <p className="px-3 py-3 text-[14px] text-customBrown">Email</p>
            ) : (
              <div className="h-8"></div>
            )}
            <Input
              onChange={handleChangeInput}
              name={"email"}
              value={input.email}
              error={inputError.email}
              placeholder={"Email address "}
            />
          </div>
        )}
        {editPassword && (
          <>
            <div>
              {input.password ? (
                <p className="px-3 py-3 text-[14px] text-customBrown">
                  Password
                </p>
              ) : (
                <div className="h-8"></div>
              )}
              <Input
                type="password"
                onChange={handleChangeInput}
                name={"password"}
                value={input.password}
                error={inputError.password}
                placeholder={"password"}
              />
            </div>
            <div>
              {input.confirmPassword ? (
                <p className="px-3 py-3 text-[14px] text-customBrown">
                  Confirm password
                </p>
              ) : (
                <div className="h-8"></div>
              )}
              <Input
                type="password"
                onChange={handleChangeInput}
                name={"confirmPassword"}
                value={input.confirmPassword}
                error={inputError.confirmPassword}
                placeholder={"Confirm password"}
              />
            </div>
          </>
        )}
        <div>
          {input.address ? (
            <p className="px-3 py-3 text-[14px] text-customBrown">Address</p>
          ) : (
            <div className="h-8"></div>
          )}
          <Input
            onChange={handleChangeInput}
            name={"address"}
            value={input.address}
            error={inputError.address}
            placeholder={"Address"}
          />
        </div>
        <div className="py-7">
          <Button>{data ? "Edit" : "Register"}</Button>
        </div>
      </form>
      {!!data && (
        <div className="w-[350px] mb-5">
          <Button onClick={handleChangePassword}>change Password</Button>
        </div>
      )}
    </>
  );
}

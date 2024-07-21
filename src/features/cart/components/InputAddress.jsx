import { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import validateAddressOrder from "../validators/AddressForOrder";
import { useEffect } from "react";

const initialInput = {
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
};
export default function InputAddress({
  data = null,
  totalPayMent,
  uploadSlipAndOrderDetail,
}) {
  const [input, setInput] = useState({ ...initialInput });
  const [inputError, setInputError] = useState({ ...initialInput });

  // const {registerSuccessModal} = useModal()
  useEffect(() => {
    if (data) {
      setInput({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        address: data.address,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmitFrom = async (e) => {
    try {
      e.preventDefault();

      const error = validateAddressOrder(input);
      if (error) return setInputError(error);
      setInputError({ ...initialInput });
      const orderDetail = { ...input };
      orderDetail.totalPayMent = totalPayMent;
      uploadSlipAndOrderDetail(orderDetail);

      //     await authApi.register(input)
      //     await registerSuccessModal(input.email,input.password)
      console.log("done");
      console.log(totalPayMent);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="w-[350px]" onSubmit={handleSubmitFrom}>
      <div className="flex items-center gap-1 -mb-3">
        <div className="py-3">
          {input.firstName ? (
            <p className="px-3 py-3 text-[14px] text-customBrown">First name</p>
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
            <p className="px-3 py-3 text-[14px] text-customBrown">Last name</p>
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
          <p className="px-3 py-3 text-[14px] text-customBrown">Phone number</p>
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
        <Button>Pay now</Button>
      </div>
    </form>
  );
}

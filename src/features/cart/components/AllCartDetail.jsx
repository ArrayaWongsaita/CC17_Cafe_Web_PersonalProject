import Button from "../../../components/Button";


export default function AllCartDetail({
  totalPayMent,
  Shipping = 0,
  Tax = 0,
  confirmAddress,

}) {
  const total =  totalPayMent + Shipping + Tax
  const handleCheckOut = () =>{
    confirmAddress(total)
  }
  return (
    <div className="w-2/3  sticky top-[34vh] min-w-[300px] flex flex-col rounded-lg gap-5 bg-white py-7 px-7">
      <div className="text-center"><h1 className="text-xl font-semibold">Order Summary</h1></div>
      <div className="flex text-gray-400 justify-between">
        <div>Subtotal</div>
        <div>{`${totalPayMent}`} THB</div>
      </div>
      <div className="flex text-gray-400 justify-between">
        <div>Shipping</div>
        <div>0 THB</div>
      </div>
      <div className="flex text-gray-400  justify-between">
        <div>Tax</div>
        <div>0 THB</div>
      </div>
      <hr />
      <div className="flex text-[16px] justify-between">
        <div>TotalPayment</div>
        <div>{`${total}`} THB</div>
      </div>
      <div><Button onClick={handleCheckOut}>Proceed to checkout</Button></div>

    </div>
  )
}

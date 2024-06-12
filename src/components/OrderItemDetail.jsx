


export default function OrderItemDetail({data = null}) {
  if(!data){
    return <h1>error</h1>
  }

  return (
    <div className="flex flex-col gap-4 py-3">
      {data.map((item,index) => (
        <div className="grid grid-cols-2 p-4 rounded-xl  gap-4  " key={item.id}>
          <div className="text-customPink "><span>No. <span className="pr-4 text-customBrown">{index + 1}</span></span>  Product Name: <span className="text-customBrown pr-2">{item.productDetail?.productName}</span></div>
          <data className="grid grid-cols-2">
          <div className="text-customPink">Amount: <span className="text-customBrown"> {item.amount}</span></div>
          <div className="text-customPink">Total price: <span className="text-customBrown">{+item.amount * +item.productDetail?.price}</span></div>
          </data>

        </div>
      ))}
    </div>
  )
}

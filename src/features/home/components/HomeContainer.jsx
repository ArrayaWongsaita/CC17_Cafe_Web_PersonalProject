import footerImage from '../../../image/footerImage.png'
import heroImage from '../../../image/heroImage.png'
import ProductContainer from './ProductContainer'
export default function HomeContainer() {
  return (
    <div className="w-full  ">
      <div className='w-full aspect-[20/1] bg-customPink  flex justify-center items-center '></div>
      <div className='w-full overflow-hidden mx-0 px-0'>
      <div style={{ backgroundImage: `url(${heroImage})` }}  className="w-full -mt-10 bg-cover bg-blue-500 aspect-[16/7]"></div>
      </div>
      <div className='bg-customBeige'>
        <div className='flex items-center pt-10 px-12 h-20 '><h1 className='text-3xl text-customPink'>Product</h1></div>
        <ProductContainer/>
      </div>
      <div style={{ backgroundImage: `url(${footerImage})` }}  className="w-full bg-cover bg-blue-500 aspect-[16/7]"></div>
    </div>
  )
}

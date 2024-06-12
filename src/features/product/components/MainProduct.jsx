

import useProduct from '../../../hooks/useProduct';
import Spinner from '../../../components/Spinner';
import ProductContainer from '../../home/components/ProductContainer';

export default function MainProduct() {


  const {isProductLoading} = useProduct()


  if (isProductLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className='bg-customBeige'>
    <div className='flex items-center pt-10 px-12 h-20 '><h1 className='text-3xl text-customPink'>Product</h1></div>
    <ProductContainer/>
  </div>
  );
}



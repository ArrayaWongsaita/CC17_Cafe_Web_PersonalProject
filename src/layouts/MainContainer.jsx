
import { Outlet } from 'react-router-dom';
import Header from '../features/Header/components/Header';
import Footer from './Footer';

import Modal from '../components/Modal';
import AnimationAddToBasket from '../components/AnimationAddToBasket';



export default function MainContainer() {




  return (
    <div>

      <Header />
      <Outlet />
      <Footer />
      <Modal/>
      <AnimationAddToBasket/>
    </div>
  );
}

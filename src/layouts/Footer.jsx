import { FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-customPink text-white py-6">
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">The Ribbon</h1>
        <p className="mb-4">The best cakes in town</p>
        <div className="text-center max-w-xl mb-4">
          <p>
            {`The Ribbon started as a small family-owned bakery in 1990. Our mission is to bring joy and sweetness into everyone's life with our delicious, hand-crafted cakes. Over the years, we have grown and expanded, but our commitment to quality and customer satisfaction remains the same. Thank you for making us a part of your special moments.`}
          </p>
        </div>
        <div className="flex space-x-4 mb-4">
          <a 
            href="https://www.facebook.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <FaFacebook size={32} />
          </a>
          <a 
            href="https://www.instagram.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <FaInstagram size={32} />
          </a>
        </div>
        <p className="mt-4">© 2024 The Ribbon. All rights reserved.</p>
      </div>
    </footer>
  );
}

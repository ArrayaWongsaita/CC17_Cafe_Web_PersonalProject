
import { Link } from 'react-router-dom';
import imageUrl from '../../../image/TheRibbon.jpg';
export default function LeftHeader() {
  return (
    <>
    <Link to={'/'}>
          <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="py-0.5 rounded-lg aspect-[12/9] -mt-3 h-[56px]  bg-no-repeat bg-cover"
        ></div>
        </Link>
    </>
  )
}

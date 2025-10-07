import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./notFound.scss";

function NotFound() {
  useEffect(() => {
    document.title = "💢 - MinhSoora";
  }, []);

  return (
    <div className='font-bold text-neutral-800 w-full pb-4'>
      <div className='mb-3 flex text-3xl gap-2 font-bold'>
        <div className='bg-neutral-800 h-[36px] w-2'></div>
        <h2>Lỗi rồi 😣</h2>
      </div>
      <p>
        Ohh.. có vẻ như có gì đó sai sai. Bị lỗi rồi!!{" "}
        <Link className='text-cyan-600' to='/'>
           trang chủ
        </Link>
      </p>
      <div className='glitchWrapper xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-5xl mt-8'>
        <div className='glitch' datatext='404 Not Found'>
          Lỗi 404
        </div>
      </div>
    </div>
  );
}

export default NotFound;

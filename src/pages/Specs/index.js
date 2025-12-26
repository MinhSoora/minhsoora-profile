import { useEffect, useState } from "react";
import desktop from "../../assets/imgs/desktop.png";

function Specs() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => {
    document.title = "🖥 - MinhSoora";
  }, []);

  const phone1Specs = {
    phoneCpu: "Snapdragon 6 Gen 3 8 nhân (2.4 GHz)",
    phoneRam: "12 GB",
    phoneGpu: "Adreno 710",
    phoneOs: "Android 15",
    phoneDisk: "256 GB (234 GB khả dụng)",
  };

  const phone2Specs = {
    phoneCpu: "Exynos 9610 (4 nhân 2.3 GHz & 4 nhân 1.7 GHz)",
    phoneRam: "4 GB",
    phoneGpu: "Mali-G72 MP3",
    phoneOs: "Android 9 (Pie)",
    phoneDisk: "64 GB (45 GB khả dụng)",
  };

  const PhoneInfo = ({ phoneCpu, phoneRam, phoneGpu, phoneOs, phoneDisk }) => (
    <ul className='list-disc text-sm ml-6'>
      <li>CPU: {phoneCpu}</li>
      <li>GPU: {phoneGpu}</li>
      <li>RAM: {phoneRam}</li>
      <li>Disk: {phoneDisk}</li>
      <li>OS: {phoneOs}</li>
    </ul>
  );

  const EasterEggPopup = () => (
    <div 
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
      onClick={() => setShowEasterEgg(false)}
    >
      <div 
        className='bg-gradient-to-br from-purple-500 to-pink-500 p-8 rounded-2xl shadow-2xl max-w-md animate-bounce'
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className='text-3xl font-bold text-white mb-4 text-center'>🎉 Easter Egg! 🎉</h3>
        <p className='text-white text-center text-lg mb-4'>
          Tín hiệu var đã được kích hoạt! 📡✨
        </p>
        <p className='text-white text-center text-sm mb-6'>
          Bạn đã tìm thấy bí mật ẩn giấu trong số 36! 🔍
        </p>
        <button
          onClick={() => setShowEasterEgg(false)}
          className='w-full bg-white text-purple-600 font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition'
        >
          Đóng
        </button>
      </div>
    </div>
  );

  return (
    <div className='font-bold text-neutral-800 w-full pb-4'>
      <div className='mb-3 flex text-3xl gap-2 font-bold'>
        <div className='bg-neutral-800 h-[36px] w-2'></div>
        <h2>Specs 💼</h2>
      </div>
      <p>Thiết bị tui hiện đang sử dụng để chơi game, lập trình, học tập và hàng ngày 💻.</p>
      <div className='w-full mt-4 grid md:grid-cols-2 grid-cols-1 gap-5'>
        <div>
          <div className='mb-4 p-2 rounded-xl bg-slate-100'>
            <h4 className='mb-1 text-2xl font-bold'>
              Phone 1
              <span className='text-xl ml-2 inline-block'>
                (Galaxy A
                <span 
                  className='cursor-pointer hover:text-purple-600 transition-colors'
                  onClick={() => setShowEasterEgg(true)}
                >
                  36
                </span>
                )
              </span>
            </h4>
            <PhoneInfo {...phone1Specs} />
          </div>
          <div className='p-2 rounded-xl bg-slate-100'>
            <h4 className='mb-1 text-2xl font-bold'>
              Phone 2<span className='text-xl ml-2 inline-block'>(Galaxy A50s)</span>
            </h4>
            <PhoneInfo {...phone2Specs} />
          </div>
        </div>
        <div>
          <div className='mb-4 p-2 rounded-xl bg-slate-100'>
            <h4 className='mb-1 text-2xl font-bold'>Mạng</h4>
            <ul className='list-disc text-sm ml-6'>
              <li></li>
            </ul>
          </div>
          <div className='p-2 rounded-xl bg-slate-100'>
            <h4 className='mb-1 text-2xl font-bold'>Thiết Bị Khác</h4>
            <ul className='list-disc text-sm ml-6'>
              <li>Gimbal Shopee Q31</li>
              <li>Pin sạc dự phòng Ugreen 10,000mah</li>
              <li>Micro shopee</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='my-6 border-dashed border-8 border-cyan-500 rounded-3xl overflow-hidden w-11/12 rotate-[355deg] mx-auto'>
        <img src={desktop} alt='Desktop setup workspace' />
      </div>
      {showEasterEgg && <EasterEggPopup />}
    </div>
  );
}

export default Specs;

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode, faCoins, faHeart } from "@fortawesome/free-solid-svg-icons";

function Donate() {
  const [activeMethod, setActiveMethod] = useState("mbbank");

  useEffect(() => {
    document.title = "💰 Donate - MinhSoora";
  }, []);

  const donationMethods = {
    mbbank: {
      name: "MB Bank",
      icon: faQrcode,
      qrCode: "https://img.vietqr.io/image/MB-0903618454-compact.png", // Thay bằng link QR thật
      accountNumber: "0903 618 454",
      accountName: "Cao Nguyễn Gia Lập",
      bank: "MB Bank"
    },
    playerduo: {
      name: "PlayerDuo",
      icon: faCoins,
      link: "https://playerduo.net/minhsoora",
      description: "Donate qua PlayerDuo"
    },
    zypage: {
      name: "Zypage",
      icon: faHeart,
      link: "https://zypage.com/minhsoora",
      description: "Ủng hộ qua Zypage"
    }
  };

  return (
    <div className='font-bold text-neutral-800 w-full pb-4'>
      <div className='mb-3 flex text-3xl gap-2 font-bold'>
        <div className='bg-neutral-800 h-[36px] w-2'></div>
        <h2>Donate 💰</h2>
      </div>
      <p className="mb-6 font-normal">Cảm ơn bạn đã ủng hộ! Mọi đóng góp đều giúp tui duy trì và phát triển các dự án 🙏</p>

      {/* Method Selector */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {Object.keys(donationMethods).map((method) => (
          <button
            key={method}
            onClick={() => setActiveMethod(method)}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeMethod === method
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-100 text-neutral-800 hover:bg-slate-200'
            }`}
          >
            <FontAwesomeIcon icon={donationMethods[method].icon} className="mr-2" />
            {donationMethods[method].name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-slate-100 rounded-xl p-8">
        {activeMethod === "mbbank" && (
          <div className="flex flex-col items-center">
            <h3 className="text-2xl mb-4">Chuyển khoản qua MB Bank</h3>
            <div className="bg-white p-4 rounded-lg mb-4">
              <img 
                src={donationMethods.mbbank.qrCode} 
                alt="QR Code" 
                className="w-64 h-64 object-contain"
              />
            </div>
            <div className="text-left w-full max-w-md space-y-2 font-normal">
              <p><strong>Ngân hàng:</strong> {donationMethods.mbbank.bank}</p>
              <p><strong>Số tài khoản:</strong> {donationMethods.mbbank.accountNumber}</p>
              <p><strong>Chủ tài khoản:</strong> {donationMethods.mbbank.accountName}</p>
              <p className="text-sm text-neutral-600 mt-4">
                Quét mã QR hoặc chuyển khoản theo thông tin trên. Cảm ơn bạn! ❤️
              </p>
            </div>
          </div>
        )}

        {activeMethod === "playerduo" && (
          <div className="text-center">
            <h3 className="text-2xl mb-4">Donate qua PlayerDuo</h3>
            <p className="mb-6 font-normal">{donationMethods.playerduo.description}</p>
            <a
              href={donationMethods.playerduo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-cyan-600 text-white px-8 py-3 rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Đi đến PlayerDuo
            </a>
          </div>
        )}

        {activeMethod === "zypage" && (
          <div className="text-center">
            <h3 className="text-2xl mb-4">Ủng hộ qua Zypage</h3>
            <p className="mb-6 font-normal">{donationMethods.zypage.description}</p>
            <a
              href={donationMethods.zypage.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-cyan-600 text-white px-8 py-3 rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Đi đến Zypage
            </a>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm font-normal text-yellow-800">
          💡 <strong>Lưu ý:</strong> Mọi khoản donate đều là tự nguyện và không hoàn lại. Cảm ơn sự hỗ trợ của bạn!
        </p>
      </div>
    </div>
  );
}

export default Donate;

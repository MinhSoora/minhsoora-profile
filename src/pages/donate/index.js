import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode, faCoins, faHeart, faExclamationTriangle, faTimes } from "@fortawesome/free-solid-svg-icons";

function Donate() {
  const [activeMethod, setActiveMethod] = useState("mbbank");
  const [showPopup, setShowPopup] = useState(false);
  const [popupLink, setPopupLink] = useState("");
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    document.title = "💰 Donate - MinhSoora";
  }, []);

  useEffect(() => {
    if (activeMethod === "mbbank") {
      setScanning(true);
      const timer = setTimeout(() => setScanning(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [activeMethod]);

  const handleExternalLink = (link) => {
    setPopupLink(link);
    setShowPopup(true);
  };

  const confirmNavigation = () => {
    window.open(popupLink, "_blank", "noopener noreferrer");
    setShowPopup(false);
  };

  const donationMethods = {
    mbbank: {
      name: "MB Bank",
      icon: faQrcode,
      qrCode: "https://img.vietqr.io/image/MB-0903618454-compact.png",
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
    <>
      <style>{`
        @keyframes scanLine {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(300%);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-scan-line {
          animation: scanLine 1.5s ease-in-out;
        }

        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>

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
              <div className="bg-white p-4 rounded-lg mb-4 relative overflow-hidden">
                <img 
                  src={donationMethods.mbbank.qrCode} 
                  alt="QR Code" 
                  className="w-64 h-64 object-contain"
                />
                {scanning && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-1 bg-cyan-500 animate-scan-line shadow-lg shadow-cyan-500/50"></div>
                  </div>
                )}
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
              <button
                onClick={() => handleExternalLink(donationMethods.playerduo.link)}
                className="inline-block bg-cyan-600 text-white px-8 py-3 rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Đi đến PlayerDuo
              </button>
            </div>
          )}

          {activeMethod === "zypage" && (
            <div className="text-center">
              <h3 className="text-2xl mb-4">Ủng hộ qua Zypage</h3>
              <p className="mb-6 font-normal">{donationMethods.zypage.description}</p>
              <button
                onClick={() => handleExternalLink(donationMethods.zypage.link)}
                className="inline-block bg-cyan-600 text-white px-8 py-3 rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Đi đến Zypage
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm font-normal text-yellow-800">
            💡 <strong>Lưu ý:</strong> Mọi khoản donate đều là tự nguyện và không hoàn lại. Cảm ơn sự hỗ trợ của bạn!
          </p>
        </div>

        {/* Warning Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-xl p-6 max-w-md mx-4 animate-slide-up shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500 text-2xl" />
                  <h3 className="text-xl font-bold">Cảnh báo</h3>
                </div>
                <button 
                  onClick={() => setShowPopup(false)}
                  className="text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-xl" />
                </button>
              </div>
              <p className="mb-6 font-normal text-neutral-700">
                Bạn đang rời khỏi trang web và chuyển đến một trang web bên ngoài. Bạn có chắc chắn muốn tiếp tục?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPopup(false)}
                  className="flex-1 px-4 py-2 bg-slate-200 text-neutral-800 rounded-lg hover:bg-slate-300 transition-colors font-semibold"
                >
                  Hủy
                </button>
                <button
                  onClick={confirmNavigation}
                  className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-semibold"
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Donate;

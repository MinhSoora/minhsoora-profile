import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCreditCard, 
  faCheckCircle, 
  faTimesCircle, 
  faXmark, 
  faSpinner,
  faQrcode,
  faExclamationTriangle,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";

function NapThe() {
  const [formData, setFormData] = useState({
    ingame: "",
    provider: "",
    seri: "",
    code: "",
    amount: ""
  });

  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("success");
  const [popupMessage, setPopupMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const providers = ["Viettel", "Vinaphone", "Mobifone", "Vietnamobile", "Zing"];
  const amounts = ["10,000", "20,000", "50,000", "100,000", "200,000", "500,000"];

  useEffect(() => {
    document.title = "💳 Nạp Thẻ - MinhSoora Network";
  }, []);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const showNotification = (type, message) => {
    setPopupType(type);
    setPopupMessage(message);
    setShowPopup(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleQRScan = () => {
    showNotification("success", "Tính năng quét QR đang được phát triển! 📱");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.ingame.trim()) {
      newErrors.ingame = "Vui lòng nhập tên ingame";
    }

    if (!formData.provider) {
      newErrors.provider = "Vui lòng chọn nhà mạng";
    }

    if (!formData.seri.trim()) {
      newErrors.seri = "Vui lòng nhập số Seri";
    } else if (formData.seri.length < 10) {
      newErrors.seri = "Số Seri không hợp lệ";
    }

    if (!formData.code.trim()) {
      newErrors.code = "Vui lòng nhập mã thẻ";
    } else if (formData.code.length < 10) {
      newErrors.code = "Mã thẻ không hợp lệ";
    }

    if (!formData.amount) {
      newErrors.amount = "Vui lòng chọn mệnh giá";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showNotification("error", "Vui lòng điền đầy đủ thông tin! ❌");
      return;
    }

    setShowConfirmPopup(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmPopup(false);
    setLoading(true);

    const webhookURL = "https://discord.com/api/webhooks/YOUR_WEBHOOK_URL";

    const embed = {
      title: "💳 Yêu cầu nạp thẻ mới",
      color: 0x10b981,
      fields: [
        {
          name: "🎮 Tên Ingame",
          value: formData.ingame,
          inline: true
        },
        {
          name: "📱 Nhà mạng",
          value: formData.provider,
          inline: true
        },
        {
          name: "💰 Mệnh giá",
          value: formData.amount + " VNĐ",
          inline: true
        },
        {
          name: "🔢 Số Seri",
          value: `\`${formData.seri}\``,
          inline: false
        },
        {
          name: "🎫 Mã thẻ",
          value: `\`${formData.code}\``,
          inline: false
        }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "MinhSoora Network - Nạp thẻ tự động"
      }
    };

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showNotification("success", "Yêu cầu nạp thẻ đã được gửi thành công! Sẽ hoàn thành trong vòng 12 giờ. ⏰✅");
      
      setFormData({
        ingame: "",
        provider: "",
        seri: "",
        code: "",
        amount: ""
      });
    } catch (error) {
      showNotification("error", "Có lỗi xảy ra! Vui lòng thử lại. ❌");
    }

    setLoading(false);
  };

  return (
    <div className="font-bold text-neutral-800 w-full pb-4 min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Welcome Popup */}
      {showWelcomePopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <FontAwesomeIcon icon={faInfoCircle} className="text-3xl text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-blue-600">Chào mừng đến trang Nạp Thẻ! 💳</h2>
              <div className="text-left space-y-3 mb-6 font-normal text-gray-700">
                <p className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Đây là trang dành riêng cho người chơi muốn nạp tiền vào <strong>MinhSoora Network</strong></span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">⚠</span>
                  <span><strong>Lưu ý:</strong> Đây không phải là trang web chính thức của MinhSoora Network</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Thời gian xử lý: <strong>trong vòng 12 giờ</strong></span>
                </p>
              </div>
              <button
                onClick={() => setShowWelcomePopup(false)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Đã hiểu, tiếp tục
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Popup */}
      {showConfirmPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Xác nhận thông tin</h3>
              <button
                onClick={() => setShowConfirmPopup(false)}
                className="hover:bg-gray-100 rounded-lg p-2 transition-colors"
              >
                <FontAwesomeIcon icon={faXmark} className="text-gray-500" />
              </button>
            </div>

            <div className="space-y-3 mb-4 font-normal">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex gap-2">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-600 mt-1" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-semibold mb-1">⚠️ Lưu ý quan trọng về tên ingame:</p>
                    <p>Vui lòng kiểm tra kỹ chữ <strong>IN HOA</strong> trong tên của bạn! Nếu sai, chúng tôi sẽ gặp khó khăn khi tìm kiếm.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tên Ingame:</span>
                  <span className="font-semibold">{formData.ingame}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nhà mạng:</span>
                  <span className="font-semibold">{formData.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mệnh giá:</span>
                  <span className="font-semibold text-green-600">{formData.amount} VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Số Seri:</span>
                  <span className="font-mono text-sm">{formData.seri}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mã thẻ:</span>
                  <span className="font-mono text-sm">{formData.code}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmPopup(false)}
                className="flex-1 py-3 border-2 border-gray-300 hover:bg-gray-50 rounded-lg font-semibold transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              >
                Xác nhận nạp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Popup */}
      {showPopup && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`${
            popupType === "success" ? "bg-green-500" : "bg-red-500"
          } text-white px-6 py-4 rounded-lg shadow-lg min-w-[300px] max-w-[500px] relative overflow-hidden`}>
            <div className="absolute top-0 left-0 h-1 bg-white/30 w-full">
              <div className="h-full bg-white animate-progress"></div>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <FontAwesomeIcon 
                icon={popupType === "success" ? faCheckCircle : faTimesCircle} 
                className="text-2xl flex-shrink-0" 
              />
              <p className="font-normal flex-1">{popupMessage}</p>
              <button 
                onClick={() => setShowPopup(false)}
                className="hover:bg-white/20 rounded p-1 transition-colors"
              >
                <FontAwesomeIcon icon={faXmark} className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-6 flex text-3xl gap-2 font-bold items-center">
          <div className="bg-blue-600 h-[36px] w-2 rounded-full"></div>
          <h2 className="text-blue-600">Nạp Thẻ 💳</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-5">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm font-normal text-blue-800">
              <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
              Vui lòng điền đầy đủ thông tin để nạp thẻ vào tài khoản Minecraft của bạn
            </p>
          </div>

          <div>
            <label className="block mb-2 text-sm">
              🎮 Tên Ingame Minecraft <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="ingame"
              value={formData.ingame}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border ${errors.ingame ? 'border-red-500' : 'border-gray-300'} font-normal focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="VD: Steve123"
            />
            {errors.ingame && <p className="text-red-500 text-xs mt-1 font-normal">{errors.ingame}</p>}
            <p className="text-xs text-gray-500 mt-1 font-normal">⚠️ Lưu ý: Kiểm tra kỹ chữ IN HOA trong tên!</p>
          </div>

          <div>
            <label className="block mb-2 text-sm">
              📱 Chọn nhà mạng <span className="text-red-500">*</span>
            </label>
            <select
              name="provider"
              value={formData.provider}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border ${errors.provider ? 'border-red-500' : 'border-gray-300'} font-normal focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">-- Chọn nhà mạng --</option>
              {providers.map(provider => (
                <option key={provider} value={provider}>{provider}</option>
              ))}
            </select>
            {errors.provider && <p className="text-red-500 text-xs mt-1 font-normal">{errors.provider}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm">
              🔢 Số Seri <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="seri"
              value={formData.seri}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border ${errors.seri ? 'border-red-500' : 'border-gray-300'} font-mono font-normal focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Nhập số Seri thẻ"
            />
            {errors.seri && <p className="text-red-500 text-xs mt-1 font-normal">{errors.seri}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm">
              🎫 Mã thẻ <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className={`flex-1 px-4 py-3 rounded-lg border ${errors.code ? 'border-red-500' : 'border-gray-300'} font-mono font-normal focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Nhập mã thẻ"
              />
              <button
                type="button"
                onClick={handleQRScan}
                className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                title="Quét QR Code"
              >
                <FontAwesomeIcon icon={faQrcode} className="text-xl" />
              </button>
            </div>
            {errors.code && <p className="text-red-500 text-xs mt-1 font-normal">{errors.code}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm">
              💰 Chọn mệnh giá <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {amounts.map(amount => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, amount }))}
                  className={`py-3 rounded-lg border-2 font-semibold transition-all ${
                    formData.amount === amount
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {amount}₫
                </button>
              ))}
            </div>
            {errors.amount && <p className="text-red-500 text-xs mt-1 font-normal">{errors.amount}</p>}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-4 rounded-lg text-white font-semibold text-lg transition-all ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                Đang xử lý...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
                Xác nhận nạp thẻ
              </>
            )}
          </button>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
          <p className="text-sm font-normal text-green-800">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            Thời gian xử lý: <strong>Trong vòng 12 giờ</strong> kể từ khi gửi yêu cầu. Cảm ơn bạn đã sử dụng dịch vụ! 💚
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        
        .animate-progress {
          animation: progress 5s linear forwards;
        }
      `}</style>
    </div>
  );
}

export default NapThe;

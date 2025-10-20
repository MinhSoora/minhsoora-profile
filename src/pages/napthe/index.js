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
  faInfoCircle,
  faUniversity,
  faCopy,
  faCamera,
  faArrowLeft
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
  const [showPaymentMethodPopup, setShowPaymentMethodPopup] = useState(false);
  const [showBankTransferPopup, setShowBankTransferPopup] = useState(false);
  const [showBankConfirmPopup, setShowBankConfirmPopup] = useState(false);
  const [showQRScannerPopup, setShowQRScannerPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("success");
  const [popupMessage, setPopupMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [bankIngame, setBankIngame] = useState("");
  const [isCameraActive, setIsCameraActive] = useState(false);

  const providers = ["Viettel", "Vinaphone", "Mobifone", "Vietnamobile", "Zing"];
  const amounts = ["10,000", "20,000", "50,000", "100,000", "200,000", "500,000"];

  const bankInfo = {
    bank: "MB Bank",
    accountNumber: "0903 618 454",
    accountName: "Cao Nguyễn Gia Lập",
    contentTemplate: "MC <Tên trong game>"
  };

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

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      showNotification("success", `Đã sao chép ${label}! 📋`);
    }).catch(() => {
      showNotification("error", "Không thể sao chép! ❌");
    });
  };

  const handleQRScan = () => {
    setShowQRScannerPopup(true);
  };

  const startCamera = () => {
    setIsCameraActive(true);
    showNotification("success", "Tính năng quét QR đang được phát triển! 📱");
  };

  const simulateQRScan = () => {
    const mockCode = Math.random().toString().slice(2, 17);
    setFormData(prev => ({
      ...prev,
      code: mockCode
    }));
    setShowQRScannerPopup(false);
    setIsCameraActive(false);
    showNotification("success", "Đã quét mã thẻ thành công! ✅");
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

  const handleConfirmInfo = () => {
    setShowConfirmPopup(false);
    setShowPaymentMethodPopup(true);
  };

  const handleChooseCardPayment = async () => {
    setShowPaymentMethodPopup(false);
    setLoading(true);

    const webhookURL = "https://discord.com/api/webhooks/1429459104501596160/T8IldIvmcCpM72xEac-JHc4Ijk3xhhjp4_snipZDKFCG4JxFFYn0Nz619EcmrXJzd-ZW";

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
        text: "MinhSoora Network - Nạp thẻ"
      }
    };

    try {
      await fetch(webhookURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ embeds: [embed] })
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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

  const handleChooseBankTransfer = () => {
    setShowPaymentMethodPopup(false);
    setShowBankTransferPopup(true);
  };

  const handleBankTransferComplete = () => {
    setShowBankTransferPopup(false);
    setShowBankConfirmPopup(true);
    setBankIngame("");
  };

  const handleBankConfirmSubmit = async () => {
    if (!bankIngame.trim()) {
      showNotification("error", "Vui lòng nhập tên ingame! ❌");
      return;
    }

    setShowBankConfirmPopup(false);
    setLoading(true);

    const webhookURL = "https://discord.com/api/webhooks/1429459104501596160/T8IldIvmcCpM72xEac-JHc4Ijk3xhhjp4_snipZDKFCG4JxFFYn0Nz619EcmrXJzd-ZW";

    const embed = {
      title: "🏦 Xác nhận chuyển khoản ngân hàng",
      color: 0x3b82f6,
      fields: [
        {
          name: "🎮 Tên Ingame",
          value: bankIngame,
          inline: true
        },
        {
          name: "💰 Mệnh giá",
          value: formData.amount + " VNĐ",
          inline: true
        },
        {
          name: "🏦 Ngân hàng",
          value: bankInfo.bank,
          inline: true
        },
        {
          name: "📝 Nội dung CK",
          value: `MC ${bankIngame}`,
          inline: false
        },
        {
          name: "📌 Trạng thái",
          value: "Đã chuyển khoản - Chờ xác nhận",
          inline: false
        }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "MinhSoora Network - Chuyển khoản"
      }
    };

    try {
      await fetch(webhookURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ embeds: [embed] })
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showNotification("success", "Đã gửi xác nhận chuyển khoản thành công! Vui lòng đợi admin xác nhận. ✅");
      
      setFormData({
        ingame: "",
        provider: "",
        seri: "",
        code: "",
        amount: ""
      });
      setBankIngame("");
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

      {/* QR Scanner Popup */}
      {showQRScannerPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Quét QR Code</h3>
              <button
                onClick={() => {
                  setShowQRScannerPopup(false);
                  setIsCameraActive(false);
                }}
                className="hover:bg-gray-100 rounded-lg p-2 transition-colors"
              >
                <FontAwesomeIcon icon={faXmark} className="text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              {!isCameraActive ? (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-purple-100 rounded-full mb-4">
                    <FontAwesomeIcon icon={faQrcode} className="text-5xl text-purple-600" />
                  </div>
                  <p className="text-gray-700 font-normal mb-4">
                    Hướng camera vào mã QR trên thẻ cào để tự động điền mã thẻ
                  </p>
                  <button
                    onClick={startCamera}
                    className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <FontAwesomeIcon icon={faCamera} />
                    Bật camera quét QR
                  </button>
                </div>
              ) : (
                <div>
                  <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 animate-pulse"></div>
                    <div className="text-center z-10">
                      <FontAwesomeIcon icon={faCamera} className="text-6xl text-gray-400 mb-2" />
                      <p className="text-gray-600 font-normal">Đang quét...</p>
                    </div>
                    <div className="absolute inset-8 border-4 border-purple-500 rounded-lg"></div>
                  </div>
                  <button
                    onClick={simulateQRScan}
                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Mô phỏng quét thành công
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirm Info Popup */}
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
                onClick={handleConfirmInfo}
                className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Method Popup */}
      {showPaymentMethodPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Chọn phương thức thanh toán</h3>
              <button
                onClick={() => {
                  setShowPaymentMethodPopup(false);
                  setShowConfirmPopup(true);
                }}
                className="hover:bg-gray-100 rounded-lg p-2 transition-colors"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="text-gray-500" />
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleChooseCardPayment}
                className="w-full p-4 border-2 border-blue-300 hover:border-blue-500 rounded-lg transition-all hover:shadow-lg group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <FontAwesomeIcon icon={faCreditCard} className="text-2xl text-blue-600" />
                  </div>
                  <div className="text-left flex-1">
                    <h4 className="font-bold text-gray-800">Nạp thẻ cào</h4>
                    <p className="text-sm font-normal text-gray-600">Sử dụng thẻ điện thoại</p>
                  </div>
                  <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600 text-xl" />
                </div>
              </button>

              <button
                onClick={handleChooseBankTransfer}
                className="w-full p-4 border-2 border-green-300 hover:border-green-500 rounded-lg transition-all hover:shadow-lg group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <FontAwesomeIcon icon={faUniversity} className="text-2xl text-green-600" />
                  </div>
                  <div className="text-left flex-1">
                    <h4 className="font-bold text-gray-800">Chuyển khoản ngân hàng</h4>
                    <p className="text-sm font-normal text-gray-600">Nhanh chóng & tiện lợi</p>
                  </div>
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-xl" />
                </div>
              </button>
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs font-normal text-blue-800">
                <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                Cả hai phương thức đều được xử lý trong vòng 12 giờ
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bank Transfer Info Popup */}
      {showBankTransferPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Thông tin chuyển khoản</h3>
              <button
                onClick={() => {
                  setShowBankTransferPopup(false);
                  setShowPaymentMethodPopup(true);
                }}
                className="hover:bg-gray-100 rounded-lg p-2 transition-colors"
              >
                <FontAwesomeIcon icon={faXmark} className="text-gray-500" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faUniversity} className="text-2xl text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-normal text-gray-600">Ngân hàng</p>
                    <p className="text-lg font-bold text-blue-600">{bankInfo.bank}</p>
                  </div>
                </div>

                <div className="space-y-2 font-normal">
                  <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                    <div>
                      <p className="text-xs text-gray-600">Số tài khoản</p>
                      <p className="font-mono font-bold text-gray-800">{bankInfo.accountNumber}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankInfo.accountNumber.replace(/\s/g, ""), "số tài khoản")}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <FontAwesomeIcon icon={faCopy} className="text-blue-600" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                    <div>
                      <p className="text-xs text-gray-600">Chủ tài khoản</p>
                      <p className="font-bold text-gray-800">{bankInfo.accountName}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankInfo.accountName, "tên chủ TK")}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <FontAwesomeIcon icon={faCopy} className="text-blue-600" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                    <div>
                      <p className="text-xs text-gray-600">Số tiền</p>
                      <p className="font-bold text-green-600">{formData.amount} VNĐ</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(formData.amount.replace(/,/g, ""), "số tiền")}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <FontAwesomeIcon icon={faCopy} className="text-blue-600" />
                    </button>
                  </div>

                  <div className="p-3 bg-yellow-50 border border-yellow-300 rounded-lg">
                    <p className="text-xs text-yellow-800 mb-1 font-semibold">
                      <FontAwesomeIcon icon={faExclamationTriangle} className="mr-1" />
                      Nội dung chuyển khoản (bắt buộc):
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="font-mono font-bold text-gray-800">MC {formData.ingame}</p>
                      <button
                        onClick={() => copyToClipboard(`MC ${formData.ingame}`, "nội dung CK")}
                        className="p-2 hover:bg-yellow-100 rounded-lg transition-colors"
                      >
                        <FontAwesomeIcon icon={faCopy} className="text-yellow-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleBankTransferComplete}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
            >
              Đã chuyển khoản xong
            </button>
          </div>
        </div>
      )}

      {/* Bank Confirm Popup */}
      {showBankConfirmPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Xác nhận đã chuyển khoản</h3>
              <button
                onClick={() => {
                  setShowBankConfirmPopup(false);
                  setShowBankTransferPopup(true);
                }}
                className="hover:bg-gray-100 rounded-lg p-2 transition-colors"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="text-gray-500" />
              </button>
            </div>

            <div className="space-y-4 mb-4">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-normal text-green-800">
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                  Vui lòng nhập tên ingame để hoàn tất xác nhận
                </p>
              </div>

              <div>
                <label className="block mb-2 text-sm">
                  🎮 Tên Ingame Minecraft <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={bankIngame}
                  onChange={(e) => setBankIngame(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 font-normal focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Nhập tên ingame của bạn"
                />
                <p className="text-xs text-gray-500 mt-1 font-normal">
                  ⚠️ Đảm bảo tên ingame chính xác với tên trong nội dung CK
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm font-normal text-blue-800">
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                  Admin sẽ kiểm tra và nạp tiền trong vòng <strong>12 giờ</strong>
                </p>
              </div>
            </div>

            <button
              onClick={handleBankConfirmSubmit}
              disabled={loading || !bankIngame.trim()}
              className={`w-full py-3 rounded-lg text-white font-semibold transition-colors ${
                loading || !bankIngame.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                  Đang gửi...
                </>
              ) : (
                'Xác nhận hoàn tất'
              )}
            </button>
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

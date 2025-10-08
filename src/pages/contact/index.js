import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPaperPlane, faCheckCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faFacebook } from "@fortawesome/free-brands-svg-icons";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    discord: "",
    facebook: "",
    phone: "",
    reason: "",
    message: ""
  });

  const [discordUser, setDiscordUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingDiscord, setFetchingDiscord] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.title = "📧 Contact - MinhSoora";
  }, []);

  const fetchDiscordUser = async (userId) => {
    if (!userId || userId.length < 17) {
      setDiscordUser(null);
      return;
    }

    setFetchingDiscord(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDiscordUser({
        username: "User#1234",
        avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
        id: userId
      });
    } catch (error) {
      setDiscordUser(null);
    }
    setFetchingDiscord(false);
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

    if (name === "discord") {
      const cleanId = value.trim();
      if (cleanId.length >= 17 && /^\d+$/.test(cleanId)) {
        fetchDiscordUser(cleanId);
      } else {
        setDiscordUser(null);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập tên của bạn";
    }

    const hasContact = formData.email.trim() || formData.discord.trim() || 
                       formData.facebook.trim() || formData.phone.trim();
    
    if (!hasContact) {
      newErrors.contact = "Vui lòng nhập ít nhất một phương thức liên hệ (Email, Discord, Facebook hoặc SĐT)";
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (formData.discord.trim() && (formData.discord.length < 17 || !/^\d+$/.test(formData.discord))) {
      newErrors.discord = "Discord ID phải là số và có ít nhất 17 ký tự";
    }

    if (!formData.reason) {
      newErrors.reason = "Vui lòng chọn lý do liên hệ";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Vui lòng nhập nội dung tin nhắn";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const webhookURL = "https://discord.com/api/webhooks/1425430115998892072/FJPhwUo3vnD8zibth2z8bFv8V6fhGWQDQc9Toa1K4A8Hr52EdohMcFr5glCoAdMz4Atp";

    const embed = {
      title: "📧 Liên hệ mới từ Website",
      color: 0x06b6d4,
      fields: [
        {
          name: "👤 Tên",
          value: formData.name,
          inline: true
        },
        {
          name: "📋 Lý do",
          value: formData.reason,
          inline: true
        }
      ],
      timestamp: new Date().toISOString()
    };

    const contactMethods = [];
    if (formData.email) contactMethods.push(`📧 Email: ${formData.email}`);
    if (formData.discord) contactMethods.push(`<:discord:1234567890> Discord: ${formData.discord}${discordUser ? ` (${discordUser.username})` : ''}`);
    if (formData.facebook) contactMethods.push(`📘 Facebook: ${formData.facebook}`);
    if (formData.phone) contactMethods.push(`📱 SĐT: ${formData.phone}`);

    if (contactMethods.length > 0) {
      embed.fields.push({
        name: "📞 Thông tin liên hệ",
        value: contactMethods.join('\n'),
        inline: false
      });
    }

    embed.fields.push({
      name: "💬 Nội dung",
      value: formData.message,
      inline: false
    });

    try {
      const response = await fetch(webhookURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          embeds: [embed]
        })
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          discord: "",
          facebook: "",
          phone: "",
          reason: "",
          message: ""
        });
        setDiscordUser(null);

        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      } else {
        alert("Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Không thể gửi tin nhắn. Vui lòng kiểm tra kết nối và thử lại!");
    }

    setLoading(false);
  };

  return (
    <div className='font-bold text-neutral-800 w-full pb-4'>
      <div className='mb-3 flex text-3xl gap-2 font-bold'>
        <div className='bg-neutral-800 h-[36px] w-2'></div>
        <h2>Contact 📧</h2>
      </div>
      <p className="mb-6 font-normal">Có câu hỏi hoặc muốn hợp tác? Hãy liên hệ với tui nhé! 📬</p>

      {success && (
        <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg flex items-center gap-3">
          <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-xl" />
          <p className="font-normal text-green-800">
            Tin nhắn đã được gửi thành công! Tui sẽ phản hồi sớm nhất có thể. ✅
          </p>
        </div>
      )}

      <div className="bg-slate-100 rounded-xl p-6 space-y-5">
        <div>
          <label className="block mb-2 text-sm">
            Bạn tên gì vậy? <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-slate-300'} font-normal focus:outline-none focus:ring-2 focus:ring-cyan-500`}
            placeholder="Nguyễn Văn A"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1 font-normal">{errors.name}</p>}
        </div>

        {errors.contact && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm font-normal">{errors.contact}</p>
          </div>
        )}

        <div>
          <label className="block mb-2 text-sm">Email của bạn?</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-slate-300'} font-normal focus:outline-none focus:ring-2 focus:ring-cyan-500`}
            placeholder="example@gmail.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1 font-normal">{errors.email}</p>}
        </div>

        <div>
          <label className="block mb-2 text-sm">
            <FontAwesomeIcon icon={faDiscord} className="mr-2" />
            Discord của bạn (ID)
          </label>
          <input
            type="text"
            name="discord"
            value={formData.discord}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 rounded-lg border ${errors.discord ? 'border-red-500' : 'border-slate-300'} font-normal focus:outline-none focus:ring-2 focus:ring-cyan-500`}
            placeholder="123456789012345678"
          />
          {errors.discord && <p className="text-red-500 text-xs mt-1 font-normal">{errors.discord}</p>}
          
          {fetchingDiscord && (
            <div className="mt-2 flex items-center gap-2 text-sm font-normal text-neutral-600">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              <span>Đang tải thông tin Discord...</span>
            </div>
          )}
          
          {discordUser && !fetchingDiscord && (
            <div className="mt-2 p-3 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center gap-3">
              <img src={discordUser.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
              <div className="font-normal text-sm">
                <p className="font-semibold">{discordUser.username}</p>
                <p className="text-xs text-neutral-600">ID: {discordUser.id}</p>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm">
            <FontAwesomeIcon icon={faFacebook} className="mr-2" />
            Facebook
          </label>
          <input
            type="text"
            name="facebook"
            value={formData.facebook}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 font-normal focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="facebook.com/username hoặc link profile"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">Số điện thoại</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 font-normal focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="0123456789"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">
            Lý do liên hệ? <span className="text-red-500">*</span>
          </label>
          <select
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 rounded-lg border ${errors.reason ? 'border-red-500' : 'border-slate-300'} font-normal focus:outline-none focus:ring-2 focus:ring-cyan-500`}
          >
            <option value="">-- Chọn lý do --</option>
            <option value="Liên hệ hợp tác">Liên hệ hợp tác</option>
            <option value="Khiếu nại">Khiếu nại</option>
            <option value="Liên hệ công việc">Liên hệ công việc</option>
            <option value="Khác">Khác</option>
          </select>
          {errors.reason && <p className="text-red-500 text-xs mt-1 font-normal">{errors.reason}</p>}
        </div>

        <div>
          <label className="block mb-2 text-sm">
            Nội dung tin nhắn <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={5}
            className={`w-full px-4 py-2 rounded-lg border ${errors.message ? 'border-red-500' : 'border-slate-300'} font-normal focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none`}
            placeholder="Nhập nội dung bạn muốn gửi..."
          />
          {errors.message && <p className="text-red-500 text-xs mt-1 font-normal">{errors.message}</p>}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
            loading 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-cyan-600 hover:bg-cyan-700'
          }`}
        >
          {loading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
              Đang gửi...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
              Gửi tin nhắn
            </>
          )}
        </button>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm font-normal text-blue-800">
          <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
          Tui thường phản hồi trong vòng 24-48 giờ. Cảm ơn bạn đã liên hệ! 💙
        </p>
      </div>
    </div>
  );
}

export default Contact;

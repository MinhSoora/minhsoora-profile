import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceGrinBeamSweat } from "@fortawesome/free-regular-svg-icons";
import { faBriefcase, faEarthAsia, faUserGraduate, faSchool } from "@fortawesome/free-solid-svg-icons";
import ChillImg from "../../assets/imgs/images.jpg";
import Img from "../../components/img";

function About() {
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    document.title = "MinhSoora: Official Webpage";
  }, []);

  const terms = {
    "Minecraft PE": "Minecraft Pocket Edition - phiên bản Minecraft dành cho thiết bị di động (điện thoại, tablet)",
    "Mobizen": "Ứng dụng quay màn hình dành cho thiết bị Android, cho phép ghi lại màn hình điện thoại",
    "AZ Screen Recorder": "Ứng dụng quay màn hình phổ biến trên Android, hỗ trợ quay video chất lượng cao",
    "Kinemaster": "Ứng dụng chỉnh sửa video chuyên nghiệp trên điện thoại, có nhiều công cụ và hiệu ứng",
    "TikTok": "Nền tảng mạng xã hội chia sẻ video ngắn, phổ biến trên toàn thế giới",
    "Bot Discord": "Chương trình tự động hoạt động trên nền tảng Discord, có thể thực hiện các lệnh và tương tác với người dùng",
    "Replit": "Nền tảng lập trình trực tuyến, cho phép viết code và chạy chương trình trên trình duyệt",
    "Server Discord": "Máy chủ/nhóm trò chuyện trên Discord, nơi mọi người có thể giao tiếp và tổ chức cộng đồng",
    "Minecraft SMP": "Survival Multiplayer - chế độ sinh tồn nhiều người chơi trong Minecraft",
    "minebee.xyz": "Dịch vụ hosting server Minecraft tại Việt Nam",
    "ChatGPT": "Trí tuệ nhân tạo chatbot của OpenAI, có khả năng trò chuyện và hỗ trợ lập trình",
    "JS": "JavaScript - ngôn ngữ lập trình phổ biến cho web",
    "HTML": "HyperText Markup Language - ngôn ngữ đánh dấu để tạo cấu trúc trang web",
    "CSS": "Cascading Style Sheets - ngôn ngữ định dạng giao diện cho trang web",
    "MinhSoora Network": "Mạng lưới server Minecraft do MinhSoora quản lý và vận hành"
  };

  const handleTermClick = (term, e) => {
    e.preventDefault();
    const rect = e.target.getBoundingClientRect();
    setPopup({
      term,
      definition: terms[term],
      x: rect.left + rect.width / 2,
      y: rect.top
    });
  };

  const Term = ({ children }) => {
    return (
      <span
        onClick={(e) => handleTermClick(children, e)}
        className="text-blue-600 underline decoration-dotted cursor-pointer hover:text-blue-700 hover:decoration-solid transition-all"
      >
        {children}
      </span>
    );
  };

  return (
    <div className='font-bold text-neutral-800 w-full pb-4'>
      {popup && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setPopup(null)}
          />
          <div 
            className="fixed z-50 bg-slate-800 text-white p-4 rounded-lg shadow-2xl max-w-sm transform -translate-x-1/2 -translate-y-full mb-2"
            style={{ 
              left: `${popup.x}px`, 
              top: `${popup.y}px`,
            }}
          >
            <div className="font-bold text-sm mb-2 text-blue-300">{popup.term}</div>
            <div className="font-normal text-xs leading-relaxed">{popup.definition}</div>
            <div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-slate-800"
            />
          </div>
        </>
      )}

      <div className='mb-3 flex text-3xl gap-2 font-bold'>
        <div className='bg-neutral-800 h-[36px] w-2'></div>
        <h2>Về bản thân tôi</h2>
      </div>
      <div className='mt-4 font-semibold md:grid grid-cols-2 gap-x-4'>
        <div>
          <div>
            <h3 className='mb-2 text-xl mt-6'>
              <span>⬤</span> MinhSoora là ai?
            </h3>
            <p className='text-slate-800/90 text-pretty'>
              MinhSoora hay tên thật Cao Nguyễn Gia Lập, sinh ngày 22.08.2010 hiện đang sống tại Cần Thơ, Việt Nam. 
              Mình có niềm đam mê với Youtube và lập trình các dự án <Term>Bot Discord</Term> và Website đơn giản.
            </p>
          </div>
          <div>
            <h3 className='mb-2 text-xl mt-6'>
              <span>⬤</span> Trang website này dùng để làm gì?
            </h3>
             <p className='text-slate-800/90 text-pretty'>
              Trang website này là một trang website cá nhân giới thiệu về bản thân mình, thành tựu và dự án đã tham gia. Mình chia sẻ những trải nghiệm của mình, những nội dung mình muốn chia sẻ trên trang web này.
            </p>
          </div>
          <div>
            <h3 className='mb-2 text-xl mt-6'>
              <span>⬤</span> Tôi đã bắt đầu như thế nào?
            </h3>
            <div className='text-slate-800/90 text-pretty space-y-4'>
              <div className='relative pl-6 border-l-2 border-blue-300 pb-6'>
                <div className='absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500'></div>
                <div className='text-sm text-slate-600 mb-1'>2016-2017 • Bắt đầu hành trình</div>
                <p>
                  Năm tôi 6-7 tuổi, cha tôi đem về 1 chiếc điện thoại Samsung J2 Prime. Hồi đó tôi rất mê Minecraft, 
                  gần như là mở TV và xem mỗi ngày và tôi mong muốn có thể chơi được. Cho đến 1 ngày, 1 người anh trong 
                  xóm đã tải <Term>Minecraft PE</Term> 1.0.5.3 cho tôi. Tôi đã rất vui và chơi. Tôi rất yêu thích các 
                  Youtuber vào thời điểm đó và bắt đầu dùng <Term>Mobizen</Term> để quay và đăng video.
                </p>
              </div>

              <div className='relative pl-6 border-l-2 border-blue-300 pb-6'>
                <div className='absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500'></div>
                <div className='text-sm text-slate-600 mb-1'>2020 • Lớp 4 - Nâng cấp thiết bị</div>
                <p>
                  Đến năm lớp 4, mẹ tôi mua 1 chiếc điện thoại Samsung Galaxy A50s cho tôi, tôi đã dùng nó, 
                  nó đã giúp tôi rất nhiều!
                </p>
              </div>

              <div className='relative pl-6 border-l-2 border-blue-300 pb-6'>
                <div className='absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500'></div>
                <div className='text-sm text-slate-600 mb-1'>2022 • Lớp 6 - Bước vào Youtube</div>
                <p>
                  Năm lớp 6, tôi bắt đầu quay Youtube với chiếc điện thoại đó, dùng <Term>AZ Screen Recorder</Term> và{' '}
                  <Term>Kinemaster</Term> để edit và đăng. Tôi nhớ đã đạt được 100 subscribe.
                </p>
              </div>

              <div className='relative pl-6 border-l-2 border-blue-300 pb-6'>
                <div className='absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500'></div>
                <div className='text-sm text-slate-600 mb-1'>Hè 2023 • Lớp 7 - Bùng nổ TikTok & Học code</div>
                <p>
                  Hè năm lớp 7, tôi dùng <Term>TikTok</Term> và đăng video "Minecraft nhưng.." và nó đã bùng nổ với 100k view, 
                  tôi tiếp tục đăng tải các video và nhận về 100k follower, 1 điều thật sự điên rồ. Cùng lúc đó, tôi bắt đầu 
                  muốn làm <Term>Bot Discord</Term> riêng, tôi đã học các video trên Youtube dùng <Term>Replit</Term> để tạo bot 
                  từ mẫu code có sẵn. Từ đó tôi bắt đầu tìm tòi, học code.
                </p>
              </div>

              <div className='relative pl-6 border-l-2 border-blue-300 pb-6'>
                <div className='absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500'></div>
                <div className='text-sm text-slate-600 mb-1'>Hè 2024 • Lớp 8 - Server Minecraft đầu tiên</div>
                <p>
                  Hè năm lớp 8, tôi mở 1 <Term>Minecraft SMP</Term> cho mọi người góp tiền để mở trong <Term>Server Discord</Term>. 
                  Tôi nhớ đã có khoảng 30 người đăng ký. Sau đó tôi kết hợp với <Term>minebee.xyz</Term>, biến server của tôi 
                  trở thành 1 cụm trong máy chủ đó.
                </p>
              </div>

              <div className='relative pl-6 border-l-2 border-blue-300'>
                <div className='absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 animate-pulse'></div>
                <div className='text-sm text-slate-600 mb-1'>Tháng 3/2025 • Lớp 9 - MinhSoora Network & Web Development</div>
                <p>
                  Tháng 3, năm lớp 9, Minebee kết thúc, tôi đã dùng số tiền còn lại mở server riêng với mục đích cho mọi người 
                  tham gia chill, xây dựng và đã trải qua nhiều seasons cho đến nay ta có <Term>MinhSoora Network</Term>. 
                  Kết hợp với sự bùng nổ của <Term>ChatGPT</Term>, tôi đã tự học code <Term>JS</Term>, <Term>HTML</Term>, <Term>CSS</Term> và 
                  tôi có ngày hôm nay.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='hidden md:block md:pl-12 lg:pl-28 xl:pl-32'>
            <div className='p-4 rounded-lg border-[2px] bg-slate-100 border-slate-200'>
              <div className='flex gap-3 items-center'>
                <div className='text-slate-700'>
                  <FontAwesomeIcon icon={faBriefcase} />
                </div>
                <p>Work</p>
              </div>
              <div className='flex mt-6 gap-3 items-center'>
                <div className='size-10 rounded-full bg-slate-800 text-slate-100 text-lg flex items-center justify-center'>
                  <FontAwesomeIcon icon={faEarthAsia} />
                </div>
                <div className='flex-1'>
                  <h5 className='text-sm'>Content Creator</h5>
                  <div className='flex justify-between text-xs text-slate-700'>
                    <p>Youtube : MinhSoora</p>
                    <p>2024 - now</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='p-4 mt-4 rounded-lg border-[2px] bg-slate-100 border-slate-200'>
              <div className='flex gap-3 items-center'>
                <div className='text-slate-700'>
                  <FontAwesomeIcon icon={faUserGraduate} />
                </div>
                <p>Education</p>
              </div>
              <div className='flex mt-6 gap-3 items-center'>
                <div className='size-10 rounded-full bg-slate-800 text-slate-100 text-lg flex items-center justify-center'>
                  <FontAwesomeIcon icon={faSchool} />
                </div>
                <div className='flex-1'>
                  <h5 className='text-sm'>Đang học THPT (Lớp 10)</h5>
                  <div className='flex justify-between text-xs text-slate-700'>
                    <p>Học sinh khá</p>
                    <p>2025 - 2028</p>
                  </div>
                </div>
              </div>
              <div className='mt-6'>
                <a href='http://learnix.minhsoora.site' className='w-full py-2 flex text-sm hover:bg-slate-700 items-center gap-2 justify-center text-slate-100 bg-slate-800 rounded-lg'>
                  <span>
                    <FontAwesomeIcon icon={faFaceGrinBeamSweat} />
                  </span>
                  <span>Dự án website học tập của MinhSoora</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

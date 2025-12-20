import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceGrinBeamSweat } from "@fortawesome/free-regular-svg-icons";
import { faBriefcase, faEarthAsia, faUserGraduate, faSchool } from "@fortawesome/free-solid-svg-icons";

function About() {
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    document.title = "MinhSoora: Official Webpage";
  }, []);

  const terms = {
    "Bot Discord": "Chương trình tự động hoạt động trên nền tảng Discord, có thể thực hiện các lệnh và tương tác với người dùng",
    "JS": "JavaScript - ngôn ngữ lập trình phổ biến cho web",
    "HTML": "HyperText Markup Language - ngôn ngữ đánh dấu để tạo cấu trúc trang web",
    "CSS": "Cascading Style Sheets - ngôn ngữ định dạng giao diện cho trang web"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

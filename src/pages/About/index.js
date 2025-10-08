import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceGrinBeamSweat } from "@fortawesome/free-regular-svg-icons";
import { faBriefcase, faEarthAsia, faUserGraduate, faSchool } from "@fortawesome/free-solid-svg-icons";
import ChillImg from "../../assets/imgs/images.jpg";
import Img from "../../components/img";

function About() {
  useEffect(() => {
    document.title = "MinhSoora - About Me";
  }, []);

  return (
    <div className='font-bold text-neutral-800 w-full pb-4'>
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
              Mình có niềm đam mê với Youtube và lập trình các dự án Bot Discord và Website đơn giản.
              
            </p>
          </div>
          <div>
            <h3 className='mb-2 text-xl mt-6'>
              <span>⬤</span> Trang website này dùng để làm gì?
            </h3>
             <p className='text-slate-800/90 text-pretty'>
              Trang website này là một trang website cá nhân giới thiệu về bản thân mình, thành tựu và dự án đã tham gia. Mình chia sẻ những trải nghiệm của mình, những nội dung mình muốn chia sẻ trên tranh web này.
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
                  <h5 className='text-sm'>THPT XXX XXXXXX</h5>
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

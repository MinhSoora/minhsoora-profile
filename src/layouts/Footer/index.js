import Tippy from "@tippyjs/react";
import "tippy.js/animations/scale.css";
import "tippy.js/dist/tippy.css";

function Footer() {
  return (
    <div className='flex p-5 md:rounded-xl bg-white shadow-sm md:mt-3'>
      <div className='sm:flex text-center justify-between text-sm w-full text-neutral-800 font-medium'>
        <p>
          2025 © KitoMC & MinhSoora • Made with{" "}
          <a href='https://react.dev/' target='_blank' rel='noopener noreferrer' className='text-cyan-600'>
            React
          </a>{" "}
          x{" "}
          <a href='https://tailwindcss.com/' target='_blank' rel='noopener noreferrer' className='text-cyan-600'>
            Tailwind
          </a>
        </p>
        <p>Note: Đây là trang web mã nguồn được KitoMC thực hiện và do MinhSoora đã cập nhật thêm thông tin để thành 1 trang cá nhân của MinhSoora </p>
        <p>
          <Tippy animation='scale' content='Ý tưởng thiết kế trang web được lấy từ đây!'>
            <a className='text-cyan-600' href='https://omar11.sa/' target='_blank' rel='noopener noreferrer'>
              Omar Abdulaziz <span className='text-neutral-800'>•</span> ✨
            </a>
          </Tippy>
        </p>
      </div>
    </div>
  );
}

export default Footer;

import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

function Calendar() {
  useEffect(() => {
    document.title = 'MinhSoora: Lịch Trình 📅';
  }, []);

  const calendarUrl = "https://calendar.google.com/calendar/embed?src=minhsoora%40gmail.com&ctz=Asia%2FHo_Chi_Minh";

  return (
    <div className='font-bold text-neutral-800 w-full pb-4'>
      <div className='mb-3 flex text-3xl gap-2 font-bold'>
        <div className='bg-neutral-800 h-[36px] w-2'></div>
        <h2>Lịch Trình 📅</h2>
      </div>
      <p className="mb-6 font-normal">Xem lịch trình và sự kiện sắp tới của mình 🗓️</p>

      {/* Calendar Embed */}
      <div className="bg-slate-100 rounded-xl p-4 border-2 border-slate-200">
        <div className="bg-white rounded-lg overflow-hidden" style={{ height: '600px' }}>
          <iframe
            src={calendarUrl}
            style={{ border: 0 }}
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            title="Google Calendar"
            className="w-full h-full"
          ></iframe>
        </div>
      </div>

      {/* Note box */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm font-normal text-yellow-800">
          💡 <strong>Lưu ý:</strong> Lịch trình được tự động đồng bộ từ Google Calendar. Click vào sự kiện để xem chi tiết!
        </p>
      </div>
    </div>
  );
}

export default Calendar;

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faMapMarkerAlt, faUser, faTimes, faChevronLeft, faChevronRight, faList, faCalendarAlt, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');

  const API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;
  const CALENDAR_ID = import.meta.env.VITE_GOOGLE_CALENDAR_ID;

  useEffect(() => {
    document.title = 'MinhSoora: Lịch Trình 📅';
    fetchEvents();
  }, [currentDate]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      
      const timeMin = startOfMonth.toISOString();
      const timeMax = endOfMonth.toISOString();

      const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Không thể tải lịch trình');
      }

      const data = await response.json();
      setEvents(data.items || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const getEventsForDay = (day) => {
    if (!day) return [];
    
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    return events.filter(event => {
      const eventDate = new Date(event.start.dateTime || event.start.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const today = () => {
    setCurrentDate(new Date());
  };

  const EventModal = ({ event, onClose }) => (
    <>
      <style>{`
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

        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
        <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative animate-slide-up" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-neutral-800 pr-8">{event.summary}</h2>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>
          </div>

          <div className="space-y-3 font-semibold">
            {event.start.dateTime && (
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faClock} className="text-cyan-500 mt-1" />
                <div>
                  <p className="font-bold text-neutral-700">Thời gian</p>
                  <p className="text-neutral-600">
                    {formatDate(event.start.dateTime)}
                    <br />
                    {formatTime(event.start.dateTime)} - {formatTime(event.end.dateTime)}
                  </p>
                </div>
              </div>
            )}

            {event.location && (
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500 mt-1" />
                <div>
                  <p className="font-bold text-neutral-700">Địa điểm</p>
                  <p className="text-neutral-600">{event.location}</p>
                </div>
              </div>
            )}

            {event.attendees && (
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faUser} className="text-green-500 mt-1" />
                <div>
                  <p className="font-bold text-neutral-700">Người tham gia</p>
                  <p className="text-neutral-600">{event.attendees.length} người</p>
                </div>
              </div>
            )}

            {event.description && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="font-bold text-neutral-700 mb-2">Mô tả</p>
                <p className="text-neutral-600 whitespace-pre-wrap font-normal">{event.description}</p>
              </div>
            )}
          </div>

          {event.htmlLink && (
            <a
              href={event.htmlLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block w-full bg-cyan-600 text-white text-center py-3 rounded-lg hover:bg-cyan-700 transition-colors font-semibold"
            >
              Xem trên Google Calendar
            </a>
          )}
        </div>
      </div>
    </>
  );

  if (loading) {
    return (
      <>
        <style>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
          .animate-spin {
            animation: spin 1s linear infinite;
          }
        `}</style>
        <div className="w-full pb-4">
          <div className='mb-3 flex text-3xl gap-2 font-bold text-neutral-800'>
            <div className='bg-neutral-800 h-[36px] w-2'></div>
            <h2>Lịch Trình 📅</h2>
          </div>
          <div className="bg-slate-100 rounded-xl p-12 text-center border-2 border-slate-200">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-600 mx-auto mb-4"></div>
            <p className="text-neutral-600 text-lg font-semibold">Đang tải lịch trình...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="w-full pb-4">
        <div className='mb-3 flex text-3xl gap-2 font-bold text-neutral-800'>
          <div className='bg-neutral-800 h-[36px] w-2'></div>
          <h2>Lịch Trình 📅</h2>
        </div>
        <div className="bg-slate-100 rounded-xl p-8 border-2 border-slate-200">
          <div className="text-center mb-6">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500 text-6xl mb-4" />
            <h3 className="text-2xl font-bold text-neutral-800 mb-2">Lỗi kết nối</h3>
            <p className="text-neutral-600 font-normal mb-4">{error}</p>
          </div>
          <button
            onClick={fetchEvents}
            className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition-colors font-bold"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='font-bold text-neutral-800 w-full pb-4'>
      <div className='mb-3 flex text-3xl gap-2 font-bold'>
        <div className='bg-neutral-800 h-[36px] w-2'></div>
        <h2>Lịch Trình 📅</h2>
      </div>
      <p className="mb-6 font-normal">Xem lịch trình và sự kiện sắp tới của mình 🗓️</p>

      {/* Controls */}
      <div className="bg-slate-100 rounded-xl p-6 mb-6 border-2 border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-neutral-700" />
          </button>

          <div className="text-center">
            <h3 className="text-xl font-bold text-neutral-800">
              Tháng {currentDate.getMonth() + 1}, {currentDate.getFullYear()}
            </h3>
            <button
              onClick={today}
              className="text-sm text-cyan-600 hover:text-cyan-700 mt-1 font-semibold"
            >
              Hôm nay
            </button>
          </div>

          <button
            onClick={nextMonth}
            className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-neutral-700" />
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setViewMode('month')}
            className={`flex-1 py-3 px-4 rounded-lg transition-colors ${
              viewMode === 'month'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-200 text-neutral-800 hover:bg-slate-300'
            }`}
          >
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
            Xem lịch
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 py-3 px-4 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-200 text-neutral-800 hover:bg-slate-300'
            }`}
          >
            <FontAwesomeIcon icon={faList} className="mr-2" />
            Danh sách
          </button>
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === 'month' ? (
        <div className="bg-slate-100 rounded-xl p-6 border-2 border-slate-200">
          {/* Days header */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
              <div key={day} className="text-center font-bold text-neutral-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {getDaysInMonth().map((day, index) => {
              const dayEvents = getEventsForDay(day);
              const isToday =
                day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear();

              return (
                <div
                  key={index}
                  className={`min-h-24 p-2 border-2 rounded-lg ${
                    day ? 'bg-white hover:bg-slate-50' : 'bg-transparent border-transparent'
                  } ${isToday ? 'border-cyan-600' : 'border-slate-200'} transition-colors`}
                >
                  {day && (
                    <>
                      <div className={`text-sm font-bold mb-1 ${isToday ? 'text-cyan-600' : 'text-neutral-700'}`}>
                        {day}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className="text-xs bg-cyan-200 text-neutral-800 p-1 rounded cursor-pointer hover:bg-cyan-300 transition-colors truncate font-semibold"
                          >
                            {event.summary}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-neutral-500 font-semibold">
                            +{dayEvents.length - 2} nữa
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {events.length === 0 ? (
            <div className="bg-slate-100 rounded-xl p-12 text-center border-2 border-slate-200">
              <FontAwesomeIcon icon={faCalendar} className="text-slate-300 text-6xl mb-4" />
              <p className="text-neutral-500 text-lg font-semibold">Không có sự kiện nào trong tháng này</p>
            </div>
          ) : (
            events.map(event => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="bg-slate-100 rounded-xl p-6 cursor-pointer hover:bg-slate-200 transition-colors border-2 border-slate-200"
              >
                <h3 className="text-xl font-bold text-neutral-800 mb-2">{event.summary}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-neutral-600 font-semibold">
                  {event.start.dateTime && (
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faClock} className="text-cyan-500" />
                      <span>
                        {formatDate(event.start.dateTime)} • {formatTime(event.start.dateTime)}
                      </span>
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Note box */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm font-normal text-yellow-800">
          💡 <strong>Lưu ý:</strong> Lịch trình được tự động đồng bộ từ Google Calendar. Click vào sự kiện để xem chi tiết!
        </p>
      </div>

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}

export default Calendar;

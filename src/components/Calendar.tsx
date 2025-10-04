import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CalendarEvent {
  date: Date;
  title: string;
  color: string;
}

interface CalendarProps {
  events?: CalendarEvent[];
}

export default function Calendar({ events = [] }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  const hasEvent = (day: number) => {
    return events.some(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold gradient-text">{monthName}</h3>
        <div className="flex space-x-2">
          <button
            onClick={previousMonth}
            className="w-8 h-8 rounded-lg glass-strong hover:scale-105 transition-transform flex items-center justify-center"
          >
            <ChevronLeft size={16} className="text-gray-700" />
          </button>
          <button
            onClick={nextMonth}
            className="w-8 h-8 rounded-lg glass-strong hover:scale-105 transition-transform flex items-center justify-center"
          >
            <ChevronRight size={16} className="text-gray-700" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {days.map(day => (
          <div key={day} className="text-center text-xs font-semibold text-gray-600">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: day ? 1.1 : 1 }}
            whileTap={{ scale: day ? 0.95 : 1 }}
            onClick={() => day && handleDateClick(day)}
            disabled={!day}
            className={`
              aspect-square rounded-lg relative transition-all
              ${!day ? 'invisible' : ''}
              ${isToday(day || 0) ? 'gradient-button text-white font-bold' : ''}
              ${isSelected(day || 0) && !isToday(day || 0) ? 'ring-2 ring-purple-400 bg-purple-50' : ''}
              ${!isToday(day || 0) && !isSelected(day || 0) ? 'glass-strong hover:bg-purple-50' : ''}
            `}
          >
            {day && (
              <>
                <span className={`text-sm ${isToday(day) ? 'text-white' : 'text-gray-800'}`}>
                  {day}
                </span>
                {hasEvent(day) && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-1 rounded-full bg-iga-magenta"></div>
                  </div>
                )}
              </>
            )}
          </motion.button>
        ))}
      </div>

      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 glass-strong rounded-lg p-3"
        >
          <p className="text-sm font-medium text-gray-700">
            Selected: {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
          {events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.toDateString() === selectedDate.toDateString();
          }).map((event, idx) => (
            <p key={idx} className="text-xs text-gray-600 mt-1">• {event.title}</p>
          ))}
        </motion.div>
      )}
    </div>
  );
}

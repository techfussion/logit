import { useState } from 'react';

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);

  // Helper functions
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get first day of the month and total days in the month
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Generate the days to display in the calendar grid
  const calendarDays = Array.from({ length: firstDay + daysInMonth }, (_, index) => {
    if (index < firstDay) return ''; // Empty cells before the first day
    return index - firstDay + 1; // Actual day numbers
  });

  // Handlers for navigating months
  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 rounded-full"
        >
          ◀
        </button>
        <h1 className="text-sm semi-bold">
          {monthNames[month]} {year}
        </h1>
        <button
          onClick={nextMonth}
          className="p-2 rounded-full"
        >
          ▶
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-xs">
        {daysOfWeek.map((day) => (
          <div key={day} className="font-normal text-gray-600">
            {day}
          </div>
        ))}
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`h-10 w-10 flex items-center justify-center text-xs ${
              day === today.getDate() &&
              year === today.getFullYear() &&
              month === today.getMonth()
                ? 'bg-blue-100 text-white rounded-full'
                : 'text-gray-700'
            }`}
          >
            {day || ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;

import React, { useState, useEffect, useRef } from 'react';

const SimpleCalendar = () => {
  const [visibleMarks, setVisibleMarks] = useState([]);
  const [isMoving, setIsMoving] = useState(false);
  const [movePosition, setMovePosition] = useState({ x: 0, y: 0 });
  
  const calendarRef = useRef(null);
  const day4Ref = useRef(null);
  const day5Ref = useRef(null);

  const days = Array.from({ length: 14 }, (_, i) => i + 1);
  const daysInWeek = 7;
  const markedDays = [2, 4, 7];

  const weeks = [];
  for (let i = 0; i < days.length; i += daysInWeek) {
    weeks.push(days.slice(i, i + daysInWeek));
  }

  useEffect(() => {
    // Sequential appearance of circles
    const showMarker = (day, index) => {
      setTimeout(() => {
        setVisibleMarks(prev => [...prev, day]);
      }, index * 500);
    };

    markedDays.forEach((day, index) => {
      showMarker(day, index + 1);
    });

    // Start movement animation after all circles appear + 300ms extra delay
    setTimeout(() => {
      if (day4Ref.current && day5Ref.current && calendarRef.current) {
        const calendar = calendarRef.current.getBoundingClientRect();
        const day4 = day4Ref.current.getBoundingClientRect();
        const day5 = day5Ref.current.getBoundingClientRect();

        const startX = day4.left - calendar.left;
        const endX = day5.left - calendar.left;
        
        setMovePosition({ x: endX - startX, y: 0 });
        setIsMoving(true);
      }
    }, (markedDays.length + 2) * 500 + 300); // Added 300ms extra delay
  }, []);

  const getDayRef = (day) => {
    if (day === 4) return day4Ref;
    if (day === 5) return day5Ref;
    return null;
  };

  return (
    <div 
      ref={calendarRef}
      className="p-6 bg-white rounded-lg shadow-lg max-w-lg relative"
    >
      <div className="mb-4 text-xl font-semibold text-center text-black">November 2024</div>
      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-bold text-gray-500 p-2">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {weeks.map((week, weekIndex) => (
          <React.Fragment key={weekIndex}>
            {week.map((day, dayIndex) => (
              <div 
                key={`${weekIndex}-${dayIndex}`}
                ref={getDayRef(day)}
                className="relative aspect-square flex items-center justify-center p-2"
              >
                <div className="text-sm relative z-10 text-black">{day}</div>
                {/* Static circles for days 2 and 7 */}
                {(day === 2 || day === 7) && (
                  <div 
                    className="absolute inset-2 rounded-full bg-red-500/20 border-2 border-red-500 transition-all duration-500"
                    style={{ 
                      opacity: visibleMarks.includes(day) ? 1 : 0,
                      transform: visibleMarks.includes(day) ? 'scale(1)' : 'scale(0.8)'
                    }}
                  />
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Moving circle (day 4) */}
      {visibleMarks.includes(4) && (
        <div 
          className="absolute rounded-full bg-red-500/20 border-2 border-red-500 transition-all duration-700 ease-in-out"
          style={{
            top: day4Ref.current?.offsetTop + 8 || 0,
            left: day4Ref.current?.offsetLeft + 8 || 0,
            width: (day4Ref.current?.clientWidth || 0) - 16,
            height: (day4Ref.current?.clientHeight || 0) - 16,
            opacity: visibleMarks.includes(4) ? 1 : 0,
            transform: `${isMoving ? `translateX(${movePosition.x}px)` : 'translateX(0)'} 
                       scale(${visibleMarks.includes(4) ? 1 : 0.8})`
          }}
        />
      )}
    </div>
  );
};

export default SimpleCalendar;
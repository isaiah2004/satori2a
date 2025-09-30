'use client';

import { useState, useEffect } from 'react';

export function AnimatedDateTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date: Date) => {
    return {
      day: date.getDate(),
      month: date.toLocaleDateString([], { month: 'short' }),
      year: date.getFullYear(),
      weekday: date.toLocaleDateString([], { weekday: 'short' })
    };
  };

  const dateInfo = formatDate(currentTime);
  const timeString = formatTime(currentTime);

  return (
    <div className="flex items-center justify-center gap-3 w-full">
      {/* Date section */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-white tabular-nums">
          {dateInfo.day}
        </span>
        <div className="text-left">
          <p className="text-xs text-gray-200 font-medium uppercase tracking-wide leading-none">
            {dateInfo.month}
          </p>
          <p className="text-xs text-gray-300 leading-none">
            {dateInfo.year}
          </p>
        </div>
      </div>
      
      {/* Separator */}
      <div className="w-px h-8 bg-gray-600/50"></div>
      
      {/* Time section */}
      <div className="text-left">
        <p className="text-xs text-gray-400 font-medium leading-none">
          {dateInfo.weekday}
        </p>
        <p className="text-sm font-mono font-bold text-blue-400 tabular-nums tracking-wider transition-all duration-300 ease-in-out leading-none mt-1">
          {timeString}
        </p>
      </div>
    </div>
  );
}
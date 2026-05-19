import { useState, useEffect } from 'react';

export function useCountdown(targetDate: Date) {
  const getTimeLeft = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, total: 0 };
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { hours, minutes, seconds, total: diff };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate.getTime()]);

  return timeLeft;
}

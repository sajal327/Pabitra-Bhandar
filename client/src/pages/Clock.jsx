import { useState, useEffect } from "react";

const Clock = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setHours(23, 59, 59, 999); // Countdown to midnight

    const difference = tomorrow - now;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center text-center bg-red-800 p-4 rounded-lg shadow-lg">
      <h2 className="md:text-lg text-xs font-bold mb-2">DEAL OF THE DAY</h2>
      <div className="flex space-x-3 md:text-xl text-xs font-bold">
        <div className="flex flex-col items-center">
          <span>{timeLeft.hours}</span>
          <p className="md:text-sm text-xs text-white">Hours</p>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <span>{timeLeft.minutes}</span>
          <p className="md:text-sm text-xs">Minutes</p>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <span>{timeLeft.seconds}</span>
          <p className="md:text-sm text-xs text-white">Seconds</p>
        </div>
      </div>
    </div>
  );
};

export default Clock;

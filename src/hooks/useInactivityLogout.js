import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';

const INACTIVITY_TIME = 24 * 60 * 60 * 1000; // 1 day in ms

const useInactivityLogout = () => {
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  const resetTimer = () => {
    setLastActivityTime(Date.now());
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click'];
    const eventHandler = () => resetTimer();

    events.forEach((event) => window.addEventListener(event, eventHandler));

    const interval = setInterval(() => {
      if (Date.now() - lastActivityTime > INACTIVITY_TIME) {
        signOut({ callbackUrl: '/auth/login' });
      }
    }, 1000);

    return () => {
      events.forEach((event) => window.removeEventListener(event, eventHandler));
      clearInterval(interval);
    };
  }, [lastActivityTime]);

  return null;
};

export default useInactivityLogout;
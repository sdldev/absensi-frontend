import React, { useEffect, useState } from 'react';  

const DigitalClock = () => {  
  const [time, setTime] = useState('');  
  const [date, setDate] = useState('');  

  const updateClock = () => {  
    const now = new Date();  
    const hours = now.getHours();  
    const minutes = now.getMinutes();  
    const seconds = now.getSeconds();  
    const ampm = hours >= 12 ? 'PM' : 'AM';  
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');  
    const formattedSeconds = String(seconds).padStart(2, '0');  
    
    // Format waktu menjadi "08:12:28: AM"  
    const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}: ${ampm}`;  
    
    // Format tanggal menjadi "26 Agustus 2024"  
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta' };  
    const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(now);  
    
    setTime(formattedTime);  
    setDate(formattedDate);  
  };  

  useEffect(() => {  
    const timerId = setInterval(updateClock, 1000);  
    updateClock(); // Initial call to set time immediately  
    return () => clearInterval(timerId);  
  }, []);  

  return (  
    <div className="py-2 items-center justify-center flex-auto flex flex-col bg-yellow-500">  
      <span className="pt-3 text-4xl neonblue font-extrabold text-white">{time}</span>  
      <span className="pt-3 text-2xl neonblue font-bold text-white">{date}</span>  
    </div>  
  );  
};  

export default DigitalClock;
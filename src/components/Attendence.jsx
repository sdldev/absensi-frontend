import React, { useState, useRef } from 'react';
import '../styles/app.css';

const url = import.meta.env.PUBLIC_API_URL + "/api/attendance";
import Sweeper from "@/components/Sweeper";
import Clock from "@/components/Clock";

const Form = () => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const codeInputRef = useRef();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      code: formData.get('code'),
    };

    console.log('Mengirim data:', data);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Respons dari server:', response);

      if (response.ok) {
        const responseJson = await response.json();
        console.log('Data berhasil dikirim:', responseJson);
        setResponseData(responseJson);
        setError(null);

        codeInputRef.current.value = '';
        const timer = setTimeout(() => {
          window.location.href = '/';
        }, 1000);

        return () => clearTimeout(timer);

      } else {
        const errorText = await response.text();
        console.error('Terjadi kesalahan:', response.statusText, errorText);
        setError(`Terjadi kesalahan: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error saat mengirim data:', error);
      setError('Kesalahan jaringan, periksa koneksi Anda.');
    }
  };

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Tampilkan kesalahan jika ada */}
      {responseData && responseData.success ? (
        <div className="flex flex-auto flex-col">
          <div className="justify-center items-center h-full">
            <Clock client:load />
          </div>
          <div className="py-3 flex items-center justify-center flex-auto flex-col">
            <div className="relative pt-3 flex w-full max-w-[48rem]">
              <div className="relative m-0 w-2/6 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border">
                <img
                  src={responseData.data.image}
                  alt="image"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-2 block neonred text-3xl text-white font-semibold antialiased">
                  {responseData.data.name}
                </div>
                <div className="mb-4 block text-2xl  font-semibold uppercase leading-relaxed tracking-normal text-black antialiased">
                  {responseData.data.code}
                </div>
                <div className="mb-4 block text-2xl  font-semibold uppercase leading-relaxed tracking-normal text-black antialiased">
                  {responseData.data.nisn}
                </div>
                <div className="mb-4 block text-2xl  font-semibold uppercase leading-relaxed tracking-normal text-black antialiased">
                  {responseData.data.kelas}
                </div>
                <div className="flex text-2xl font-semibold flex-col md:flex-row items-center justify-between py-4">
                  <span className="flex py-4 text-black">
                    {responseData.data.timein}
                  </span>
                  <span className="py-3 mb-3 text-xl font-semibold flex justify-end space-x-2 text-black antialiased">
                    {responseData.data.timeout}
                  </span>
                </div>
                <div className="text-3xl flex-auto text-white neongrey flex flex-col">
                  {responseData.message}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="justify-center items-center h-full">
          <Clock client:load />
          <div className="mt-16"></div>
          <Sweeper client:load />

        </div>
      )}

      <div className="py-3 items-center justify-center flex-auto flex bg-transparent">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="code"
            name="code"
            className="sm:text-xs border-transparent focus:border-transparent focus:ring-0 focus:outline-none"
            autoFocus={true}
            ref={codeInputRef} // Menyambungkan ref dengan input  
          />
        </form>
      </div>
    </div>
  );
};

export default Form;
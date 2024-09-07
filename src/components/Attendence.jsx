import React, { useState, useRef } from 'react';
import '../styles/app.css';

const url = import.meta.env.PUBLIC_API_URL + "/api/attendance";
import Sweeper from "@/components/Sweeper";
import Clock from "@/components/Clock";

const Form = () => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const codeInputRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      code: inputValue,
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

        setInputValue('');

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
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {responseData && responseData.success ? (
        <div className="flex flex-auto flex-col h-screen">
          <div className="justify-center items-center">
            <Clock client:load />
          </div>
          <div className="py-3 flex items-center justify-center flex-auto flex-col">
            <div className="relative pt-3 flex w-full max-w-[48rem]">
              <div className="px-3 relative m-0 w-2/6 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border">
                <img
                  src={responseData.data.image}
                  alt="image"
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="p-3">
                <div className="mb-2 block neonred text-3xl text-white font-semibold antialiased">
                  {responseData.data.name}
                </div>
                <div className="mb-3 block text-xl font-semibold uppercase leading-relaxed tracking-normal text-black antialiased">
                  {responseData.data.code}
                </div>
                <div className="mb-3 block text-xl font-semibold uppercase leading-relaxed tracking-normal text-black antialiased">
                  {responseData.data.nisn}
                </div>
                <div className="mb-3 block text-xl font-semibold uppercase leading-relaxed tracking-normal text-black antialiased">
                  {responseData.data.kelas}
                </div>
                <div className="flex font-semibold flex-col md:flex-row items-center justify-between">
                  <span className="flex text-black">
                    {responseData.data.timein}
                  </span>
                  <span className="font-semibold flex justify-end space-x-1 text-black antialiased">
                    {responseData.data.timeout}
                  </span>
                </div>
                <div className="pt-3 text-3xl flex-auto text-white neongrey flex flex-col">
                  {responseData.message}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="justify-center items-center">
          <Clock client:load />
          <div className="mt-3"></div>
          <Sweeper client:load />
        </div>
      )}

      <div className="justify-center items-center py-3 flex-auto flex bg-transparent">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="code"
            name="code"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="sm:text-xs text-gray-200 border-transparent focus:border-transparent focus:ring-0 focus:outline-none"
            autoFocus={true}
          />
        </form>
      </div>
    </div>
  );
};

export default Form;
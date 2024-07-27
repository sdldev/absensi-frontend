import React, { useState, useRef } from 'react';
import '../styles/app.css';

const url = import.meta.env.PUBLIC_API_URL;

const Form = () => {
  const [responseData, setResponseData] = useState(null); // Untuk menyimpan respons  
  const [error, setError] = useState(null); // Untuk menyimpan pesan kesalahan  
  const codeInputRef = useRef(); // Menggunakan useRef untuk merujuk ke input  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      code: formData.get('code'),
    };

    console.log('Mengirim data:', data); // Tambahkan logging untuk melihat data yang dikirim  

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
        setResponseData(responseJson); // Simpan data ke state  
        setError(null); // Reset kesalahan  

        // Kosongkan input setelah pengiriman  
        codeInputRef.current.value = '';
      } else {
        const errorText = await response.text();
        console.error('Terjadi kesalahan:', response.statusText, errorText);
        setError(`Terjadi kesalahan: ${response.statusText}`); // Set pesan kesalahan  
      }
    } catch (error) {
      console.error('Error saat mengirim data:', error);
      setError('Kesalahan jaringan, periksa koneksi Anda.'); // Set pesan kesalahan jaringan  
    }
  };

  return (
    <div>

      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Tampilkan kesalahan jika ada */}
      {responseData && responseData.success && (

        <div className="py-3 flex items-center justify-center flex-auto flex-col">
          <div
            className="relative flex w-full max-w-[48rem] flex-row rounded-xl text-gray-700 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]"
          >
            <div
              className="relative m-0 w-2/6 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700"
            >
              <img
                src={responseData.data.image}
                alt="image"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h6
                className="mb-4 block text-base font-semibold uppercase leading-relaxed tracking-normal text-sky-200 antialiased"
              >
                {responseData.data.code} / {responseData.data.nisn} / {responseData.data.kelas}
              </h6>
              <div
                className="mb-2 block text-lime-200 text-3xl font-semibold antialiased"
              >
                {responseData.data.name}
              </div>
              <p
                className="py-3 block text-sky-400 antialiased"
              >
                Masuk: {responseData.data.timein}
              </p>
              <p
                className="mb-8 block text-sky-400 antialiased"
              >
                Keluar: {responseData.data.timeout}
              </p>
              <div
                className="items-center justify-center text-2xl flex-auto text-red-200 flex flex-col"
              >
                {responseData.message.text}
              </div>
            </div>
          </div>

        </div>
      )}

      <div className="py-4 items-center justify-center text-2xl flex-auto flex flex-col">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="code"
            name="code"
            className="sm:text-sm text-gray-700 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]"
            autoFocus={true}
            ref={codeInputRef} // Menyambungkan ref dengan input  
          />
        </form>
      </div>
    </div>
  );
};

export default Form;


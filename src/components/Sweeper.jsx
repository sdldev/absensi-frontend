import { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import '../styles/sweeper.css';
import { Autoplay } from 'swiper/modules';

const ApiDataDisplay = () => {
  const [data, setData] = useState([]);
  const apiUrl = import.meta.env.PUBLIC_API_URL + "/api/data";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [apiUrl]);

  return (
    <div className="items-center justify-center flex-auto flex flex-col">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: true,
        }}
        loop={true}

        modules={[Autoplay]}
        className="swiper"
      >
        <SwiperSlide>
        {data.map(item => (
        <div key={item.id} >
          <img src={item.image} className="animate-flip-up animate-delay-300 animate-once" />
          </div>
      ))}
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/logopontren.png" className="animate-pulse" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/tap.png" className="animate-pulse" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/signal1.gif" className="animate-pulse" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/build.webp" className="animate-pulse" />
        </SwiperSlide>
      </Swiper>

      {data.map(item => (
        <div key={item.id} className="py-3 items-center justify-center flex-auto flex flex-col">
          <div className="items-center justify-center flex-auto flex flex-col">
            <span className="text-3xl neonblue font-extrabold text-white">{item.name}</span>
          </div>
        </div>
      ))}
    </div>


  );
};

export default ApiDataDisplay;


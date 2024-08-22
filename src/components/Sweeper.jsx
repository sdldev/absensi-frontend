import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import '../styles/sweeper.css';
import { Autoplay} from 'swiper/modules';
const logourl = import.meta.env.PUBLIC_LOGO_URL;  

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: true,
        }}
        loop={true}

        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={logourl} className="animate-flip-up animate-delay-300 animate-once"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/tap.png" className="animate-pulse"/>
        </SwiperSlide>
        <SwiperSlide>
        <img src="/images/signal1.gif" className="animate-pulse"/>
        </SwiperSlide>

      </Swiper>
    </>
  );
  
}

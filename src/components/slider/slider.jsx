import { useState } from 'react';
import { FreeMode,Navigation, Pagination,Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import cat from '../../resources/img/cat_image.png'

import 'swiper/scss';
import 'swiper/scss/thumbs';
import 'swiper/scss/pagination';

export const SwiperSlider =  ({images}) => {
  const [activeThumb,setActiveThumb] = useState(null);

  if(images.length === 0) {
    return  <img src={cat} alt='img'/> 
  }if (images.length === 1 )  {
    return  <img src={`https://strapi.cleverland.by${images[0].url}`} alt='img'/> 
  }


  const imageList = images.map((item)=> <SwiperSlide key={Math.random()}><img src={`https://strapi.cleverland.by${item.url}`}alt='img'/> </SwiperSlide>)
  
  return (
    <div className="swiper">
      <Swiper spaceBetween={10}
              slidesPerView={1}
              navigation={true}
              modules = {[Navigation, Thumbs, Pagination]}   
              thumbs={{swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null}}
              pagination={{
                clickable: true,
              }}
              className= 'swiper_slider'>
          {imageList}
      </Swiper>
        <Swiper
            freeMode={true}
            watchSlidesProgress={true}
            onSwiper={setActiveThumb}
            spaceBetween={30}
            slidesPerView = {3}
            modules = {[FreeMode, Navigation, Thumbs]}
            className= 'swiper_thimbs'>
              <div className="swiper_thimbs-images">
                  {imageList}
              </div>
        </Swiper>
    </div>
  );
};



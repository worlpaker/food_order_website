//import React
import React, { Component } from 'react';
//import css
import './css/main.css';
//import swiper
import { Pagination, A11y, Autoplay as autoplay } from 'swiper';
import { Swiper, SwiperSlide, } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
//import images
import image1 from './media/Banners/Banner1.jpg';
import image2 from './media/Banners/Banner2.jpg';
import image3 from './media/Banners/Banner3.jpg';
import img_italian from './media/Cuisines/italian.jpg';
import img_mexican from './media/Cuisines/mexican.jpg';
import img_chinese from './media/Cuisines/chinese.jpg';
import img_american from './media/Cuisines/american.jpg';
import img_indian from './media/Cuisines/indian.jpg';
import img_japanese from './media/Cuisines/japanese.jpg';
import img_thai from './media/Cuisines/thai.jpg';

//home page, use swiper for images
//get images from frontend
function cuisine_menu() {
  const cuisine_images_list = [img_american, img_italian, img_mexican, img_chinese, img_indian, img_japanese, img_thai];
  const cuisine_names_list = ['American', 'Italian', 'Mexican', 'Chinese', 'Indian', 'Japanese', 'Thai'];
  const cuisine_names = cuisine_names_list.map((cuisine_names) => cuisine_names);
  const cuisine_images = cuisine_images_list.map((cuisine_images) => cuisine_images);
  const data = cuisine_names.map((val, index) => <div className='cuisine-menu'>
    <a className='cuisines-links' href='/restaurants'> <img className='cuisines-img' src={cuisine_images[index]} alt='cuisine img'></img><span align='center' className='cuisines-text'>{val}</span></a>
  </div>
  );
  return (
    <>
      {data}
    </>

  );
}

export class Home extends Component {

  render(
  ) {
    const Banner_images = [image1, image2, image3];
    // Banner images map
    const Banner = Banner_images.map((Banner_images) => <SwiperSlide><img alt='Banner' src={Banner_images} /></SwiperSlide>);

    return (
      <div className='under-nav'>
        <Swiper className='banner-images'
          // install Swiper modules
          modules={[Pagination, A11y, autoplay]}
          spaceBetween={50}
          slidesPerView='auto'
          autoplay={{ delay: 3000, disableOnInteraction: false }}


          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {Banner}

        </Swiper>
        <div className='cuisines-padding'> <h3>Browse by cuisine <a className='see-restaurants' href='/restaurants' >All Restaurants</a></h3> <br></br>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            <SwiperSlide>{cuisine_menu()}</SwiperSlide>
          </Swiper>

        </div>
      </div>

    );
  }
}
import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselItem from './CarouselItem';
import Slider from 'react-slick';
import {topMeal} from "./topMeal";

export const MutliItemCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay:true,
    autoplaySpeed:2000,
    arrows:false
  };
  return (
    <div>
        <Slider {...settings}>
          {topMeal.map((item)=>(<CarouselItem 
          image={item.image} 
          title={item.title}/>
          ))}
        </Slider>
    </div>
  )
}

export default MutliItemCarousel
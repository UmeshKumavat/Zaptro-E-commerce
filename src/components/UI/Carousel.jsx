import React, { useContext, useEffect } from "react";
import { DataContext, getData } from "../../context/dataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Category from "./Category";

const Carousel = () => {
  // const { data } = useContext(DataContext); //geting data from context 
  const {data} = getData() //getting data through custom hook in context.jsx

  const SampleNextArrow = (props) => {
    // console.log(props);
    const {className, style, onClick} = props
    return <div onClick={onClick} className={`arrow ${className}`} style={{zIndex: 3}}>
      <AiOutlineArrowRight className="arrows" style={{...style, display:"block", borderRadius: "50px", background:"#f53347", color:"white", position:"absolute", right:"50px", padding:"2px"  }} />
    </div>
  };
  const SamplePrevArrow = (props) => {
    // console.log(props);
    const {className, style, onClick} = props
    return <div onClick={onClick} className={`arrow ${className}`} style={{zIndex: 3}}>
      <AiOutlineArrowLeft className="arrows" style={{...style, display:"block", borderRadius: "50px", background:"#f53347", color:"white", position:"absolute", left:"50px", padding:"2px"  }} />
    </div>
  };

  var settings = {
    dots: false,
    autoplay: true,
    autoplayDelay: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover:false,
    nextArrow: <SampleNextArrow to="next" />,
    prevArrow: <SamplePrevArrow to="prev" />,
  };
  // console.log(data);
  return (
    <>
      <Slider {...settings} className="overflow-x-hidden">
        {data?.slice(0, 7)?.map((product, index) => {
          const { title, description, image } = product;
          // console.log(item);
          return (
            <div
              key={index}
              className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] -z-10"
            >
              <div className="flex flex-col md:flex-row gap-10 justify-center items-center h-[600px] my-20 md:my-0 px-4">
                {/* left section  */}
                <div className="space-y-3 md:space-y-6">
                  <h3 className="text-red-500 font-semibold font-sans text-sm">
                    Powering Your World with the Best in Electronics.
                  </h3>
                  <h1 className="text-white text-xl md:text-4xl font-bold uppercase line-clamp-2 md:line-clamp-3 md:w-[500px]">
                    {title}
                  </h1>
                  <p className="md:w-[500px] line-clamp-3 text-gray-400 pr-7">
                    {description}
                  </p>
                  <button className="bg-gradient-to-r from-red-500 to-purple-500 px-4 py-2 text-white cursor-pointer rounded-md mt-2">
                    Shop Now
                  </button>
                </div>
                {/* right section  */}
                <div>
                  <img
                    src={image}
                    alt={title}
                    className="rounded-full w-[550px] hover:scale-102 transition-all duration-300 shadow-2xl shadow-red-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
      <Category />
    </>
  );
};

export default Carousel;

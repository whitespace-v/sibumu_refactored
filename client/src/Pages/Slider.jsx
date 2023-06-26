import React from 'react';
import SwiperCore, {Navigation, Pagination, Scrollbar, Autoplay} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import img_personal from "../picture_izBrazzerie/hef.webp"
import {motion} from "framer-motion";
import {useState} from "react";
SwiperCore.use([Navigation, Pagination, Scrollbar]);

const elements = [
    {id:1, img: img_personal, text1: "ШЕФ", text2: "КИРИЛЛ САФРОНОВ", text3: "В поисках вкусов и впечатлений для наших посетителей", link: "?"},
    {id:2, img: img_personal, text1: "ШЕФ", text2: "ИГОРЬ ИГОРЕВИЧ", text3: "В поисках вкусов и впечатлений для наших посетителей", link: "?"},
    {id:3, img: img_personal, text1: "ШЕФ", text2: "РАМЗАН АХМАТОВ", text3: "В поисках вкусов и впечатлений для наших посетителей", link: "?"},
    {id:4, img: img_personal, text1: "ШЕФ", text2: "ПЕТР ПЕТРОВ", text3: "В поисках вкусов и впечатлений для наших посетителей", link: "?"},
]


const Slider = ({width_window, page_type, list, setClickOne, setClickThree, setClickTwo}) => {

    const navigationPrevRef = React.useRef(null)
    const navigationNextRef = React.useRef(null)
    let perView;
    if((width_window<1300)&&(width_window>700)){
        perView=2;
    }
    if(width_window<700){
        perView=1;
    }
    if(width_window>=1300){
        perView=4;
    }

    const [clickBlockTwo, setClickBlockTwo] = useState(false);

    const [clickBlockThree, setClickBlockThree] = useState(false);

    const [clickBlockOne, setClickBlockOne] = useState(true);

    if(page_type==="menu"){


        function changePosition(nameElement){
            switch(nameElement){
                case "block_logo_one":
                    if(clickBlockOne === false){
                        setClickBlockOne(!clickBlockOne)
                        setClickBlockTwo(false)
                        setClickBlockThree(false)
                        setClickTwo(false)
                        setClickOne(!clickBlockOne)
                        setClickThree(false)
                    }
                    break;
                case "block_logo_two": {
                    if(clickBlockTwo === false){
                        setClickBlockTwo(!clickBlockTwo)
                        setClickBlockOne(false)
                        setClickBlockThree(false)
                        setClickTwo(!clickBlockTwo)
                        setClickOne(false)
                        setClickThree(false)
                    }
                    break;
                }
                case "block_logo_three": {
                    if(clickBlockThree === false){
                        setClickBlockThree(!clickBlockThree)
                        setClickBlockTwo(false)
                        setClickBlockOne(false)
                        setClickTwo(false)
                        setClickOne(false)
                        setClickThree(!clickBlockThree)

                    }
                    break;
                }
            }
        }

        const scheckLogo = (elem) =>{
            switch (elem){
                case "block_logo_one": return clickBlockOne;
                case "block_logo_two": return clickBlockTwo;
                case "block_logo_three": return clickBlockThree

            }
        }



        return(
        <Swiper
            // modules={[Autoplay]}
            navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
            }}
            onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;
            }}
            slidesPerView={perView}
            // autoplay={{
            //     disableOnInteraction: false,
            //     delay: 4000,
            // }}
            speed={2000}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
        >
            {list.map(elementSlider => (
                <SwiperSlide key={elementSlider.id}>
                    <motion.div className={elementSlider.class_name} onClick={() => changePosition(elementSlider.class_name)}>
                        <img src={scheckLogo(elementSlider.class_name) ? elementSlider.imageTwo : elementSlider.imageOne}
                             alt="logotype" className="logotype_in_block"/></motion.div>
                </SwiperSlide>
            ))}
            <div className="pref" ref={navigationPrevRef}/>
            <div className="next" ref={navigationNextRef}/>
        </Swiper>
        );
    }


    else {
        return (
            <Swiper
                modules={[Autoplay]}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                }}
                slidesPerView={perView}
                autoplay={{
                    disableOnInteraction: false,
                    delay: 4000,
                }}
                speed={2000}
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
            >
                {elements.map(elementSlider => (
                    <SwiperSlide key={elementSlider.id}>
                        <div className="card_personal">
                            <div className="window_with_img">
                                <img className="person_img" src={elementSlider.img} alt="photo_personal"/>
                            </div>

                            <button className="buttonPerson" onClick={elementSlider.link}>
                                <div className="elementButton"/>
                            </button>

                            <div className="info_about_person">
                                <div className="title_all">
                                    <h2 className="job_title">{elementSlider.text1}</h2>
                                    <h2 className="name">{elementSlider.text2}</h2>
                                </div>
                                <div className="text_about_persone">
                                    <h className="info">{elementSlider.text3}</h>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                <div className="pref" ref={navigationPrevRef}/>
                <div className="next" ref={navigationNextRef}/>
            </Swiper>

        );
    };
};

export default Slider;
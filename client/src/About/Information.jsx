import React from 'react';
import LineBackText from "./LineBackText";
import img_logotype from '../HeaderBlock/pictures_footer/Бразери в лого и в проекты_1.png'
import mobileBackground from "../picture_izBrazzerie/about_mobile.jpg";
import {motion} from 'framer-motion'
import newVideo from "../videos/about.mp4"
const Information = ({lines}) => {

    const variantTitle = {
        visible:{
            y: 0,
            opacity: 1,
        },
        notVisible:{
            y: 150,
            opacity: 0,
        }
    }

    // Получаем текущие размеры экрана
    const windowSize = React.useRef([window.innerWidth, window.innerHeight]);
    const screenWidth = windowSize.current[0];

    // По умолчанию отображаем видео на фоне
    var background = <img className='video_info' src={mobileBackground} alt='background'/>

    // Если пользователь зашел на сайт с мобильного устройства, то на фон ставим изображение
    if (screenWidth >= 700) {
        background = <video className="video_info" autoPlay loop muted>
                        <source className='video_mp4' src={newVideo} type='video/mp4'/>
                    </video> 
    } 

    return (
        <div className="background_and_texts">

            {/*Серая картинка с текстом*/}
            <div className="splash_screen">
                {background}
            </div>

            <motion.div className="text_on_img" whileInView={'visible'} initial={'notVisible'}
                        viewport={{ once: true, amount: 0.1}}>
                <div className="img_on_background"><motion.div variants={variantTitle} transition={{duration: 1}}><img className="title_picture" src={img_logotype} alt="logotype company"/></motion.div></div>

                <motion.div className="all_lines" variants={variantTitle} transition={{duration: 1, delay: 0.5}}>
                    {lines.map(line => <LineBackText line={line} key={line.id}/>)}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Information;
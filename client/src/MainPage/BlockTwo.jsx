import React from 'react';
import {motion} from "framer-motion";
import arrow_right from '../picture_izBrazzerie/arrow_right.webp'
import arrow_right_png from '../picture_izBrazzerie/arrow_right.png'
import line from "../picture_izBrazzerie/line3.jpeg"
const BlockTwo = ({state}) => {

    const VarianceArrow = {
        open: {
            y:0,
            rotate: "100grad",
            opacity: 1,

        },
        close: {
            y: "100%",
            rotate: "100grad",
            opacity: 0,
        }

    }

    const VarianceText = {
        open: {
            y: 0,
            opacity: 1,
        },
        close: {
            y: "100%",
            opacity: 0,
        }

    }


    const VarianceButton = {
        open: {
            opacity: 1,
        },
        close: {
            opacity: 0,
        }

    }

    return (
        <div className="block2">
            <motion.div className="main_information_on_blockTwo"
                        whileInView='open'
                        initial='close'
                        viewport={{ once: true, amount: 0.4}}>
            <div className="information_on_blockTwo">
            <div className="title_blockTwo"><motion.h3 variants={VarianceText} transition={{duration: 1}}>ВСЕ ЛЮБИМЫЕ ЗАВЕДЕНИЯ - В ОДНОМ МЕСТЕ</motion.h3></div>
            <div className="animation">
                <div className="snake_pool_outside">
                <motion.div className="snake_pool" variants={VarianceText} transition={{duration: 1, delay: 0.5}}>
                <motion.div className="snake" initial={{x:0}} animate={{x:"-125px"}} transition={{repeat: Infinity, duration: 20, ease: "linear"}}>
                    <img src={line} alt="line" className="line_in_snakePool"/>
                </motion.div>
                </motion.div>
                </div>
            </div>
            <div className="text_blockTwo"><motion.p variants={VarianceText} transition={{duration: 1, delay: 1}}>У нас для вас - приятные новости! Мы объединили доставку из наших проектов: кондитерской КОНДИТОРИЯ, ресторана японской и паназиатской кухни SIBUMI и одноименного гастропаба IZ BRASSERIE. Теперь вы можете быстро и удобно заказать доставку из любимых ресторанов - домой. Для заказа, спуститесь ниже и начните поиск блюд</motion.p></div>
            <motion.div className="button_start_page" variants={VarianceButton} transition={{duration: 1, delay: 1.5}}>
								<a className='remove_underline' href="/menu">
										<motion.button className="button_go_menu" whileHover={{backgroundColor: "white", color: "rgba(206, 189, 160)"}}>ПЕРЕЙТИ В МЕНЮ</motion.button>
								</a>
            </motion.div>
            </div>
            </motion.div>

            <motion.div className={state < 1200 ? "text_with_arrow_off" : "text_with_arrow"}
                        variants={VarianceArrow}
                        whileInView='open'
                        initial='close'
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{duration: 1, delay: 1}}
                        onClick={()=>window.scrollBy(0, window.innerHeight)}>
                <div className="pointer_text">
                    <p>Перейти к заказу </p>
                </div>
                <motion.div className="pointer_img" animate={{x:[0, 20, 0]}} transition={{duration: 3, delay: 3 ,repeat: Infinity}}>

                    <picture>
                        <source srcSet={arrow_right} type="image/webp"/>
                        <source srcSet={arrow_right_png} type="image/png"/>
                        <img className="img_point" src={arrow_right} alt="point"/>
                    </picture>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default BlockTwo;

import React, {useState} from 'react';
import BurgerWindow from "./BurgerWindow";
import burger_img from '../HeaderBlock/pictures_footer/бургер.webp'
import burger_img_png from '../HeaderBlock/pictures_footer/бургер.png'
import busket_img from '../HeaderBlock/pictures_footer/Корзина.webp'
import busket_img_png from '../HeaderBlock/pictures_footer/Корзина (1).png'
import {motion} from "framer-motion";
import {useSelector} from "react-redux";
const BasketAndBurger = () => {

    const [active, setActivate] = useState(false);

    const setOptions=()=>{
        setActivate(true);
        document.body.style.overflow = 'hidden';
    }

    const element=useSelector((state)=>state.index.length);

    return (
        <div className="block_with_buttons">
            <div className="animated_basket">

                <div className="img_busket_anim">
										<a href="/basket">
												<picture>
														<source srcSet={busket_img} type="image/webp"/>
														<source srcSet={busket_img_png} type="image/png"/>
														<img className="img_basket" src={busket_img} alt="busket button"/>
												</picture>
										</a>										
                </div>

                <div className="counter_busket"><div className="count_in_busket">{element}</div></div>
                <motion.div className="circular" animate={{rotate: 360}} transition={{duration: 55, delay: 0, repeat: Infinity, ease: "linear"}}>
                <svg viewBox="0 0 100 100">
                <path d="M 0,50 a 50,50 0 1,1 0,1 z"
                    id="circle" />
                <text><textPath className="animation_circle_text" href="#circle" fill="#cebda0">
                    ЕДУ СКЛАДЫВАТЬ СЮДА  &nbsp; ЕДУ СКЛАДЫВАТЬ СЮДА &nbsp; ЕДУ СКЛАДЫВАТЬ СЮДА &nbsp;
                </textPath>
                </text>
        </svg>
</motion.div>
            </div>

            <div className="mobile_buttons">
                <div className="basket">
										<a href="/basket">
												<img className="busket_img" src={busket_img} alt="busket_img"/>
										</a>
								</div>
                <div onClick={setOptions} className="burger">

                    <picture>
                        <source srcSet={burger_img} type="image/webp"/>
                        <source srcSet={burger_img_png} type="image/png"/>
                        <img className="burger_img" src={burger_img} alt="burger button"/>
                    </picture>
										

                </div>
                <BurgerWindow active={active} setActive={setActivate}/>
            </div>
        </div>
    );
};

export default BasketAndBurger;

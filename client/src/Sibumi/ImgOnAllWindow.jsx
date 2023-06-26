import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import arrow from '../picture_izBrazzerie/arrow_allWindow.svg'

const ImgOnAllWindow = ({active, setActive, activePool, img, startImg, clickL, clickR}) => {

    const variantImg = {
        visible:{
            opacity: 1,
            y: 0,
        },
        notVisible:{
            opacity: 0,
            y:1000,
        }
    }

    const setParamsImg = () =>
    {
        setActive(!active);
        activePool(false);
        document.body.style.overflow="visible";
    }


    return (
        <motion.div className= {(active && (window.innerWidth>800)) ? "windowAll active" : "windowAll"} onClick={setParamsImg}>
            <motion.div className="windowImg" variants={variantImg} animate={active ? "visible" : "notVisible"} transition={{duration: 0.9}}>
                <picture>
                    <img className="pictureOnWindow"  src={img} alt="big_picture"/>
                </picture>
            </motion.div>
        </motion.div>
    );
};

export default ImgOnAllWindow;
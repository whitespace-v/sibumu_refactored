import React from 'react';
import {motion} from "framer-motion";
import close_picture from "../HeaderBlock/pictures_footer/в корзине (1).webp";
import close_picture_png from "../HeaderBlock/pictures_footer/в корзине (1).png";

const animation ={
    'open': {
        y: 0,
        opacity: 1,
    },
    'close': {
        y: 100,
        opacity: 0,
    }
}

const animationText ={
    'open': {
        y: 0,
        opacity: 1,
    },
    'close': {
        y: 200,
        opacity: 0,
    }
}

const BlockWithText = (props) => {
    if ((props.block.id === 1) || (props.block.id === 3)) {
        return (
            <motion.div className="block" whileInView={'open'} initial={'close'} viewport={{ once: true, amount: 0.1}}>
                <div className="title_scooter">

                    {/* <picture>
                        <source srcSet={props.block.img} type="image/webp"/>
                        <source srcSet={props.block.img_png} type="image/png"/>
                        <motion.img variants={animation} transition={{duration: 1}} className="scooter styleText2" src={props.block.img} alt="title+scooter"/>
                    </picture> */}

                    <motion.h2 variants={animation} transition={{duration: 1}} className="title_block">{props.block.title}</motion.h2>
                </div>
                <motion.div variants={animationText} transition={{duration: 1, delay: 0.5}} className="text_block3 styleText2">
                    <h>{props.block.text}</h>
                </motion.div>
            </motion.div>
        )
    } else {
        return (
            <motion.div className="block_second" whileInView={'open'} initial={'close'} viewport={{ once: true, amount: 0.1}}>
                <div className="title_scooter">
                    <motion.img variants={animation} transition={{duration: 1}} className="scooter styleText1" src={props.block.img} alt="title+scooter"/>
                    <motion.h2 variants={animation} transition={{duration: 1}} className="title_block">{props.block.title}</motion.h2>
                </div>
                <motion.div variants={animationText} transition={{duration: 1, delay: 0.5}} className="text_block3 styleText1">
                    <h>{props.block.text}</h>
                </motion.div>
            </motion.div>
        );
    }
}

export default BlockWithText;
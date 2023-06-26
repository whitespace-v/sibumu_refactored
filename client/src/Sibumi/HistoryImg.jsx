import React from 'react';
import {motion} from "framer-motion";

const HistoryImg = ({history_or_legend_img, history_or_legend_img_png, text1, text2, legend}) => {
    const variantHistoryImg = {
        visible:{
            opacity: 1,
        },
        notVisible:{
            opacity: 0,
        }
    }
    if(legend===0) {
        return (
            <motion.div className="history_img" whileInView={'visible'} initial={'notVisible'}
                        viewport={{ once: true, amount: 0.1}} variants={variantHistoryImg} transition={{duration: 1.5}}>

                <picture>
                    <source srcSet={history_or_legend_img} type="image/webp"/>
                    <source srcSet={history_or_legend_img_png} type="image/png"/>
                    <img className="img_meat" src={history_or_legend_img} alt="meat"/>
                </picture>

                <div className="img_text1">{text1}</div>
                <div className="img_text2">{text2}</div>
            </motion.div>
        );
    }
    else {
        return(
        <motion.div className="legend_img" whileInView={'visible'} initial={'notVisible'}
                    viewport={{ once: true, amount: 0.1}} variants={variantHistoryImg} transition={{duration: 1.5}}>

            <picture>
                <source srcSet={history_or_legend_img} type="image/webp"/>
                <source srcSet={history_or_legend_img_png} type="image/png"/>
                <img className="img_strawberry" src={history_or_legend_img} alt="strawberry"/>
            </picture>
        </motion.div>
        );
    }
};

export default HistoryImg;
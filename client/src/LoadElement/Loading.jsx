import React from 'react';
import "../LoadElement/css/Load.css"
import loafingPicture from "./pictureLoad/load.jpg"
import {motion} from "framer-motion";
const Loading = () => {
    return (
        <div className="load_pool">
            <motion.div className="inside_small_load_block" animate={{rotate: 360}} transition={{duration: 2, ease: "linear", repeat: Infinity}}>
                <img src={loafingPicture} className="picture_load"/>
            </motion.div>
        </div>
    );
};

export default Loading;
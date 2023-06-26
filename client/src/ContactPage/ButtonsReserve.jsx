import React from 'react';
import {motion} from "framer-motion";
const ButtonsReserve = ({name, func, position}) => {
    const setPosition = () => {
       position(window.scrollY);
        func()
    }

    return (
        <div>
            <motion.button onClick={setPosition} whileHover={{backgroundColor: "#cebda0", color: "white"}} transition={{duration: 0.7}} className={name}>ЗАБРОНИРОВАТЬ СТОЛИК</motion.button>
        </div>
    );
};

export default ButtonsReserve;
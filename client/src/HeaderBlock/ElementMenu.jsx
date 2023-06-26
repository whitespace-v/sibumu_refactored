import React from 'react';
import {motion} from 'framer-motion'
const ElementMenu = (props) => {

    // Так как в реализации Макара сюда передается массив элементов, требуется оставить этот костыль, дабы файл был скачиваемым
    var htmlToRender;
    if(props.elementMenu.link == "Фуршетное меню а3 4 (1).pdf") {
        htmlToRender = <motion.a whileHover={{color: "rgb(206, 189, 160)"}} transition={{duration: 0.5}} href={props.elementMenu.link} className={props.style} download>{props.elementMenu.signature}</motion.a>
    } else {
        htmlToRender = <motion.a whileHover={{color: "rgb(206, 189, 160)"}} transition={{duration: 0.5}} href={props.elementMenu.link} className={props.style}>{props.elementMenu.signature}</motion.a>
    }
    return (
        <div>
            {htmlToRender}
        </div>
    );
};

export default ElementMenu;
import React, {useState} from 'react';
import ElementMenu from "./ElementMenu";
import {motion} from "framer-motion";
const MenuElements = ({outer_class, inner_class, massiv, style_elements, bolder_check}) => {

    const [active, setActive] = useState(false);
    // console.log(active)
    return (
        <div className={outer_class}>
            <motion.div className={inner_class} onHoverStart={()=>setActive(true)} onHoverEnd={()=>setActive(false)}>
            {
                massiv.map(elementMenu => <ElementMenu elementMenu={elementMenu} key={elementMenu.id} style={((bolder_check === elementMenu.id)||(bolder_check === elementMenu.link)&&(active===false)) ? "bolder_elem" : style_elements}/>)
            }
            </motion.div>
        </div>
    );
};

export default MenuElements;

import React from 'react';
import ElementLinkList from "./Element_LinkList";
import "./css/LinkLine.css"
import {motion} from "framer-motion";

const LineWithLinks = ({active, setActive, list_map}) => {
    return (
        <div className="links_menu">
            <motion.div className="inside_link_pool" animate={{y:0, opacity: 1}} initial={{y:100, opacity: 0}} transition={{duration: 1, delay:0.3}}>
                {list_map.map(element_link => <ElementLinkList element_link={element_link} key={element_link.id} active={active} setActive={setActive}/>)}
            </motion.div>
        </div>
    );
};

export default LineWithLinks;
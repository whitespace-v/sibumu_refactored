import React, {useState} from 'react';
import {motion} from "framer-motion";

const ElementLinkList = (props) => {
    const [select, setSelect] = useState(false);

    const check_start_link = () => {
        if ((props.active === 0) && (props.element_link.id === 1)) {
            return true;
        } else {
            return props.active === props.element_link.id;
        }
    }

    const checkActive = () => {
          setSelect(!select);
          props.setActive(props.element_link.id);
      }


    return (
        <div className="element_link">
            <motion.button onClick={checkActive} className={check_start_link() ? "button_active" : "button_link"}>{props.element_link.text_button}</motion.button>
        </div>
    );
};

export default ElementLinkList;
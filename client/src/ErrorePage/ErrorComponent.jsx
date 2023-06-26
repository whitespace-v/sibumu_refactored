import React from 'react';
import {motion} from "framer-motion";
const ErrorComponent = () => {
    return (
        <div className="error_pool">
            <div className="error_element">
                <div className="block_with_numbers">
                    <div className="number">4</div>
                    <div className="number">0</div>
                    <motion.div className="number" animate={{rotate: 20}} initial={{rotate: 0}} transition={{duration: 1}}>4</motion.div>
                </div>
                <div className="block_with_text">
                    <div className="text_error">Извините, мы не нашли такой страницы :(</div>
                </div>
            </div>
        </div>
    );
};

export default ErrorComponent;
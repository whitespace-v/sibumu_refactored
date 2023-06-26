import React, {useState} from 'react';
import {motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {uppCount, delCount} from "../Pages/ReducerRedux"
const Button = ({id, count, type}) => {
    const [countBasketAdd, setCountBasketAdd] = useState(count);
    const dispatch = useDispatch()

    function plusBasketElement(){
        setCountBasketAdd(countBasketAdd+1);
        dispatch(uppCount({id: id}));
    }

    function minusBasketElement(){
        if(countBasketAdd>1) {
            setCountBasketAdd(countBasketAdd-1);
            dispatch(delCount({id: id}));
        }
    }

    return (
        <div className={type === "finishWindow" ? "Button_order_inBasket_close" : "Button_order_inBasket"}>
            <motion.div className={type === "finishWindow" ?  "minus_button_order_close" : "minus_button_order"} whileHover={{opacity: 0.5}} transition={{duration: 0.3}} onClick={minusBasketElement}>-</motion.div>
                <div className="count_order">{type==="finishWindow" ? count : countBasketAdd}</div>
            <motion.div className={type === "finishWindow" ? "plus_button_order_close" : "plus_button_order"} whileHover={{opacity: 0.5}} transition={{duration: 0.3}} onClick={plusBasketElement}>+</motion.div>
        </div>
    );
};

export default Button;

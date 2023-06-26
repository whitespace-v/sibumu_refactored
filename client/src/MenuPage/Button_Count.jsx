import React from 'react';
import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { uppCount, delCount } from "../Pages/ReducerRedux"

const ButtonCount = ({ id, inBasket }) => {
	const basketRes = useSelector((state) => state.index);

	const initialCount = () => {
		if (inBasket()) {
			return basketRes.find(element => element.id == id).count
		} else {
			return 1
		}
	}

	const [countAdd, setCountAdd] = useState(initialCount);

	const dispatch = useDispatch()

	function plusElement() {
		setCountAdd(countAdd + 1);
		dispatch(uppCount({ id: id }));
	}
	function minusElement() {
		if (countAdd > 1) {
			setCountAdd(countAdd - 1);
			dispatch(delCount({ id: id }));
		}
	}
	return (
		<div className="button_count">
			<motion.div className="plus_button" whileHover={{ opacity: 0.5 }} transition={{ duration: 0.3 }} onClick={minusElement}>-</motion.div>
			<div className="count">{countAdd}</div>
			<motion.div className="minus_button" whileHover={{ opacity: 0.5 }} transition={{ duration: 0.3 }} onClick={plusElement}>+</motion.div>
		</div>
	);
};

export default ButtonCount;

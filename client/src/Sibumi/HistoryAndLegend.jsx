import React from 'react';
import { motion } from "framer-motion";

const HistoryAndLegend = ({ title, text, legend }) => {

	const variantHistoryText = {
		visible: {
			opacity: 1,
		},
		notVisible: {
			opacity: 0,
		}
	}

	if (legend === 0) {
		return (
			<motion.div className="text_legend_history" whileInView={'visible'} initial={'notVisible'}
				viewport={{ once: true, amount: 0.1 }} variants={variantHistoryText} transition={{ duration: 1.5 }}>
				<div className="title_history">{title}</div>
				<div className="text_history">{text}</div>
			</motion.div>
		);
	}
	else {
		return (
			<motion.div className="legendText" whileInView={'visible'} initial={'notVisible'}
				viewport={{ once: true, amount: 0.1 }} variants={variantHistoryText} transition={{ duration: 1.5 }}>
				<h2 className="title_history">{title}</h2>
				<div className="text_history">{text}</div>
			</motion.div>
		);
	}
};


export default HistoryAndLegend;

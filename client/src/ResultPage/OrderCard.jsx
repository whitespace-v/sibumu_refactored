import React from 'react';
import { motion } from "framer-motion";

const OrderCard = (props) => {

	function checkOnLastElement() {
		return props.order.id === props.masline;
	}

	return (
		<div className="order_card">
			<div className="fake_element" />
			<div className="order_inside_block">
				<div className={checkOnLastElement() ? "order_card_last" : "main_order_block"}>
					<div className="order_photo">
						<img className="order_picture_inside_block" src={'https://images.iz-brasserie.ru/get/' + props.order.id} alt="photo order" />

					</div>
					<div className="title_order">
						<div className="title_element_order">Название</div>
						<div className="text_order">
							<div className="text_position_order">{props.order.name}</div>
						</div>
					</div>
					<div className="button">
						<div className="title_element_order_count">Кол-во</div>
						<span>{props.order.count}</span>
					</div>

					<div className="title_order_MobileVersion">
						<h3 className="text_order">{props.order.name}</h3>
					</div>

					<div className="prise">
						<div className="title_element_order_prise">Цена</div>
						<h3 className="title_prise">{props.order.sum} Р</h3>
					</div>

					<div className={props.type === "finishWindow" ? "close" : "delete"} style={{display: 'none'}}>
						<motion.div className="block_for_close_button_order" whileHover={{ opacity: 0.5 }} transition={{ duration: 0.3 }}>

						</motion.div>
					</div>
				</div>
			</div>=
		</div>
	);
};

export default OrderCard;

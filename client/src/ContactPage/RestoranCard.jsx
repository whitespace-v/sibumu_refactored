import React, { useEffect, useState } from 'react';
import ButtonsReserve from "./ButtonsReserve";
import Form from "./FormToReserveTable";
import { motion } from "framer-motion";
const RestoranCard = (props) => {
	const [active, setActive] = useState(false);
	const [position, setPosition] = useState(0)

	const logotypeAnimation = {
		on_vision: {
			y: 0,
			opacity: 1,
		},
		off_vision: {
			y: 100,
			opacity: 0,
		}
	}
	const pointAnimation = {
		on_vision: {
			opacity: 1,
		},
		off_vision: {
			opacity: 0,
		}
	}

	if (active === true) {
		document.body.style.position = "fixed";
		document.body.style.width = "100%";
		document.body.style.height = "100%";
		document.body.style.left = "-8px";
		document.body.style.top = "-8px";
		document.body.style.top = -position - 8 + 'px';
	}
	else {
		document.body.style.position = "static";
		window.scrollBy(0, position);
	}
	return (
		<motion.div className="elem" whileInView={'on_vision'} initial={'off_vision'} viewport={{ once: true, amount: 0.6 }}>
			<div className="pictureOnContact">
				<motion.div className="main_logotype_block" variants={logotypeAnimation} transition={{ duration: 0.5 }}>
					<picture>
						<source srcSet={props.card.logotype_picture} type="image/webp" />
						<source srcSet={props.card.logotype_picture_png} type="image/png" />
						<img className="logotype_img_contacts" src={props.card.logotype_picture} alt="logotype" />
					</picture>
				</motion.div>
			</div>

			<div className={props.card.textStyle}>
				<div className="block_1">
					<motion.div variants={logotypeAnimation} transition={{ duration: 0.5, delay: 0.4 }} className="text_block_elem">
						<p className="text_in_block">{props.card.street}</p>
						<a className="text_in_block" href={"tel:" + props.card.phone}>{props.card.phone}</a>
					</motion.div>
				</div>

				<div className="block_2">
					<motion.div variants={logotypeAnimation} transition={{ duration: 0.5, delay: 0.4 }}>
						<p className="text_in_block">Режим работы:</p>
						<p className="text_in_block">{props.card.workdaysOne}</p>
						<p className="text_in_block">{props.card.workdaysTwo}</p>
					</motion.div>
				</div>
			</div>

			<motion.div className={props.card.pointStyle} variants={pointAnimation} transition={{ duration: 0.5, delay: 0.8 }}>

			</motion.div>

			<motion.div className="map_reserve" variants={pointAnimation} transition={{ duration: 1, delay: 0.8 }}>
				<a className="link_map" target="_blank" href={props.card.url}>на карте</a>
				<ButtonsReserve func={() => setActive(true)} position={setPosition} name={props.card.name} />
				<Form active={active} setActive={setActive} place={props.card.id} />
			</motion.div>
		</motion.div>
	);
};

export default RestoranCard;

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import imgClose from '../HeaderBlock/pictures_footer/в корзине (1).webp'
import imgClosePng from '../HeaderBlock/pictures_footer/в корзине (1).png'
import MenuElements from "./MenuElements";
import axios from 'axios'

const BurgerWindow = ({ active, setActive }) => {

	const variantsBurger = {
		open: {
			left: 0,
			opacity: 1,
		},
		close: {
			left: "-100%",
			opacity: 0,
		}
	}

	const variantsTextBurger = {
		open: {
			x: 0,
			opacity: 1,
		},
		close: {
			x: -100,
			opacity: 0,
		}
	}

	const [elements, setElements] = useState([])

	useEffect(() => {
		async function fetchElements() {
			const firstElements = [{ id: 1, signature: "О ПРОЕКТЕ", link: "/about" },
			{ id: 2, signature: "ЗАКАЗАТЬ ДОСТАВКУ", link: "/menu" }]

			const secondElements = [{ id: 3, signature: "SIBUMI", link: "/sibumi" },
			{ id: 4, signature: "IZ BRASSERIE", link: "/iz-brasserie" },
			{ id: 5, signature: "КОНДИТОРИЯ", link: "/konditoria" },
			{ id: 6, signature: "-", link: "" },]

			const response = await axios('/api/special-header')
			const { data } = response

			data.length && data.forEach((item) => {
				firstElements.push({ id: item.id, signature: item.name, link: '/specials/' + item.URL })
			})

			setElements(firstElements.concat(secondElements))
		}
		fetchElements();
	}, [])

	let elementsTwo = [
		{ id: 1, signature: "КЕЙТЕРИНГ", link: "Фуршетное меню а3 4 (1).pdf" },
		{ id: 2, signature: "КОНТАКТЫ", link: "/contacts" },
		{ id: 3, signature: "ДОСТАВКА", link: "/delivery" },
		{ id: 4, signature: "ОПЛАТА", link: "/payment" },
	]

	const setOptions = () => {
		setActive(false);
		document.body.style.overflow = 'scroll';
	}

	// if(active === true){
	//     document.body.style.overflow = 'hidden'
	// }
	// else{
	//     document.body.style.overflow = 'normal'
	// }

	return (
		<motion.div className={"burger_window"} animate={active ? "open" : "close"} initial={{ left: "-100%" }} variants={variantsBurger} transition={{ duration: 0.5 }}>
			<motion.div className="activePool" animate={active ? "open" : "close"}>
				<motion.div className="first_element_burger" variants={variantsTextBurger} transition={{ delay: 0.3, duration: 0.5 }}>
					{/* eslint-disable-next-line react/style-prop-object */}
					<MenuElements massiv={elements} inner_class="line_burger" outer_class="main_burger" style_elements="burger_style" />
				</motion.div>

				<motion.div className="second_element_burger" variants={variantsTextBurger} transition={{ delay: 0.6, duration: 0.5 }}>
					{/* eslint-disable-next-line react/style-prop-object */}
					<MenuElements massiv={elementsTwo} inner_class="line_burger_two" outer_class="main_burger_two" style_elements="burger_style_two" />
				</motion.div>

				<motion.div className="number_points" animate={active ? "open" : "close"} variants={variantsTextBurger} transition={{ delay: 0.9, duration: 0.5 }}>
					{/*<h2 className="phone_number">+7(999) 000-00-00</h2>*/}
					<div className="points">
						<div className="point" />
						<div className="point" />
					</div>
				</motion.div>
			</motion.div>
			<div className="button_close">
				<button className="close" onClick={setOptions}>
					<div>ЗАКРЫТЬ</div>
					<div className="img_close">
						<picture>
							<source srcSet={imgClose} type="image/webp" />
							<source srcSet={imgClosePng} type="image/png" />
							<img className="img_close_inside" src={imgClose} alt="close menu" />
						</picture>
					</div></button>
			</div>
		</motion.div>
	);
};

export default BurgerWindow;

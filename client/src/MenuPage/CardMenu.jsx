import React, { useState } from 'react';
import "./css/CardMenu.css"
import basket_img from "../HeaderBlock/pictures_footer/Корзина.webp"
import basket_img_png from "../HeaderBlock/pictures_footer/Корзина (1).png"
import ButtonCount from "./Button_Count"
import { motion } from "framer-motion";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { persister } from "../Pages/PersistReduxConfiguration";
import { PersistGate } from "redux-persist/integration/react";
import { addOrder, uppBasket } from "../Pages/ReducerRedux";

const CardMenu = (props) => {

	const basketRes = useSelector((state) => state.index);

	// Изменение цвета названия ресторана на карточке блюда в зависимости от ресторана
	var backgroundRestaurantColor = '';

	switch (props.page) {
		case 'КОНДИТОРИЯ':
			backgroundRestaurantColor = '_conditory';
			break;
		case 'SIBUMI':
			backgroundRestaurantColor = '_sibumi';
			break;
		case 'IZ BRASSERIE':
			backgroundRestaurantColor = '_iz_brazzerie';
			break;
		default:
			break;
	}
		
	const inBasket = () => {
		if (basketRes.find(elem => elem.id === props.element.id))
			return true
		else
			return false
	}

	const initialCount = () => {
			if (inBasket()) {
					return 5
			} else {
					return 1
			}
	}

	const [selectImg, setSelectImg] = useState(inBasket);

	const changeButton = {
		close: {
			rotateX: "270deg",
			opacity: 0,
		}
	}

	const changeCountButton = {
		open: {
			rotateX: "360deg",
			display: "block",
			opacity: 1,
		}
	}

	const [countAdd, setCountAdd] = useState(1);
	const dispatch = useDispatch();

	function addElementInBasket() {
		setSelectImg(!selectImg)
		dispatch(addOrder({ id: props.element.id, img: props.element.img_elem, name: props.element.name, count: countAdd, price: props.element.prise, summa: props.element.prise, gramm: props.element.gramm, guid: props.element.iiko_id, special: props.element.special }));
	}
		// TOOD: убрать хардкод ссылок на картинки

	return (
		<motion.div className="card_block" animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 1, delay: 0.4 }}>
				<div className="picture_block">
					<div className="background_block">
						<div className={"background_button_element" + backgroundRestaurantColor}>
							<p className={"text_background_element" + backgroundRestaurantColor}>{props.page}</p>
						</div>
					</div>
				<a className="product_link" href={props.cardUrl + props.element.id}>			
					<div className="front_picture_block">

						<picture>
							<source srcSet={'https://images.iz-brasserie.ru/get/' + props.element.iiko_id} type="image/webp" />
							<source srcSet={'https://images.iz-brasserie.ru/get/' + props.element.iiko_id} type="image/png" />
							<img src={'https://images.iz-brasserie.ru/get/' + props.element.iiko_id} alt="picture_menu" className="img_position_menu" />
						</picture>

					</div>
				</a>
				</div>
			<div className="text_block">
				<a className="product_link" href={'/menu/' + props.element.id}>
					<div className="block_with_text_menuElem">
						<div className="name_elem_menu">
							{props.element.name}
						</div>
						<div className="prise_block">
							{props.element.prise} Р
						</div>
					</div>
				</a>
				<div className="block_with_icon">
					<motion.div className={"inside_basket_block"} onClick={addElementInBasket} variants={changeButton} animate={selectImg ? "close" : "open"} transition={{ duration: 1 }}>

						<picture>
							<source srcSet={basket_img} type="image/webp" />
							<source srcSet={basket_img_png} type="image/png" />
							<img src={basket_img} alt="basket_page" className="basket_img" />
						</picture>

					</motion.div>

					<motion.div className="button_count_block" variants={changeCountButton} initial={{ opacity: 0, display: "none", rotateX: "180deg" }} animate={selectImg ? "open" : "close"} transition={{ duration: 0.5, delay: 1 }}>
						<Provider store={store}>
							<PersistGate loading={null} persistor={persister}>
								<ButtonCount name={props.element.name} img={props.element.img_elem} price={props.element.prise} id={props.element.id} gramm={props.element.gramm} inBasket={inBasket} />
							</PersistGate>
						</Provider>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
};

export default CardMenu;

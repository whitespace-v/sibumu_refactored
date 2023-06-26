import React, { useEffect, useState } from 'react';
import Logo from "./Logo";
import MenuElements from "./MenuElements";
import './css/Header.css';
import '../HeaderBlock/css/ElementsMenu.css'
import BasketAndBurger from "./BasketAndBurger";
import store, { persister } from "../Pages/PersistReduxConfiguration";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import axios from 'axios';

const Header = ({ bold_block, style_element }) => {
	const [menu, setMenu] = useState([])

	useEffect(() => {
		async function fetchMenu() {
			const beforeMenu = [
				{ id: 1, signature: "О ПРОЕКТЕ", link: "/about" },
				{ id: 2, signature: "ЗАКАЗАТЬ ДОСТАВКУ", link: "/menu" },
			]

			const afterMenu = [
				{ id: 3, signature: "SIBUMI", link: "/sibumi" },
				{ id: 4, signature: "IZ BRASSERIE", link: "/iz-brasserie" },
				{ id: 5, signature: "КОНДИТОРИЯ", link: "/konditoria" },
				{ id: 6, signature: "КЕЙТЕРИНГ", link: 'Фуршетное меню а3 4 (1).pdf' },
				{ id: 7, signature: "КОНТАКТЫ", link: '/contacts' }
			]

			const response = await axios('/api/special-header')
			const middleMenu = response.data
			console.log(middleMenu)

			middleMenu.length && middleMenu.forEach((item) => {
				beforeMenu.push({ id: item.id, signature: item.name, link: '/specials/' + item.URL })
			})

			setMenu(beforeMenu.concat(afterMenu))
		}
		fetchMenu()
			console.log(menu)
	}, [])

	return (
		<div className="headerMenu">
			<Logo />
			<MenuElements bolder_check={bold_block} outer_class="menu" style_elements={style_element} inner_class="lineOne" massiv={menu} />

			<Provider store={store}>
				<PersistGate loading={null} persistor={persister}>
					<BasketAndBurger />
				</PersistGate>
			</Provider>
		</div>
	);
};

export default Header;

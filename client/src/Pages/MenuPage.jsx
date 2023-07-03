import React, { useState, useEffect } from 'react';
import Header from "../HeaderBlock/Header"
import PageType from "../PageType/PageType"
import "../MenuPage/css/MenuPage.css"
import logo_Iz_Brasserie from "../ContactPage/pictures/Brazeri_kofeyny.png"
import logo_Sibumi from "../ContactPage/pictures/SIIbumi_kofeyny.png"
import logo_Konditoriya from "../ContactPage/pictures/konditor_kofeyny.png"
import logo_Iz_Brasserie_black from "../ContactPage/pictures/Brazeri_black_new.png"
import logo_Sibumi_black from "../ContactPage/pictures/SIIbumi_black_new.png"
import logo_Konditoriya_black from "../ContactPage/pictures/konditor_black_new.png"
import IzBrasserie_block from "../MenuPage/Block_For_IzBrasserie"
import Sibumi_block from "../MenuPage/Block_For_Sibumi"
import { motion } from "framer-motion";
import { Dimensions } from "react-native-web";
import LineWithRestaurant from "../MenuPage/Line_With_Restaurants";
import Footer from "../Footer/Footer";
import Konditoriya from "../MenuPage/Block_For_Canditoriya"
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {syncSelectedBranch} from "./ReducerRedux";
import {useNavigate} from "react-router-dom";

const MenuPage = ({ numberRestoran }) => {
//added redux logics
	const dispatch = useDispatch()
	const syncedClickBlockTwo = useSelector(state => state.clickBlockTwo)
	const syncedClickBlockThree = useSelector(state => state.clickBlockThree)
	const syncedClickBlockOne = useSelector(state => state.clickBlockOne)
	const [counter, setCounter] = useState(0);
	const navigate = useNavigate()
	//changed set initial state from dispatch
	const [clickBlockTwo, setClickBlockTwo] = useState(syncedClickBlockTwo);
	const [clickBlockThree, setClickBlockThree] = useState(syncedClickBlockThree);
	const [clickBlockOne, setClickBlockOne] = useState(syncedClickBlockOne);



	useEffect(() => {
		dispatch(syncSelectedBranch({clickBlockTwo, clickBlockThree, clickBlockOne}))
		if (clickBlockOne){
			navigate('/izBrasserie')
			dispatch(syncSelectedBranch({clickBlockOne: true, clickBlockTwo: false, clickBlockThree: false}))
		}
		if (clickBlockTwo){
			navigate('/Sibumii')
			dispatch(syncSelectedBranch({clickBlockOne: false, clickBlockTwo: true, clickBlockThree: false}))
		}
		if (clickBlockThree){
			navigate('/Konditory')
			dispatch(syncSelectedBranch({clickBlockOne: false, clickBlockTwo: false, clickBlockThree: true}))
		}
	}, [clickBlockOne, clickBlockTwo, clickBlockThree])



	const fetchBrasserie = async () => {
		try {
			const response = await axios("/api/test/1")
			return response.data;
		} catch (error) {
			console.log(error)
		}
	}

	const fetchSibumi = async () => {
		try {
			const response = await axios("/api/test/2")
			return response.data;
		} catch (error) {
			console.log(error)
		}
	}

	const fetchConditory = async () => {
		try {
			const response = await axios("/api/test/3")
			return response.data;
		} catch (error) {
			console.log(error)
		}
	}


	const [state, setState] = useState(Dimensions.get('window').width);
	window.addEventListener('resize', update);
	function update() {
		setState(window.innerWidth);
	}


	if (numberRestoran != null) {
		switch (numberRestoran) {
			case 1: {
				changePosition("block_logo_one"); break;
			}
			case 2: {
				changePosition("block_logo_two"); break;
			}
			case 3: {
				changePosition("block_logo_three");
				break;
			}
		}
	}

	function changePosition(nameElement) {
		// eslint-disable-next-line default-case
		if (numberRestoran === null || counter < 1) {
			setCounter(counter + 1);
			switch (nameElement) {
				case "block_logo_one":
					if (clickBlockOne === false) {
						setClickBlockOne(!clickBlockOne)
						setClickBlockTwo(false)
						setClickBlockThree(false)
						// console.log(clickBlockOne + " one")
					}
					break;
				case "block_logo_two": {
					if (clickBlockTwo === false) {
						setClickBlockTwo(!clickBlockTwo)
						setClickBlockOne(false)
						setClickBlockThree(false)
						// console.log(clickBlockTwo + " two")
					}
					break;
				}
				case "block_logo_three": {
					if (clickBlockThree === false) {
						setClickBlockThree(!clickBlockThree)
						setClickBlockTwo(false)
						setClickBlockOne(false)
						// console.log(clickBlockThree + " three")
					}
					break;
				}
			}
		}
	}

	const listRest = [
		{ id: 1, imageOne: logo_Iz_Brasserie, imageTwo: logo_Iz_Brasserie_black, class_name: "block_logo_one" },
		{ id: 2, imageOne: logo_Sibumi, imageTwo: logo_Sibumi_black, class_name: "block_logo_two" },
		{ id: 3, imageOne: logo_Konditoriya, imageTwo: logo_Konditoriya_black, class_name: "block_logo_three" }
	]

	if (state <= 550) {
		return (
			<div className="menu_main_element">
				<Header bold_block={2} style_element="main_style" />
				<div className="menu_inside_block">
					<PageType title="ВЫ НАХОДИТЕСЬ В МЕНЮ" />
					<div className="block_with_logotypes">
						<div className="fake_block" />
						<div className="inside_block_logo">
							<motion.div className="second_inside_block_for_logo" animate={{ y: 0, opacity: 1 }} initial={{ y: 100, opacity: 0 }} transition={{ duration: 1 }}>
								<LineWithRestaurant number={numberRestoran} page_type="menu" list={listRest} setClickOne={setClickBlockOne} setClickTwo={setClickBlockTwo} setClickThree={setClickBlockThree} />
							</motion.div>
						</div>
					</div>


					<div className="block_with_mainContent">
						<div className="fake_block_content" />
						<div className="inside_block_content">
							<div className="second_inside_block_for_elemContent">
								<div className="main_content_block">
									{/* eslint-disable-next-line react/jsx-pascal-case */}
									<IzBrasserie_block stateBlock={clickBlockOne} handleBrasserie={fetchBrasserie} cardUrl={'/menu/'} />
									{/* eslint-disable-next-line react/jsx-pascal-case */}
									<Sibumi_block stateBlock={clickBlockTwo} handleSibumi={fetchSibumi} cardUrl={'/menu/'}/>
									<Konditoriya stateBlock={clickBlockThree} handleConditory={fetchConditory} cardUrl={'/menu/'}/>
								</div>
							</div>
						</div>
					</div>
					<div className="footer">
						<Footer />
					</div>

				</div>
			</div>
		);
	}

	else {

		return (
			<div className="menu_main_element">
				<Header bold_block={2} style_element="main_style" />
				<div className="menu_inside_block">
					<PageType title="ВЫ НАХОДИТЕСЬ В МЕНЮ" />
					<div className="block_with_logotypes">
						<div className="fake_block" />
						<div className="inside_block_logo">
							<motion.div className="second_inside_block_for_logo" animate={{ y: 0, opacity: 1 }} initial={{ y: 100, opacity: 0 }} transition={{ duration: 1, delay: 0.3 }}>
								<motion.div className="block_logo_one" onClick={() => { numberRestoran = null; changePosition("block_logo_one") }}>
									<img src={clickBlockOne ? logo_Iz_Brasserie_black : logo_Iz_Brasserie}
										 alt="logotype" className="logotype_in_block" /></motion.div>
								<motion.div className="block_logo_two" onClick={() => { numberRestoran = null; changePosition("block_logo_two") }}>
									<img src={clickBlockTwo ? logo_Sibumi_black : logo_Sibumi} alt="logotype"
										 className="logotype_in_block" /></motion.div>
								<motion.div className="block_logo_three"
											onClick={() => { numberRestoran = null; changePosition("block_logo_three") }}><img
									src={clickBlockThree ? logo_Konditoriya_black : logo_Konditoriya} alt="logotype"
									className="logotype_in_block" /></motion.div>
							</motion.div>
						</div>
					</div>


					<div className="block_with_mainContent">
						<div className="fake_block_content" />
						<div className="inside_block_content">
							<div className="second_inside_block_for_elemContent">
								<div className="main_content_block">
									{/* eslint-disable-next-line react/jsx-pascal-case */}
									<IzBrasserie_block stateBlock={clickBlockOne} handleBrasserie={fetchBrasserie} cardUrl={'/menu/'}  />
									{/* eslint-disable-next-line react/jsx-pascal-case */}
									<Sibumi_block stateBlock={clickBlockTwo} handleSibumi={fetchSibumi} cardUrl={'/menu/'}  />
									<Konditoriya stateBlock={clickBlockThree} handleConditory={fetchConditory} cardUrl={'/menu/'}  />
								</div>
							</div>
						</div>
					</div>
					<div className="footer">
						<Footer />
					</div>

				</div>
			</div>
		);
	}
};

export default MenuPage;

import React, { useEffect, useState } from 'react';
import img_on_basket from '../picture_izBrazzerie/img3.webp'
import img_on_basket_png from '../picture_izBrazzerie/img3.png'
import Header from "../HeaderBlock/Header";
import PageType from "../PageType/PageType";
import OrderCard from "../BasketPage/OrderCard";
import { motion } from "framer-motion";
import ButtonsOrder from "../BasketPage/ButtonsOrder";
import DeliveryType from "../BasketPage/DeliveryType";
import ContactData from "../BasketPage/ContactData";
import TimeOrder from "../BasketPage/timeOrder";
import PayOrder from "../BasketPage/PayOrder";
import "react-datepicker/dist/react-datepicker.css";
import "../BasketPage/css/Basket.css"
import "../BasketPage/css/Forms.css"
import {Provider, useDispatch, useSelector} from "react-redux";
import store, { persister } from "./PersistReduxConfiguration";
import { PersistGate } from "redux-persist/integration/react";
import axios from 'axios';
import {syncOrderData} from "./ReducerRedux";

const BasketPage = () => {
	const [activeWindow, setActiveWindow] = useState(false);

	const element = useSelector((state) => state.index);
	const allPrice = useSelector((state) => state.allSumm)

	//added (sync w redux store)
	const dispatch = useDispatch()
	const syncedDeliveryAdress = useSelector((state) => state.deliveryAdress)
	const syncedEmail  = useSelector((state) => state.email)
	const syncedPhone  = useSelector((state) => state.phone)
	const syncedComment  = useSelector((state) => state.comment)
	const syncedName  = useSelector((state) => state.name)
	const syncedSurname  = useSelector((state) => state.surname)
	const syncedDeliveryType  = useSelector((state) => state.deliveryType)
	const syncedStateTime  = useSelector((state) => state.stateTime)
	const syncedTimeContent  = useSelector((state) => state.timeContent)
	const syncedStatePay  = useSelector((state) => state.statePay)
	const syncedStateBox  = useSelector((state) => state.stateBox)
	const syncedStateSpam  = useSelector((state) => state.stateSpam)


	const [deliveryAdress, setDeliveryAdress] = useState(syncedDeliveryAdress)
	const [email, setEmail] = useState(syncedEmail);
	const [phone, setPhone] = useState(syncedPhone);
	const [comment, setComment] = useState(syncedComment);
	const [name, setName] = useState(syncedName);
	const [surname, setSurname] = useState(syncedSurname);
	const [deliveryType, setDeliveryType] = useState(syncedDeliveryType);
	const [stateTime, setStateTime] = useState(syncedStateTime);
	const [timeContent, setTimeContent] = useState(syncedTimeContent);
	const [statePay, setStatePay] = useState(syncedStatePay);
	const [stateBox, setStateBox] = useState(syncedStateBox);
	const [stateSpam, setStateSpam] = useState(syncedStateSpam);

	useEffect(() => {
		dispatch(syncOrderData({deliveryAdress, email, phone, comment, name, surname, deliveryType, stateTime, timeContent, statePay, stateBox, stateSpam}))
	}, [deliveryAdress, email, phone, comment, name, surname, deliveryType, stateTime, timeContent, statePay, stateBox, stateSpam])

	const setDelivery = (delivery) => {
		setDeliveryType(delivery)
	}

	let mp = element.map(order =>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persister}>
				<OrderCard masline={element[element.length - 1].id} order={order} key={order.id} />
			</PersistGate>
		</Provider>
	);

	let mpFinish = element.map(order =>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persister}>
				<OrderCard masline={element.length} order={order} key={order.id} type={"finishWindow"} />
			</PersistGate>
		</Provider>
	);

	const [activeLastWindow, setActiveLastWindow] = useState(false);

	const submitEvent = () => {
		console.log('Кнопка работает')
		setActiveLastWindow('true')
		axios.post('/api/delivery', {
			emailSubscription: stateSpam,
			data: element,
			metadata: {
				orderServiceType: deliveryType,
				payment: statePay,
				phone: phone,
				customer: {
					name: name,
					surname: surname,
					email: email
				},
				completeBefore: stateTime == 'time2' ? timeContent : null,
				comment: stateBox == true ? comment + '// Без звонка оператора.' : comment,
				deliveryPoint: deliveryType == 'DeliveryByCourier' ? {
					address: {
						...deliveryAdress,
						street: {
							name: deliveryAdress.street,
							city: 'Владивосток'
						}
					}
				} : null
			}

		}).then(response => response.data)
			.then(data => window.location.href = data.url)
	}
	const [validForm, setValidForm] = useState(false);
	const [phoneEr, setPhoneEr] = useState(false);
	const [nameEr, setNameEr] = useState(false);
	const [addrEr, setAddrEr] = useState(false);
	const [konfEr, setKonfEr] = useState(true);
	const [surnameEr, setSurnameEr] = useState(false);
	const [streetEr, setStreetEr] = useState(false);
	const [numberEr, setNumberEr] = useState(false);
	const [timeEr, setTimeEr] = useState(true);
	const [emailEr, setEmailEr] = useState(false);

	useEffect(() => {
		if (phoneEr === true && nameEr === true && surnameEr === true && konfEr === true && timeEr === true) {
			var commonErr = true
		}
		else {
			setValidForm(false);
		}
		if (deliveryType == 'DeliveryByCourier')
			if (commonErr === true && streetEr === true && numberEr === true) {
				setValidForm(true);
			} else
				setValidForm(false);
		else if (deliveryType == 'DeliveryByClient')
			if (commonErr === true) {
				setValidForm(true)
			} else
				setValidForm(false);
		else
			setValidForm(false)

	}, [phoneEr, nameEr, surnameEr, konfEr, streetEr, numberEr, deliveryType, timeEr])

	return (
		<div className="Basket">

			<Header style_element="main_style" />



			<div className="mainFieldServiceBasket">
				<PageType title="ВАША КОРЗИНА" />



				{!activeWindow &&
					<div className="insideWindow">
						<div className={mp.length === 0 ? "header_order_active" : "header_order"}>
							<div className="fake_elem_basket" />
							<div className="titles_basket">
								<h1 className="title_header">ВЫ ВЫБРАЛИ:</h1>
								<p className="title2_header">Осталось проверить заказ</p>
							</div>
						</div>

						<div className={mp.length === 0 ? "positions_order_titles_active" : "positions_order_titles"}>
							<div className="fake_element" />
							<div className="order_inside_block">
								<div className="titles_points_order">
									<div className="photo_point" />
									<div className="name_point">Название</div>
									<div className="count_point">Кол-во</div>
									<div className="prise_point">Цена</div>
									<div className="delete_point" />
								</div>
							</div>
						</div>

						<div className={mp.length === 0 ? "order_elements_container_active" : "order_elements_container"} >
							<div className={mp.length === 0 ? "empty_basket_active" : "empty_basket"}>
								В данное время корзина пуста!
							</div>
							{mp}
						</div>

						<motion.div className="line_with_ItogPrise">
							<div className="text_in_border"><div className="prise_line_result"><div className="text_result">СТОИМОСТЬ ЗАКАЗА: <span className="prise_text"> {allPrice} Р</span></div></div></div>
							<div onClick={() => { window.scrollTo({ top: -10000, behavior: "smooth" }); setActiveWindow(true); }} className="button_result"><motion.button whileHover={{ backgroundColor: "white", color: "#cebda0" }} transition={{ duration: 0.7 }} className="button_order_result" disabled={element.length === 0}>ОФОРМИТЬ ЗАКАЗ</motion.button></div>
						</motion.div>
					</div>
				}






				{/*{!activeWindow &&*/}
				{/*	<div className= "insideWindow">*/}
				{/*		<div className= "header_order">*/}
				{/*			<div className="fake_elem_basket" />*/}
				{/*			<div className="titles_basket">*/}
				{/*				<h1 className="title_header">ВЫ ВЫБРАЛИ:</h1>*/}
				{/*				<p className="title2_header">Осталось проверить заказ</p>*/}
				{/*			</div>*/}
				{/*		</div>*/}

				{/*		<div className= "positions_order_titles">*/}
				{/*			<div className="fake_element" />*/}
				{/*			<div className="order_inside_block">*/}
				{/*				<div className="titles_points_order">*/}
				{/*					<div className="photo_point" />*/}
				{/*					<div className="name_point">Название</div>*/}
				{/*					<div className="count_point">Кол-во</div>*/}
				{/*					<div className="prise_point">Цена</div>*/}
				{/*					<div className="delete_point" />*/}
				{/*				</div>*/}
				{/*			</div>*/}
				{/*		</div>*/}

				{/*		/!*<div className={ mp.length === 0 ? "order_elements_container_active" : "order_elements_container"} >*!/*/}
				{/*		/!*	<div className={mp.length === 0 ? "empty_basket_active" : "empty_basket"}>*!/*/}
				{/*		/!*		В данное время корзина пуста!*!/*/}
				{/*		/!*	</div>*!/*/}
				{/*		/!*	{mp}*!/*/}
				{/*		/!*</div>*!/*/}
				{/*		<motion.div className="line_with_ItogPrise">*/}
				{/*			<div className="text_in_border"><div className="prise_line_result"><div className="text_result">СТОИМОСТЬ ЗАКАЗА: <span className="prise_text"> {allPrice} Р</span></div></div></div>*/}
				{/*			<div onClick={() => { window.scrollTo({ top: -10000, behavior: "smooth" }); setActiveWindow(true); }} className="button_result"><motion.button whileHover={{ backgroundColor: "white", color: "rgb(206, 189, 160)" }} transition={{ duration: 0.7 }} className="button_order_result" disabled={element.length === 0}>ОФОРМИТЬ ЗАКАЗ</motion.button></div>*/}
				{/*		</motion.div>*/}
				{/*	</div>*/}
				{/*}*/}




				{/*окно с формами*/}
				{activeWindow &&
					<div className={(activeWindow ? "pool_with_forms active" : "pool_with_forms")}>
						<div className="main_form_inside_block">
							<div className="form_one">
								<form className="main_form_block_one">
									<div className="title_form_one">
										<div className="first_title"><span className="number_title_first_title">01/</span>ДАННЫЕ ДОСТАВКИ:</div>
										<div className="second_title"> У нас есть пара вопросов:</div>
									</div>

									<DeliveryType select={setDelivery} delivery={deliveryType} />
									<TimeOrder time={stateTime} callback={setStateTime} content={timeContent} contentCallback={setTimeContent} timeEr={timeEr} setTimeEr={setTimeEr} />
									<PayOrder paymentType={statePay} callback={setStatePay} />

									<div className="comments">
										<div className="title_comment">Хотите оставить комментарий?</div>
										<div className="input_one">
											<input className="text_input_one"
												value={comment}
												onChange={(e) => setComment(e.target.value)}
												type="text"
												placeholder="ХОЧУ КАК В ЯПОНИИ" />
										</div>
									</div>

									<ButtonsOrder type="otherQuestions" erKonf={setKonfEr}
										stateBox={stateBox}
										stateSpam={stateSpam}
										setStateBox={setStateBox}
										setStateSpam={setStateSpam} />
								</form>
							</div>


							<div className="form_two">
								<form className="main_form_block_one">
									<div className="title_form_two">
										<div className="first_title"><span className="number_title_first_title">02/</span>КОНТАКТНЫЕ ДАННЫЕ:</div>
										<div className="second_title"> Уточните, куда привезти заказ:</div>
									</div>

									<ContactData
										delivery={deliveryType}
										deliveryAdress={deliveryAdress}
										phone={phone}
										setPhone={setPhone}
										name={name}
										setName={setName}
										surname={surname}
										setSurname={setSurname}
										email={email}
										setEmail={setEmail}
										setAdress={setDeliveryAdress}
										phoneEr={setPhoneEr}
										emailEr={setEmailEr}
										nameEr={setNameEr}
										surnameEr={setSurnameEr}
										addrEr={setAddrEr}
										streetEr={setStreetEr}
										numberEr={setNumberEr} />
								</form>
							</div>
						</div>

					</div>
				}
				{activeWindow && <div className="formLine">

					<div onClick={() => setActiveWindow(false)} className="text_in_border_result">
						<motion.button whileHover={{ opacity: 0.5 }} className="go_back_button">ЧТО Я ВЫБРАЛ?</motion.button>
					</div>


					<div className="button_result"><motion.button disabled={validForm === false} onClick={submitEvent} whileHover={{ backgroundColor: "white", color: "#cebda0" }} transition={{ duration: 0.7 }} className="button_order_result">ОФОРМИТЬ ЗАКАЗ</motion.button></div>
				</div>}

			</div>


		</div >

	);
}

export default BasketPage;

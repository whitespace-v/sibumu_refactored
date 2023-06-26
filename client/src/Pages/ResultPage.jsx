import React, { useState, useEffect } from 'react';
import PageType from "../PageType/PageType";
import Header from "../HeaderBlock/Header"
import "../ResultPage/ResultPage.css"
import OrderCard from "../ResultPage/OrderCard";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'

const ResultWindow = () => {
	let { id } = useParams();
	let navigate = useNavigate();
	const [number, setNumber] = useState('')
	const [price, setPrice] = useState(0)
	const [items, setItems] = useState([]);


	const setValues = (data) => {
		setItems(data.items)
		setPrice(data.sum)

		let len = 7;
		let id = data.id.toString()
		setNumber('0'.repeat(len - id.length) + id)
	}

	useEffect(() => {
		axios(`/api/delivery/getOrder/${id}`).then(data => setValues(data.data)).catch(() => navigate('/404'))
	}, [])


	return (

		<div className="result_window">
			<Header style_element="main_style" />
			<PageType title="ЗАКАЗ ОФОРМЛЕН" />
			<div className="finalWindow_pool">

				<div className="header_order">
					<div className="fake_elem_basket" />
					<div className="titles_basket_resultWindow">
						<h1 className="title_header_resulWindow">ВАШ ЗАКАЗ <span className="number_order">#{number}</span> ПРИНЯТ:</h1>
						<p className="title2_header_result_form">Мы отправили письмо с деталями вашего заказа на почту. Оператор свяжется с вами в течение 15 минут</p>
						<p className="title2_header_result_form">Состав заказа:</p>
					</div>
				</div>

				<div className="order_points_list">
					{items.map(order =>
						<OrderCard
							masline={items.length}
							order={order}
							key={order.id}
							type={"finishWindow"} />
					)}
				</div>

				<div className="prise_finalWindow">
					<div className="order_card_result">
						<div className="fake_element" />
						<div className="order_inside_block">
							<div className="main_order_block_result_window">
								<div className="title_order_resultWindow">
									<div className="text_order_result">
										<div className="text_position_order"> СТОИМОСТЬ ЗАКАЗА: {price} Р</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="line_with_ResultForm" />
		</div >
	);
};

export default ResultWindow;

import React, { useEffect } from 'react';

const ButtonsOrder = ({select, delivery}) => {
	function setRadio(event) {
			return select(event.target.value)
	}

	return (
		<div className="first_question_pool">
			<div className="question_one"> Как вы хотите забрать заказ?</div>
			<div className="answers_question_one">
				<div className="answers_one">
					<label className="elem_form" >
						<input type="radio" value="DeliveryByClient" checked={delivery == "DeliveryByClient" ? true : false} onChange={setRadio} className="radio" />
						<span className="fake" />
						САМОВЫВОЗ
					</label>
				</div>
				<div className="answer_two">
					<label className="elem_form" >
						<input className="radio" type="radio" value="DeliveryByCourier" checked={delivery == "DeliveryByCourier" ? true : false} onChange={setRadio} />
						<span className="fake" />
						ДОСТАВКА
					</label>
				</div>
			</div>
		</div>
	);
}
export default ButtonsOrder;

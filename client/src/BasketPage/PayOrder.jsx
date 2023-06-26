import React, { useEffect } from 'react';

const PayOrder = ({ paymentType, callback }) => {
	function setRadioPay(event) {
		return callback(event.target.value)
	}

	return (
		<div className="third_question_pool">
			<div className="question_three">Выберите способ оплаты:</div>
			<div className="radio_two">
				{/* {<div className="radio_two_element">
					<label className="elem_form" >
						<input type="radio" value="SITE" className="radio" checked={paymentType == "SITE" ? true : false} onChange={setRadioPay} />
						<span className="fake" />
						ОПЛАТА НА САЙТЕ
					</label>
				</div>} */}

				<div className="radio_two_element">
					<label className="elem_form" >
						<input type="radio" className="radio" value={"CASH"} checked={paymentType == "CASH" ? true : false} onChange={setRadioPay} />
						<span className="fake" />
						НАЛИЧНЫМИ КУРЬЕРУ
					</label>
				</div>

				<div className="radio_two_element">
					<label className="elem_form" >
						<input type="radio" value={"BNCUR"} className="radio" checked={paymentType == "BNCUR" ? true : false} onChange={setRadioPay} />
						<span className="fake" />
						БЕЗНАЛИЧНЫЙ РАСЧЕТ КУРЬЕРУ
					</label>
				</div>
			</div>
		</div>
	);
}

export default PayOrder;

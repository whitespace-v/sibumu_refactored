import React, { forwardRef } from 'react';
import { useState } from "react";
import clockIcon from "../picture_izBrazzerie/clock_icon.png";
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';
import { setHours, setMinutes, addMonths } from 'date-fns';




const TimeOrder = ({ time, callback, contentCallback, content, timeEr, setTimeEr }) => {
	function setRadioTime(event) {
		return callback(event.target.value)
	}

	function checkTime(event) {
		if (Date.parse(event) - Date.now() > 0) {
			setValidDate(true);
			setTimeEr(true);

			return contentCallback(event)
		} else {
			setValidDate(false)
			setTimeEr(false);
		}
	}

	const filterPassedTime = (time) => {
		const currentDate = new Date();
		const selectedDate = new Date(time);

		return currentDate.getTime() < selectedDate.getTime();
	};

	const [validDate, setValidDate] = useState(true);
	const [switchI, setSwitchI] = useState(false);
	const [timeError, setTimeError] = useState("Введите корректную дату!")

	return (
		<div className="second_question_pool">
			<div className="question_two"> К какому времени вы хотите получить заказ?</div>
			<div className="answersTwo">
				<div className="radio_one">
					<div className="elem1" onClick={() => setSwitchI(false)}>
						<label className="elem_form" >
							<input type="radio" value="time1" className="radio" checked={time == 'time1' ? true : false} onChange={setRadioTime} />
							<span className="fake" />
							БЛИЖАЙШЕЕ
						</label>
					</div>

					<div className="elem2" onClick={() => setSwitchI(true)}>
						<label className="elem_form">
							<input className="radio" value="time2" type="radio" checked={time === "time2" ? true : false} onChange={setRadioTime} />
							<span className="fake" />
							К ОПРЕДЕЛЕННОМУ
						</label>
					</div>
				</div>
				<div className='clock_block'>
					<img src={clockIcon} alt="Clocks" className='clock' />
					<p>Время работы доставки: с 11:00-20:00</p>
				</div>
				<div className={switchI === true ? "input_one" : "input_one_notActive"}>
					<DatePicker
						selected={content}
						onChange={(date) => checkTime(date)}
						showTimeSelect
						dateFormat="EEEEEE, d MMMM, hh:mm yyyy"
						locale={ru}
						timeFormat="p"
						excludeTimes={[
							setHours(setMinutes(new Date(), 0), 20),
							setHours(setMinutes(new Date(), 30), 20),
							setHours(setMinutes(new Date(), 0), 21),
							setHours(setMinutes(new Date(), 30), 21),
							setHours(setMinutes(new Date(), 0), 22),
							setHours(setMinutes(new Date(), 30), 22),
							setHours(setMinutes(new Date(), 0), 23),
							setHours(setMinutes(new Date(), 30), 23),
							setHours(setMinutes(new Date(), 0), 0),
							setHours(setMinutes(new Date(), 30), 0),
							setHours(setMinutes(new Date(), 0), 1),
							setHours(setMinutes(new Date(), 30), 1),
							setHours(setMinutes(new Date(), 0), 2),
							setHours(setMinutes(new Date(), 30), 2),
							setHours(setMinutes(new Date(), 0), 3),
							setHours(setMinutes(new Date(), 30), 3),
							setHours(setMinutes(new Date(), 0), 4),
							setHours(setMinutes(new Date(), 30), 4),
							setHours(setMinutes(new Date(), 0), 5),
							setHours(setMinutes(new Date(), 30), 5),
							setHours(setMinutes(new Date(), 0), 6),
							setHours(setMinutes(new Date(), 30), 6),
							setHours(setMinutes(new Date(), 0), 7),
							setHours(setMinutes(new Date(), 30), 7),
							setHours(setMinutes(new Date(), 0), 8),
							setHours(setMinutes(new Date(), 30), 8),
							setHours(setMinutes(new Date(), 0), 9),
							setHours(setMinutes(new Date(), 30), 9),
							setHours(setMinutes(new Date(), 0), 10),
							setHours(setMinutes(new Date(), 30), 10),
							setHours(setMinutes(new Date(), 0), 11),
						]}
						filterTime={filterPassedTime}
						timeCaption="Время"
						minDate={new Date()}
						maxDate={addMonths(new Date(), 1)}
						placeholderText="Нажмите, чтобы выбрать дату"
					/>
				</div>
				{(!validDate) && (switchI) && <div className={"error_contact_time"}> {timeError}</div>}
			</div>
		</div>
	);
}

export default TimeOrder;

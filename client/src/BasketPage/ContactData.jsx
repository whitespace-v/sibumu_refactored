import React, { useEffect } from 'react';
import { useState } from "react";
import InputMask from "react-input-mask";
import alarmIcon from '../picture_izBrazzerie/alarm.png';
import {useDispatch, useSelector} from "react-redux";

const ContactData = ({ delivery, deliveryAdress, setAdress, name, setName, surname, setSurname, phone, setPhone, email, setEmail, nameEr, emailEr, phoneEr, surnameEr, addrEr, streetEr, numberEr }) => {

	const blurChecked = (e) => {
		switch (e.target.name) {
			case "phone":
				setPhoneDirty(true);
				break;

			case "name":
				setNameDirty(true);
				break;

			case "surname":
				setSurnameDirty(true);
				break;

			case "address":
				serAdrDirty(true);
				break;

			case "street":
				setStreetDirty(true);
				break;

			case "number":
				setNumberDirty(true);
				break;
		}
	}

	const handlerEmail = (e) => {
		setEmail(e.target.value)

		const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		if (!re.test(String(e.target.value).toLowerCase())) {
			setEmailError("Некорректная почта!");
			emailEr(false);
		} else {
			setEmailError('');
			emailEr(true);
		}
	}

	const handlerPhone = (e) => {
		setPhoneElem(e.target.value);
		if ((e.target.value === '') || (e.target.value).includes("_")) {
			setPhoneError("Вы не ввели номер!");
			phoneEr(false);
		} else {
			setPhoneError('');
			setPhone(e.target.value);
			phoneEr(true);
		}
	}

	const handlerName = (e) => {
		setName(e.target.value)
		const re = /[а-я][А-Я]/i;
		if ((e.target.value < 1) || (!re.test(String(e.target.value).toLowerCase()))) {
			setNameError("Некорректное имя!");
			nameEr(false);
		} else {
			setNameError('');
			nameEr(true);
		}
	}

	const handlerSurname = (e) => {
		setSurname(e.target.value)
		const re = /[а-я][А-Я]/i;
		if ((e.target.value < 1) || (!re.test(String(e.target.value).toLowerCase()))) {
			setSurnameError("Некорректная фамилия!");
			surnameEr(false);
		} else {
			setSurnameError('');
			surnameEr(true);
		}
	}

	const handlerAddr = (e) => {
		setAdr(e.target.value)
		const re = /^[а-яА-Я0-9,-\.\s]+$/i;
		if (!re.test(String(e.target.value).toLowerCase())) {
			setAdrError("Некорректный адрес!");
			addrEr(false);
		} else {
			setAdrError('');
			addrEr(true);
		}
	}

	const handlerStreet = (e) => {
		setAdress({ ...deliveryAdress, street: e.target.value })

		const re = /^[а-яА-Я0-9,-\.\s]+$/i;
		if (!re.test(String(e.target.value).toLowerCase())) {
			setStreetError("Улица указана некорректно!");
			streetEr(false);
		} else {
			setStreetError('');
			streetEr(true);
		}
	}

	const handlerNumber = (e) => {
		setAdress({ ...deliveryAdress, house: e.target.value })
		const re = /^[а-яА-Я0-9,-\.\s]+$/i;
		if (!re.test(String(e.target.value).toLowerCase())) {
			setNumberError("Номер дома указан некорректно!");
			numberEr(false);
		} else {
			setNumberError('');
			numberEr(true);
		}
	}



	const [adr, setAdr] = useState('');
	const [street, setStreet] = useState('');
	const [number, setNumber] = useState('');
	const [phoneElem, setPhoneElem] = useState('')

	const [nameDirty, setNameDirty] = useState(false);
	const [surnameDirty, setSurnameDirty] = useState(false);
	const [adrDirty, serAdrDirty] = useState(false);
	const [phoneDirty, setPhoneDirty] = useState(false);

	const [streetDirty, setStreetDirty] = useState(false);
	const [numberDirty, setNumberDirty] = useState(false);

	const [nameError, setNameError] = useState('Это обязательное поле для заполнения, пожалуйста, заполните это поле');
	const [surnameError, setSurnameError] = useState('Это обязательное поле для заполнения, пожалуйста, заполните это поле');
	const [streetError, setStreetError] = useState('Это обязательное поле для заполнения, пожалуйста, заполните это поле');
	const [numberError, setNumberError] = useState('Это обязательное поле для заполнения, пожалуйста, заполните это поле');
	const [emailError, setEmailError] = useState('Это обязательное поле для заполнения, пожалуйста, заполните это поле');
	const [phoneError, setPhoneError] = useState('Это обязательное поле для заполнения, пожалуйста, заполните это поле');
	const [adrError, setAdrError] = useState('Это обязательное поле для заполнения, пожалуйста, заполните это поле');


	return (
		<div className="formsForOrder">
			<div className="input_for_contact">
				<label className="label_contact">
					Ваше имя
				</label>
				<div className="input_two">
					<input onChange={e => handlerName(e)} onBlur={e => blurChecked(e)} value={name} className="text_input_one" name="name" type="text" placeholder="ВВЕСТИ СЮДА" />
				</div>
				{
					(nameDirty && nameError) &&
					<div className='modal_input_message'>
						<div className='modal_input_content'>
							<img className='input_img' alt='input_img' src={alarmIcon}/>
							{nameError}
						</div>
					</div>
				}
			</div>

			<div className="input_for_contact">
				<label className="label_contact">
					Ваша фамилия
				</label>
				<div className="input_two">
					<input onChange={e => handlerSurname(e)} value={surname} onBlur={e => blurChecked(e)} className="text_input_one" name="surname" type="text" placeholder="ВВЕСТИ СЮДА" />
				</div>
				{
					(surnameDirty && surnameError) &&
					<div className='modal_input_message'>
						<div className='modal_input_content'>
							<img className='input_img' alt='input_img' src={alarmIcon}/>
							{surnameError}
						</div>
					</div>
				}
			</div>


			<div className="input_for_contact">
				<label className="label_contact">
					Номер телефона
				</label>
				<div className="input_two">
					<InputMask className="text_input_one"
							   onChange={e => handlerPhone(e)}
							   onBlur={e => blurChecked(e)}
							   placeholder={"+7 (999) 99 99 999"}
							   name="phone"
							   mask="+7(999) 99 99 999"
					/>
				</div>
				{
					(phoneDirty === true && phoneError) &&
					<div className='modal_input_message'>
						<div className='modal_input_content'>
							<img className='input_img' alt='input_img' src={alarmIcon}/>
							{phoneError}
						</div>
					</div>
				}
			</div>

			<div className="input_for_contact">
				<label className="label_contact">
					Ваша почта
				</label>
				<div className="input_two">
					<input onChange={e => handlerEmail(e)} value={email} onBlur={e => blurChecked(e)} name="email" className="text_input_one" type="text" placeholder="MAIL@MAIL.COM" />
				</div>
			</div>

			{delivery == 'DeliveryByCourier' &&
				<div>
					<div className="input_for_contact">
						<label className="label_contact">
							Улица
						</label>
						<div className="input_two">
							<input className="text_input_one"
								   onChange={e => handlerStreet(e)}
								   onBlur={e => blurChecked(e)}
								   name="street"
								   type="text"
								   value={deliveryAdress.street}
								   placeholder="ул. Пограничная" />
						</div>
						{
							(streetDirty && streetError) &&
							<div className='modal_input_message'>
								<div className='modal_input_content'>
									<img className='input_img' alt='input_img' src={alarmIcon}/>
									{streetError}
								</div>
							</div>
						}
					</div>
					<div className="input_for_contact">
						<label className="label_contact">
							Дом
						</label>
						<div className="input_two">
							<input className="text_input_one"
								   onChange={e => handlerNumber(e)}
								   onBlur={e => blurChecked(e)}
								   name="number"
								   type="text"
								   value={deliveryAdress.house}
								   placeholder="14" />
						</div>
						{(numberDirty && numberError) &&
							<div className='modal_input_message'>
								<div className='modal_input_content'>
									<img className='input_img' alt='input_img' src={alarmIcon}/>
									{numberError}
								</div>
							</div>
						}
					</div>
					<div className="input_for_contact">
						<label className="label_contact">
							Подъезд
						</label>
						<div className="input_two">
							<input className="text_input_one"
								   onChange={e => setAdress({ ...deliveryAdress, entrance: e.target.value })}
								   onBlur={e => blurChecked(e)}
								   name="address"
								   type="number"
								   value={deliveryAdress.entrance}
								   placeholder="ВВЕДИТЕ ПОДЪЕЗД" />
						</div>
					</div>
					<div className="input_for_contact">
						<label className="label_contact">
							Этаж
						</label>
						<div className="input_two">
							<input className="text_input_one"
								   onChange={e => setAdress({ ...deliveryAdress, floor: e.target.value })}
								   onBlur={e => blurChecked(e)}
								   name="address"
								   type="number"
								   value={deliveryAdress.floor}
								   placeholder="ВВЕДИТЕ ЭТАЖ" />
						</div>
					</div>
					<div className="input_for_contact">
						<label className="label_contact">
							Квартира
						</label>
						<div className="input_two">
							<input className="text_input_one"
								   onChange={e => setAdress({ ...deliveryAdress, flat: e.target.value })}
								   onBlur={e => blurChecked(e)}
								   name="address"
								   type="number"
								   value={deliveryAdress.doorphone}
								   placeholder="ВВЕДИТЕ НОМЕР КВАРТИРЫ" />
						</div>
					</div>
				</div>
			}
		</div>
	)
}

export default ContactData;

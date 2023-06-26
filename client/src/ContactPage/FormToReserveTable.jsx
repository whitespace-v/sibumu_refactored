import React, {useState, useEffect} from 'react';
import {motion} from "framer-motion";
import InputMask from 'react-input-mask'
import axios from 'axios';

const FormToReserveTable = ({active, setActive, place}) => {
    function buttonActive(){
        let form = document.getElementsByClassName(formInputs)[0];
        let title = document.getElementsByClassName(titleForm)[0];
        let titleFinal = document.getElementsByClassName(finalTitle)[0];
        let button = document.getElementsByClassName(buttonStyle)[0];
        form.style.display = "none";
        title.style.display = "none";
        button.style.display = "none";
        titleFinal.style.display = "block";

        setTimeout(function (){
            setActive(false)
        }, 5000);
    
        let dataToSend = {
            name,
            surname,
            email,
            phone,
            time,
            place
        };

        // Отправка запроса на сервер
        axios.post('/api/booking', {
            dataToSend
        }).then(data => console.log(data))
    }

    const showWindow = {
        open:{
            top: 0,
            opacity: 1,
        },
        close:{
            top: "-100%",
            opacity: 0,
        }
    }

    const showElems = {
        open:{
            y: 0,
            opacity: 1,
        },
        close:{
            y: 100,
            opacity: 0,
        }
    }

    const showButton = {
        open:{
            y: 0,
            opacity: 1,
        },
        close:{
            y: "100%",
            opacity: 0,
        }
    }

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneElem, setPhoneElem] = useState('');

    const [dirtyName, setDirtyName] = useState(false);
    const [dirtySurname, setDirtySurname] = useState(false);
    const [dirtyEmail, setDirtyEmail] = useState(false);

    const [phone, setPhone] = useState("");
    const [time, setTime] = useState("");

    const [erroreName, setErroreName] = useState("имя не указано");
    const [erroreSurname, setErroreSurname] = useState("фамилия не указана");
    const [erroreEmail, setErroreEmail] = useState("почта не указана");

    const [formValid, setFormValid] = useState(false);

    const nameHandler = (e) => {
        setName(e.target.value)
        if ((e.target.value.length > 0) && (e.target.value.length <= 2)) {
            setErroreName("некорректное имя");
        } else {
            setErroreName("");
        }
    }

    const surnameHandler = (e) => {
        setSurname(e.target.value)
        if ((e.target.value.length > 0) && (e.target.value.length <= 2)) {
            setErroreSurname("некорректная фамилия");
        } else {
            setErroreSurname("");
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/g
        if (!emailRegex.test(String(e.target.value).toLowerCase())) {
            setErroreEmail("некорректная почта");
        } else {
            setErroreEmail("");
        }
    }

    const phoneHandler = (e) => {
        setPhone(e.target.value)
    }

    const timeHandler = (e) => {
        setTime(e.target.value)
    }

    useEffect(() => {
        if (erroreName || erroreEmail || erroreSurname){
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    },[erroreName, erroreEmail, erroreSurname])

    const showElemtsInputs = {
        open:{
            y: 0,
            opacity: 1,
        },
        close:{
            y: 150,
            opacity: 0,
        }
    }

    let finalTitle;
    let formInputs;
    let buttonStyle;
    let titleForm;

    switch (place){
        case 1:
            finalTitle = "final1";
            formInputs="form1";
            buttonStyle="buttonOne";
            titleForm="formOneHeader";
            break;
        case 2:
            finalTitle = "final2";
            formInputs="form2";
            buttonStyle="buttonTwo";
            titleForm="formTwoHeader";
            break;
        case 3:
            finalTitle = "final3";
            formInputs="form3";
            buttonStyle="buttonThree";
            titleForm="formThreeHeader";
            break;
        case 4:
            finalTitle = "final3";
            formInputs="form3";
            buttonStyle="buttonThree";
            titleForm="formThreeHeader";
            break;
    }
    const blurHandle = (e) => {
        switch (e.target.name) {
            case 'name':
                setDirtyName(true)
                break

            case 'surname':
                setDirtySurname(true)
                break

            case 'email':
                setDirtyEmail(true)
                break
        }
    };

    return (
        <motion.div className={active ?  "form_reserve_contact active" : "form_reserve_contact"} onClick={() => setActive(false)} animate={active ? "open" : "close"} variants={showWindow} transition={{duration: 1}}>
            <div className="winForm_contact" onClick={e=>e.stopPropagation()}>
                <form className={formInputs}>
                    <div className={titleForm}>
                        <motion.h2 className="title_one_form_contact" variants={showElems} transition={{duration: 1, delay: 0.5}}>Я ХОЧУ ЗАБРОНИРОВАТЬ СТОЛИК</motion.h2>
                        <motion.h2 className="title_second_form_contact" variants={showElems} transition={{duration: 1, delay: 0.5}}>Мы свяжемся с вами в течении 15 минут</motion.h2>
                    </div>
                    <div className="main_block_form_contact">
                        <motion.div className="element_form_contact" animate={active ? "open" : "close"}>
                            <motion.label className="label_contact" variants={showElems}
                                          transition={{duration: 1, delay: 1}}>Ваше имя</motion.label>
                            <motion.input onChange={nameHandler} onBlur={blurHandle}
                                          className="text_line_contact" type="text" value={name}
                                          name="name" placeholder="ВВЕСТИ СЮДА" variants={showElemtsInputs}
                                          transition={{duration: 1, delay: 1}}/>
                            {(dirtyName && erroreName) && <div className="error_text_contact">{erroreName}</div>}
                        </motion.div>
                        <motion.div className="element_form_contact" animate={active ? "open" : "close"}>
                            <motion.label className="label_contact" variants={showElems}
                                          transition={{duration: 1, delay: 1}}>Ваша фамилия</motion.label>
                            <motion.input onChange={surnameHandler} onBlur={blurHandle}
                                          className="text_line_contact" type="text" value={surname}
                                          name="surname" placeholder="ВВЕСТИ СЮДА" variants={showElemtsInputs}
                                          transition={{duration: 1, delay: 1}}/>
                            {(dirtySurname && erroreSurname) && <div className="error_text_contact">{erroreSurname}</div>}
                        </motion.div>
                        <motion.div className="element_form_contact" animate={active ? "open" : "close"}>
                            <motion.label className="label_contact" variants={showElems}
                                          transition={{duration: 1, delay: 1}}>Номер телефона</motion.label>
                            <motion.div className="maskElemForm" variants={showElems}
                                        transition={{duration: 1, delay: 1}}>
                            <InputMask className="text_line_contact"  placeholder={"+7 (999) 99 99 999"}
                                          name="phone" mask = "+7(999) 99 99 999" onChange={e=>phoneHandler(e)}
                                          />
                            </motion.div>
                        </motion.div>
                        <motion.div className="element_form_contact" animate={active ? "open" : "close"}>
                            <motion.label className="label_contact" variants={showElems}
                                          transition={{duration: 1, delay: 1}}>Ваша почта</motion.label>
                            <motion.input onChange={emailHandler} onBlur={blurHandle}
                                          className="text_line_contact" type="text" value={email}
                                          name="email" placeholder="MAIL@MAIL.COM" variants={showElemtsInputs}
                                          transition={{duration: 1, delay: 1}}/>
                            {(dirtyEmail && erroreEmail) && <div className="error_text_contact">{erroreEmail}</div>}
                        </motion.div>
                    </div>
                    <div className="time">
                        <motion.label className="label_contact" variants={showElems} transition={{duration: 1, delay: 1}}>Дата и время</motion.label>
                        <motion.div className="time_input" variants={showElems}
                                    transition={{duration: 1, delay: 1}}>
                        <InputMask className="time_input_pool" mask = "99/99/9999 В 99.99" type="text" placeholder={"ВВЕДИТЕ ЖЕЛАЕМОЕ ВРЕМЯ И ДАТУ"} onChange={e=>timeHandler(e)} variants={showElems} transition={{duration: 1, delay: 1}}/>
                        </motion.div>
                    </div>
                </form>
                <motion.button disabled={!formValid} className={buttonStyle} onClick={buttonActive} variants={showButton} transition={{delay: 1.5, duration: 1}}>
                    ГОТОВО
                </motion.button>
                <motion.p className={finalTitle} whileInView={"open"} initial={"close"} viewport={{ once: true, amount: 0.1}} variants={showElems} transition={{duration: 1}}>Мы свяжемся с вами в течении 15 минут</motion.p>
            </div>
        </motion.div>
    );
};

export default FormToReserveTable;
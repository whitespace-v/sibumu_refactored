import React from 'react';
import '../fonts/fonts.css';
// import {Dimensions} from "react-native-web";
import "../About/css/AboutStyles.css";
import Header from "../HeaderBlock/Header";
import PageType from "../PageType/PageType"
import Information from "../About/Information";
import img_one from "../picture_izBrazzerie/img1.webp";
import heart from '../picture_izBrazzerie/heart.png';
import heartWhite from "../picture_izBrazzerie/heart_white.png";
import cart from '../picture_izBrazzerie/cart.png';
import cartWhite from "../picture_izBrazzerie/cart_white.png";
import book from '../picture_izBrazzerie/book.png';
import bookWhite from "../picture_izBrazzerie/book_white.png";

import img_on_history from "../picture_izBrazzerie/Проект ИЗ БРАЗЕРИ основной замена во втором блоке где стейк.jpg";
import Background from "../picture_izBrazzerie/background_img.jpg"


import HistoryAndLegend from "../About/HistoryAndLegend";
import HistoryImg from "../About/HistoryImg";
import DelivaryComponent from "../About/DelivaryComponentAbout";
import neww from "../picture_izBrazzerie/new.jpg";
import pic1 from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/min/1.jpg";
import pic2 from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/min/2.jpg";
import pic3 from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/min/3.jpg";
import pic4 from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/min/4.jpg";
import pic5 from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/min/5.jpg";
import pic6 from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/min/6.jpg";
import pic7 from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/min/7.jpg";
import pic8 from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/min/8.jpg";
import pic9 from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/min/9.jpg";
import pic10 from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/min/10.jpg";
import pic11 from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/min/11.jpg";
import pic12 from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/min/12.jpg";
import pic13 from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/min/13.jpg";
import pic14 from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/min/14.jpg";
import pic15 from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/min/15.jpg";
import pic16 from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/min/16.jpg";


// import Slider from "./Slider";
import Footer from "../Footer/Footer"
import LineImgAbout from "../About/LineImgAbout";
const About = () => {


    let lines = [

        {id: 1, signature: "13 лет на пути c самыми яркими гастрономическими впечатлениями"}
    ]

    const windowSize = React.useRef([window.innerWidth, window.innerHeight]);
    const screenWidth = windowSize.current[0];

    // По умолчанию картинки синего цвета на белом фоне
    var heartImg = heart;
    var bookImg = book;
    var cartImg = cart;

    // Если пользователь зашел на сайт с мобильного устройства, то фон становится персиковым, а изображения белыми
    if (screenWidth <= 700) {
        heartImg = heartWhite;
        bookImg = bookWhite;
        cartImg = cartWhite;
    } 

    let delivery = [
        {id: 1, text:"Авторская, европейская и азиатская кухня", style_delivery: "delivery_block1_about", img: bookImg, imgPng: bookImg},
        {id: 2, text:"Вы можете собрать блюда из всех наших проектов в один заказ", style_delivery: "delivery_block2_about", img: cartImg, imgPng: cartImg},
        {id: 3, text:"13 лет и тысячи любимых гостей со всего мира", style_delivery: "delivery_block3_about", img: heartImg, imgPng: heartImg}
    ]

    let pictures = [
        {id: 1, img: pic1, img_png: pic1},
        {id: 2, img: pic2, img_png: pic2},
        {id: 3, img: pic3, img_png: pic3},
        {id: 4, img: pic4, img_png: pic4},
        {id: 5, img: pic5, img_png: pic5},
        {id: 6, img: pic6, img_png: pic6},
        {id: 7, img: pic7, img_png: pic7},
        {id: 8, img: pic8, img_png: pic8},
        {id: 9, img: pic9, img_png: pic9},
        {id: 10, img: pic10, img_png: pic10},
        {id: 11, img: pic11, img_png: pic11},
        {id: 12, img: pic12, img_png: pic12},
        {id: 13, img: pic13, img_png: pic13},
        {id: 14, img: pic14, img_png: pic14},
        {id: 15, img: pic15, img_png: pic15},
        {id: 16, img: pic16, img_png: pic16},
       // {id: 15, img: img_four_slider, img_png: img_four_slider_png},
    ]

    let historyText = 'Наши проекты - про любовь к нашим гостям, про высокие гастрономические отношения с европейской и азиатской кухней, про Владивосток. В самом сердце города располагаются: ресторан японской и паназиатской кухни SIBUMI и одноименный гастропаб IZ BRASSERIE. Годы идут, мы растем и теперь вы можете радовать себя нежной выпечкой нашего проекта КОНДИТОРИЯ - в двух точках города. В каждом из проектов - своя неповторимая атмосфера, созданная лучшими в своем деле: шефами, поварами, дизайнерами и персоналом зала. Вдохновленные любовью к нашим гостям, мы продолжаем двигаться - в поисках вкуса. Вперед к гастрономическим открытиям с IZ BRASSERIE GROUP';
    let atmosphereText = 'Каждое блюдо - это большая история. До момента подачи кулинарного шедевра на стол - трудится целая команда профессионалов. Стремление к совершенству обращает наше внимание на каждую деталь, на технологию всех этапов приготовления - для вашего удовольствия. Аромат стейка под авторским соусом, хруст еще горячей выпечки, сбалансированный вкус подобранного вина от сомелье, свежайшие морепродукты из сердца японского моря - все это про годы работы команды - IZ BRASSERIE GROUP. Мы не стоим на месте. Мы путешествуем, экспериментируем, используем локальные и сезонные продукты чтобы удивлять вас снова и снова. Чтобы видеть своих дорогих гостей - еще чаще!';
    return (
        <div className="App">

            <link rel="preload" as="image" href={img_one}/>

            <Header bold_block={1} style_element="main_style"/>

            <div className="mainField">

                <PageType title="О ПРОЕКТЕ IZ BRASSERIE GROUP 2009"/>

                <Information lines={lines}/>

                <div className="history" style={{backgroundImage: `url(${Background})`  }}>
                    {/* <HistoryImg history_or_legend_img={img_on_history} text1="в поисках" text2="вкуса" legend={0}/> */}
                    <HistoryAndLegend text={historyText}
                                      title={"ВДОХНОВЕНИЕ"} legend={0} />
                </div>

                    <LineImgAbout line={pictures}/>


                <div className="delivery_about">
                    <div className="delivery_about_block">
                    {delivery.map(element => <DelivaryComponent element={element} key={element.id}/>)}
                    </div>
                </div>

                <div className="legend">
                    <HistoryAndLegend text={atmosphereText}
                                      title={"О ВКУСЕ"} legend={1}/>
                    <HistoryImg history_or_legend_img={neww} legend={1}/>
                </div>


                {/*<div className="personal">*/}
                {/*    <Slider width_window={state}/>*/}
                {/*</div>*/}

                <div className="footer">
                    <Footer/>
                </div>

            </div>
        </div>
    );
};

export default About;

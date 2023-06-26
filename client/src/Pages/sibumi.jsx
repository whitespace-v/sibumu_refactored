import React from 'react';
import '../fonts/fonts.css'
import '../Sibumi/css/Sibumi.css'
import Header from "../HeaderBlock/Header";
import PageType from "../PageType/PageType"
import Information from "../Sibumi/Information";
import img_one from "../picture_izBrazzerie/img1.webp";
import img_one_png from "../picture_izBrazzerie/img1.png";
import pic1 from "../picture_izBrazzerie/В галерею о проекте сибуми/min/1.jpg";
import pic2 from "../picture_izBrazzerie/В галерею о проекте сибуми/min/2.jpg";
import pic3 from "../picture_izBrazzerie/В галерею о проекте сибуми/min/3.jpg";
import pic4 from "../picture_izBrazzerie/В галерею о проекте сибуми/min/4.jpg";
import pic5 from "../picture_izBrazzerie/В галерею о проекте сибуми/min/5.jpg";
import pic6 from "../picture_izBrazzerie/В галерею о проекте сибуми/min/6.jpg";
import pic7 from "../picture_izBrazzerie/В галерею о проекте сибуми/min/7.jpg";
import pic8 from "../picture_izBrazzerie/В галерею о проекте сибуми/min/8.jpg";
import pic9 from "../picture_izBrazzerie/В галерею о проекте сибуми/min/9.jpg";
import pic10 from "../picture_izBrazzerie/В галерею о проекте сибуми/min/10.jpg";
import pic11 from "../picture_izBrazzerie/В галерею о проекте сибуми/min/11.jpg";
import pic12 from "../picture_izBrazzerie/В галерею о проекте сибуми/min/12.jpg";
import pic13 from "../picture_izBrazzerie/В галерею о проекте сибуми/min/13.jpg";
import pic14 from "../picture_izBrazzerie/В галерею о проекте сибуми/min/14.jpg";
import pic15 from "../picture_izBrazzerie/В галерею о проекте сибуми/min/15.jpg";
import pic16 from "../picture_izBrazzerie/В галерею о проекте сибуми/min/16.jpg";
import location from '../picture_izBrazzerie/location.png';
import locationWhite from "../picture_izBrazzerie/location_white.png";
import cart from '../picture_izBrazzerie/cart.png';
import cartWhite from "../picture_izBrazzerie/cart_white.png";
import book from '../picture_izBrazzerie/book.png';
import bookWhite from "../picture_izBrazzerie/book_white.png";
import rolls from "../picture_izBrazzerie/О проекте сибуми фото во 2 блок слева.jpg";
import neww from "../picture_izBrazzerie/new-sibumi.jpg";
import img_for_legend from "../picture_izBrazzerie/img7.webp"
import img_for_legend_png from "../picture_izBrazzerie/img7.png"
import HistoryAndLegend from "../About/HistoryAndLegend";
import HistoryImg from "../Sibumi/HistoryImg";
import DelivaryComponent from "../Sibumi/DelivaryComponent";
import Footer from "../Footer/Footer"
import LineImg from "../Sibumi/LineImg";
import Background from '../Sibumi/images/about-background.jpg';
import Menu from '../Sibumi/menu.pdf';

const Sibumi = () => {

	let lines = [
		{ id: 1, signature: "Дверь в Азию в самом центре нашего города" }
	]

	// Получаем текущие размеры экрана
	const windowSize = React.useRef([window.innerWidth, window.innerHeight]);
	const screenWidth = windowSize.current[0];

	// По умолчанию картинки синего цвета на белом фоне
	var locationImg = location;
	var bookImg = book;
	var cartImg = cart;

	// Если пользователь зашел на сайт с мобильного устройства, то фон становится персиковым, а изображения белыми
	if (screenWidth <= 700) {
		locationImg = locationWhite;
		bookImg = bookWhite;
		cartImg = cartWhite;
	}

	let delivery = [
		{ id: 1, text: "Уголок Японии в самом центре Владивостока", style_delivery: "delivery_block1_sibumi", img: locationImg, imgPng: locationImg },
		{ id: 2, text: "Оригинальный вкус в авторской подаче", style_delivery: "delivery_block2_sibumi", img: bookImg, imgPng: bookImg },
		{ id: 3, text: "Вы можете собрать блюда из всех наших проектов в один заказ", style_delivery: "delivery_block3_sibumi", img: cartImg, imgPng: cartImg }
	]

	let pictures = [
		{ id: 1, img: pic1, img_png: pic1 },
		{ id: 2, img: pic2, img_png: pic2 },
		{ id: 3, img: pic3, img_png: pic3 },
		{ id: 4, img: pic4, img_png: pic4 },
		{ id: 5, img: pic5, img_png: pic5 },
		{ id: 6, img: pic6, img_png: pic6 },
		{ id: 7, img: pic7, img_png: pic7 },
		{ id: 8, img: pic8, img_png: pic8 },
		{ id: 9, img: pic9, img_png: pic9 },
		{ id: 10, img: pic10, img_png: pic10 },
		{ id: 11, img: pic11, img_png: pic11 },
		{ id: 12, img: pic12, img_png: pic12 },
		{ id: 13, img: pic13, img_png: pic13 },
		{ id: 14, img: pic14, img_png: pic14 },
		{ id: 15, img: pic15, img_png: pic15 },
		{ id: 16, img: pic16, img_png: pic16 },
	]

	let historyText = 'Попадая в Японию - начинается путешествие в другой мир. Абсолютно не похожая на все кухни мира, именно японская кухня повсеместно влюбляет в себя абсолютно всех. Вдохновившись каноническими блюдами Юго-Восточной Азии, наши повара подготовили для вас самые необыкновенные и оригинальные кулинарные шедевры. В меню ресторана SIBUMI вы обязательно встретите новые сочетания для ваших вкусовых рецепторов. Мы не оставили без внимания и интерьер. С первых шагов вы почувствуете непередаваемую атмосферу, точь в точь как в аутентичных японских ресторанах. Из центра города - прямиком в Японию, с SIBUMI';
	let atmosphereText = 'Угольная рыба с молодым горошком и печеными перцами, сашими тай, дикий окунь с лемонграссом и листом кафир лайма, усудзикири из дикого лосося - эти и другие гастрономические вкусы, которые не оставят вас равнодушным. Одна из важнейших составляющих успеха нашего проекта - это закупки. Рыбу на ваши столики, мы доставляем прямиком из сердца рыбных рынков Японии. Гармонично дополнят ваш ужин - вина и сакэ из секретной комнаты для дегустаций, с уникальным погребом еще одного нашего проекта с мировым именем WINE & WHISKEY BY SIMPLE.';
	return (
		<div className="App">

			<link rel="preload" as="image" href={img_one} />

			<Header bold_block={3} style_element="main_style" />

			<div className="mainField">

				<PageType title="О ПРОЕКТЕ SIBUMI" />

				<Information lines={lines} />

				<div className="history"
					style={{ backgroundImage: `url(${Background})` }}>
					<HistoryAndLegend text={historyText}
						title={"ИСТОРИЯ"} legend={0} menu={Menu}/>
				</div>

				<LineImg line={pictures} />


				<div className="delivery_sibumi">
					<div className="delivery_sibumi_block">
						{delivery.map(element => <DelivaryComponent element={element} key={element.id} />)}
					</div>
				</div>

				<div className="legend">
					<HistoryAndLegend text={atmosphereText}
						title={"В ПОИСКАХ ВКУСА"} legend={1} />
					<HistoryImg history_or_legend_img={neww} legend={1} />
				</div>


				{/*<div className="personal">*/}
				{/*    <Slider width_window={state}/>*/}
				{/*</div>*/}

				<div className="footer">
					<Footer />
				</div>

			</div>
		</div>
	);
};

export default Sibumi;

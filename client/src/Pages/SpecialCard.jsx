import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Header from '../HeaderBlock/Header'; // Компонент хедера
import PageType from '../PageType/PageType';    // Компонент полоски под хедером
import Footer from '../Footer/Footer'; // Компонент футера
import '../ProductCard/css/ProductCard.css';
import {motion} from "framer-motion"
import axios from 'axios';
import basket_img from "../HeaderBlock/pictures_footer/Корзина.webp"
import basket_img_png from "../HeaderBlock/pictures_footer/Корзина (1).png"
import { Provider, useDispatch, useSelector } from "react-redux";
import { addOrder } from "./ReducerRedux";
import ButtonCount from "../MenuPage/Button_Count";
import store, { persister } from "./PersistReduxConfiguration";
import { PersistGate } from "redux-persist/integration/react";

const ProductCard = () => {

    const params = useParams();
    let productId = params.id;
    
    let [productName, setProductName] = useState('');
    let [productPrice, setProductPrice] = useState(''); 
    let [productDescription, setProductDescription] = useState('');
    let [productWeight, setProductWeight] = useState(0); 
    let [productBelki, setProductBelki] = useState('');
    let [productUglevods, setProductUglevods] = useState('');
    let [productFats, setProductFats] = useState(''); 
    let [productCallories, setProductCallories] = useState(''); 
    let [productPicLink, setProductPicLink] = useState('');
    let [costPerGram, setCostPerGram] = useState(false);
    let [productGuid, setProductGuid] = useState('');

    function loadData(data) {
        setCostPerGram(data.data.cost_per_gram);
        data = data.data.product_json;

        setProductName(data.name.toUpperCase())
        setProductPrice(data.sizePrices[0].price.currentPrice);
        setProductDescription(data.description == '' ? 'информация отсутствует' : data.description);
        setProductWeight(Math.round(Number(data.weight)) * 1000);
        setProductBelki(Math.round(Number(data.proteinsAmount)));
        setProductUglevods(Math.round(Number(data.carbohydratesAmount)));
        setProductFats(Math.round(Number(data.fatAmount)));
        setProductCallories(Math.round(Number(data.energyAmount)));
        setProductPicLink('https://images.iz-brasserie.ru/get/' + data.id);
        setProductGuid(data.id);
	}

	// Запрос на получение каталога
	useEffect(() => {
		axios.get("/api/specialProduct/" + productId).then(data => loadData(data))
	}, [])

    const basketRes = useSelector((state) => state.index);
    
    const changeButton = {
		close: {
			rotateX: "270deg",
			opacity: 0,
		}
	}

    const changeCountButton = {
		open: {
			rotateX: "360deg",
			display: "block",
			opacity: 1,
		}
	}

    const inBasket = () => {
		if (basketRes.find(elem => elem.id === productId))
			return true
		else
			return false
	}

    const [selectImg, setSelectImg] = useState(inBasket);
    const [countAdd, setCountAdd] = useState(1);
    const dispatch = useDispatch();


    function addElementInBasket() {
		setSelectImg(!selectImg)
		dispatch(addOrder({ id: productId, img: productPicLink, name: productName, count: countAdd, price: productPrice, summa: productPrice, gramm:  costPerGram, guid: productGuid, special: true}));
	}


    return (
        <div className="App">
            <Header bold_block={2} style_element="main_style"/>
            <div className='page_type'>
                <PageType title={productName}/>
            </div>

            <div className='card_body'>
                <img src={productPicLink} alt='product_img' className='product_img'/>
                <div className='text_information'>
                    <div className='product_title'>{productName}</div>
                    <div className='price_and_icon'>
                        <div className='price'>{productPrice} P</div>
                        <div className="block_with_icon">
                            <motion.div className={"inside_basket_block"} onClick={addElementInBasket} variants={changeButton} animate={selectImg ? "close" : "open"} transition={{ duration: 1 }}>
                                <picture>
                                    <source srcSet={basket_img} type="image/webp" />
                                    <source srcSet={basket_img_png} type="image/png" />
                                    <img src={basket_img} alt="basket_page" className="basket_img" />
                                </picture>
                            </motion.div>

                            <motion.div className="button_count_block" variants={changeCountButton} initial={{ opacity: 0, display: "none", rotateX: "180deg" }} animate={selectImg ? "open" : "close"} transition={{ duration: 0.5, delay: 1 }}>
                                <Provider store={store}>
                                    <PersistGate loading={null} persistor={persister}>
                                        <ButtonCount name={productName} img={productPicLink} price={productPrice} id={productId} inBasket={inBasket} />
                                    </PersistGate>
                                </Provider>
	        				</motion.div>
                        </div>
                    </div>

                    <div className='description'><b>Состав:</b> {productDescription}</div>
                    <div className='weight'><b>Вес:</b> {Number(productWeight).toFixed(1)} грамм</div>
                    {(costPerGram) && <div className='disclaimer'>*Информацию по итоговой стоимости товара уточните у менеджера</div>}
                    <div className='fats_info'>
                        <div className='fats'><b>Пищевая ценность в 100г.:</b></div>
                        <div className='belki'><b>Белки:</b> {productBelki}</div>
                        <div className='uglevods'><b>Углеводы:</b> {productUglevods}</div>
                        <div className='fats'><b>Жиры:</b> {productFats}</div>
                        <div className='callories'><b>Калории:</b> {productCallories}</div>
                    </div>

                    <motion.div transition={{duration: 1, delay: 1.5}}>
                        <motion.a className='go_back_button' href='/menu' whileHover={{borderColor: "#cebda0", color: "#ffffff", backgroundColor:"#cebda0", opacity: 1}}>Назад в меню</motion.a>
                    </motion.div>

                </div>
            </div>
					
            <div className="footer">
                <Footer/>
            </div>
        </div>
    )
}

export default ProductCard;

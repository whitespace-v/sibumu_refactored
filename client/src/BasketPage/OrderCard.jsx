import React from 'react';
import close_picture from "../HeaderBlock/pictures_footer/в корзине (1).webp"
import Button from "./Button";
import {motion} from "framer-motion";
import store, {persister} from "../Pages/PersistReduxConfiguration";
import {Provider, useDispatch} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {delOrderPosition, uppCount} from "../Pages/ReducerRedux";

const OrderCard = (props) => {
    const dispatch = useDispatch()

    function checkOnLastElement(){
        return props.order.id === props.masline;
    }

    return (
        <div className= "order_card">
            <div className="fake_element"/>
            <div className="order_inside_block">
                <div className={checkOnLastElement() ? "order_card_last" :"main_order_block"}>
            <div className="order_photo">
                <img className="order_picture_inside_block" src={'https://images.iz-brasserie.ru/get/' + props.order.guid} alt="photo order"/>
            </div>
            <div className="title_order">
            <div className = "title_element_order">Название</div>
            <div className="text_order">
                <div className="text_position_order">{props.order.name}</div>
                {(props.order.gramm) && <div className='gramm_div'>*Информацию по итоговой стоимости уточните у менеджера</div>}
            </div>
            </div>
            <div className="button">
                <div className = "title_element_order_count">Кол-во</div>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persister}>
                      <Button id={props.order.id} count={props.order.count} type={props.type}/>
                    </PersistGate>
                </Provider>
            </div>

            <div className="title_order_MobileVersion">
                <h3 className="text_order">{props.order.name}</h3>
            </div>

            <div className="prise">
                <div className = "title_element_order_prise">Цена</div>
                 <h3 className="title_prise">{props.order.summa} Р</h3>
            </div>

            <div className={props.type === "finishWindow" ? "close" : "delete"}>
                <motion.div className="block_for_close_button_order" whileHover={{opacity: 0.5}} transition={{duration: 0.3}}>

                    <picture>
                        <img onClick={() => dispatch(delOrderPosition({id: props.order.id}))} className="close_picture_order" src={close_picture} alt="close_img"/>
                    </picture>

                </motion.div>
            </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;

import React from 'react';
import '../ContactPage/css/Contacts.css';
import RestoranCard from "../ContactPage/RestoranCard";
import '../fonts/fonts.css'
import "../ContactPage/css/Form.css"
import Header from "../HeaderBlock/Header";
import PageType from "../PageType/PageType";
import Footer from "../Footer/Footer";
import logotype_sibumi from "../ContactPage/pictures/SIIbumi_kofeyny.webp"
import logotype_sibumi_png from "../ContactPage/pictures/SIIbumi_kofeyny.png"
import logotype_konditoria from "../ContactPage/pictures/konditor_kofeyny.webp"
import logotype_konditoria_png from "../ContactPage/pictures/konditor_kofeyny.png"
import logotype_brasserie from "../ContactPage/pictures/cofee_logo_iz_beazzerie.webp"
import logotype_brasserie_png from "../ContactPage/pictures/cofee_logo_iz_beazzerie.png"
import '../fonts/fonts.css'
const OntactsPage = () => {


    let cards = [
        {id:1, url: "https://yandex.ru/maps/-/CCUn7NAmwC", logotype_picture: logotype_sibumi, logotype_picture_png: logotype_sibumi_png, street:"ул. Пограничная, 10", phone:"+7 (423) 242-88-88", workdaysOne:"Пн-Вс: 12:00-23:00", workdaysTwo:"", name:"button1", textStyle: "information_about_point", pointStyle: "points_first_rest"},
        {id:2, url: "https://yandex.ru/maps/-/CCUn7NEbgB", logotype_picture: logotype_brasserie, logotype_picture_png: logotype_brasserie_png, street:"ул. Пограничная, 14", phone:"+7 (423) 222-25-35", workdaysOne:"Пн-Вс: 12:00-23:00", workdaysTwo:"", name:"button3", textStyle: "information_about_point", pointStyle: "points_first_rest"},
        {id:3, url: "https://yandex.ru/maps/-/CCUn7NEXCD", logotype_picture: logotype_konditoria, logotype_picture_png: logotype_konditoria_png, street:"ул. Пограничная, 14", phone:"+7 (423) 222-66-23", workdaysOne:"Пн-Вс: 08:00-20:00", workdaysTwo:"", name:"button2", textStyle: "information_about_point", pointStyle: "points_first_rest"},
        {id:4, url: "https://yandex.ru/maps/-/CCUn7NqTtD", logotype_picture: logotype_konditoria, logotype_picture_png: logotype_konditoria_png, street:"ул. Адмирала Кузнецова, 40Б", phone:"+7 (902) 556-02-60", workdaysOne:"Пн-Вс: 09:00-21:00", workdaysTwo:"", name:"button2", textStyle: "information_about_point", pointStyle: "points_first_rest"},
    ]

    return (
        <div className="contacts">

            <Header bold_block={6} style_element="main_style"/>

            <div className="mainFieldService_Contact">
                <PageType title="КОНТАКТЫ"/>


                <div className="restorans">
                    {cards.map(card => <RestoranCard card={card} key={card.id}/>)}
                </div>

                <div className="footer">
                    <Footer/>
                </div>

            </div>

        </div>
    );
};

export default OntactsPage;

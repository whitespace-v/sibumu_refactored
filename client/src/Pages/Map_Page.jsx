import React, {useState} from 'react';
import "../MainPage/css/StartPage.css"
import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import "../picture_izBrazzerie/mtk.jpg"
const MapPage = ({page_status}) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    function getZoom(){
        if (windowWidth < 1800 && windowWidth>800){
            return 13;
        }
        if (windowWidth <= 800){
            return 11;
        }
        if(windowWidth >= 1800){
            return 14;
        }
    }

    function getCenter(){
        if (windowWidth < 1800 && windowWidth>800){
            return [43.121528, 131.928704]
        }
        if (windowWidth <= 800){
            return [43.123844, 131.907982];
        }
        if (windowWidth >= 1800){
            return [43.121528, 131.928704]
        }
    }
    function getSizeOne(){
        if (windowWidth < 1900){
            return [-45, -35]
        }
        else{
            return [-45, -40]

        }
    }
    function getSizeTwo(){
        if (windowWidth < 1900){
            return [-45, -45]
        }
        else {
            return [-45, -40]
        }
    }

    return (
        <div className={page_status==="main_page" ? "map_element" : "map_element_standart"}>

            <YMaps query={{ load: "package.full" }}>
                <Map defaultState={{ center: getCenter(), zoom: getZoom(), controls: [], behaviors: []}} width='100%' height='100%' modules={['layout.Image']} >
                    <Placemark defaultGeometry={[43.119504, 131.880580]}

                               properties={{
                                   balloonContent: '<div class="baloon_placemarket"> <div>Ресторан Sibumi</div> <div>+7 (423) 242-88-88</div>' + '</div>',
                                   hintContent: '<b class="textHint"> Sibumi </b>',
                                   iconContent: '<div class="circle-marker__point">' +
                                       '<img class="circle-marker__point_img" alt="picture" src="/image/metka.jpg" style="position: relative; z-index: 111; color: #cebda0"/>' +
                                       '</div>',
                               }}
                               options={{
                                   // preset: 'islands#icon',
                                   iconLayout: "default#imageWithContent",
                                   iconImageSize: [35, 35],
                                   iconImageHref: "/img/metka.jpg",
                                   iconImageOffset: getSizeOne(),
                               }}
                    />

                    <Placemark defaultGeometry={[43.120452, 131.881047]}

                               properties={{
                                   balloonContent: '<div class="baloon_placemarket"> <div>Ресторан Is Brasserie, Кондитория</div> <div>+7 (423) 222-25-35, +7 (423) 222-66-23</div>' + '</div>',
                                   hintContent: '<b class="textHint"> Is Brasserie, Кондитория </b>',
                                   iconContent: '<div class="circle-marker__point">' +
                                       '<img class="circle-marker__point_img" alt="picture" src="/image/metka.jpg" style="position: relative; z-index: 111; color: #cebda0"/>' +
                                       '</div>',
                               }}
                               options={{
                                   // preset: 'islands#icon',
                                   iconLayout: "default#imageWithContent",
                                   iconImageSize: [35, 35],
                                   iconImageHref: "/img/metka.jpg",
                                   iconImageOffset: getSizeTwo(),
                               }}
                    />

                    <Placemark defaultGeometry={[43.124281, 131.956065]}

                               properties={{
                                   balloonContent: '<div class="baloon_placemarket"> <div>Ресторан Кондитория</div> <div>+7 (902) 556-02-60</div>' + '</div>',
                                   hintContent: '<b class="textHint"> Кондитория </b>',
                                   iconContent: '<div class="circle-marker__point">' +
                                       '<img class="circle-marker__point_img" alt="picture" src="/image/metka.jpg" style="position: relative; z-index: 111; color: #cebda0"/>' +
                                       '</div>',
                               }}
                               options={{
                                   // preset: 'islands#icon',
                                   iconLayout: "default#imageWithContent",
                                   iconImageSize: [35, 35],
                                   iconImageHref: "/img/metka.jpg",
                                   iconImageOffset: [-45, -40],
                               }}
                    />
                </Map>
            </YMaps>
        </div>
    );
};

export default MapPage;


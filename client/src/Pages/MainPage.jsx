import React, {useEffect, useState} from 'react';
import "../MainPage/css/StartPage.css"
import BlockOne from "../MainPage/BlockOne"
import BlockTwo from "../MainPage/BlockTwo";
import BlockThree from "../MainPage/BlockThree";
import BlockFour from "../MainPage/BlockFour";
import BlockFive from "../MainPage/BlockFive";
import sibumiPic from "../picture_izBrazzerie/Главная обложка сибуми.png";
import izBrazzeriePic from "../picture_izBrazzerie/главная обложка бразери.png";
import konditoryPic from "../picture_izBrazzerie/Главная обложка кондитории.png";
import { Dimensions } from 'react-native-web';
import '../fonts/fonts.css'
import Fullpage, {FullpageSection, FullPageSections} from "@ap.cx/react-fullpage";
import Header from "../HeaderBlock/Header";



const MainPage = () => {


    const [state, setState] = useState(Dimensions.get('window').width);
    window.addEventListener('resize', update);
    function update() {
        setState(window.innerWidth);
    }

    const [scrollPosition, setScrollPosition] = useState(0);
    // console.log(scrollPosition);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const Style = {
        height: "100vh",
    };


    const[card, setCard] = useState([
        {id: 1, title: "SIBUMI", text: "Японская и паназиатская кухня, как в Японии", img: sibumiPic},
        {id: 2, title: "КОНДИТОРИЯ", text: "Те самые десерты и нежная выпечка", img: konditoryPic},
        {id: 3, title: "IZ BRASSERIE", text: "Авторская, европейская и русская кухня ", img: izBrazzeriePic},
    ])


    if (state > 1200) {
        return (
            <div className="StartPage">
                <Header bold_block={0} style_element="main_style"/>
                {/*<IdleTimerReact type="firstWindow" scroll={scrollPosition}/>*/}
                {/*<IdleTimerReact type="secondWindow" scroll={scrollPosition}/>*/}
                <Fullpage>
                    <FullPageSections>
                        <FullpageSection style={Style}>
                            <BlockOne state={state}/>
                        </FullpageSection>
                        <FullpageSection style={Style}>
                            <BlockTwo state={state}/>
                        </FullpageSection>
                        <FullpageSection style={Style}>

                            <BlockThree cards={card} type={"fullScreen"}/>
                        </FullpageSection>
                        <FullpageSection style={Style}>
                            <BlockFour page={"standart_mainPage"}/>
                        </FullpageSection>
                    </FullPageSections>
                </Fullpage>
            </div>
        );
    }


    if (state < 1200) {
        return (
            <div className="StartPage">
                {/*<IdleTimerReact type="firstWindow" scroll={scrollPosition}/>*/}
                {/*<IdleTimerReact type="secondWindow" scroll={scrollPosition}/>*/}
                <Header bold_block={2} style_element="main_style"/>
                <Fullpage>
                    <FullPageSections>
                        <FullpageSection style={Style}>
                            <BlockOne state={state}/>
                        </FullpageSection>
                        <FullpageSection style={Style}>
                            <BlockTwo state={state}/>
                        </FullpageSection>
                        <FullpageSection style={Style}>
                            <BlockThree type={"mobile"} cards={card[0]}/>
                        </FullpageSection>

                        <FullpageSection style={Style}>
                            <BlockThree type={"mobile"} cards={card[1]}/>
                        </FullpageSection>

                        <FullpageSection style={Style}>
                            <BlockThree type={"mobile"} cards={card[2]}/>
                        </FullpageSection>

                        <FullpageSection style={Style}>
                            <BlockFour page={"mainPage"}/>
                        </FullpageSection>
                        <FullpageSection style={Style}>
                            <BlockFive/>
                        </FullpageSection>
                    </FullPageSections>
                </Fullpage>
            </div>
        );
    }

}

export default MainPage;
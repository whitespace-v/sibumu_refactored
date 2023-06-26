import React, {useState} from 'react';
import ImgOnAllWindow from "./ImgOnAllWindow";
import {motion} from "framer-motion"
import pic1_standart from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/full/1.jpg";
import pic2_standart from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/full/2.jpg";
import pic3_standart from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/full/3.jpg";
import pic4_standart from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/full/4.jpg";
import pic5_standart from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/full/5.jpg";
import pic6_standart from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/full/6.jpg";
import pic7_standart from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/full/7.jpg";
import pic8_standart from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/full/8.jpg";
import pic9_standart from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/full/9.jpg";
import pic10_standart from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/full/10.jpg";
import pic11_standart from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/full/11.jpg";
import pic12_standart from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/full/12.jpg";
import pic13_standart from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/full/13.jpg";
import pic14_standart from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/full/14.jpg";
import pic15_standart from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/full/15.jpg";
import pic16_standart from "../picture_izBrazzerie/В галерею о проекте (основной) бразери/full/16.jpg";
const ImgAbout = (props) => {

    let picturesHight = [
        {id: 1, img: pic1_standart},
        {id: 2, img: pic2_standart},
        {id: 3, img: pic3_standart},
        {id: 4, img: pic4_standart},
        {id: 5, img: pic5_standart},
        {id: 6, img: pic6_standart},
        {id: 7, img: pic7_standart},
        {id: 8, img: pic8_standart},
        {id: 9, img: pic9_standart},
        {id: 10, img: pic10_standart},
        {id: 11, img: pic11_standart},
        {id: 12, img: pic12_standart},
        {id: 13, img: pic13_standart},
        {id: 14, img: pic14_standart},
        {id: 15, img: pic15_standart},
        {id: 16, img: pic16_standart},
    ]

    const distance = 177.66666666;
    const timeZone = 70.6;

    const[activeModul, setActiveModul] = useState(false);
    function displacementElem() {
        return -picturesHight.length*2 * distance;
    }

    const [img_st, SetImg_St] = useState();
    const setParams = () =>{
        if(window.innerWidth>800) {
            setActiveModul(!activeModul);
            props.setActive(!props.active);
            document.body.style.overflow = "hidden";

            picturesHight.forEach(element => {
                if(element.id === props.photo.id){
                    return SetImg_St(element.img)
                }
            })
        }
    }

    return (
        <div className="allPictures">
            <motion.div onClick={setParams} className="picture" initial={{x:0}} animate={{x: displacementElem()}} transition={{duration: picturesHight.length*2 * distance/timeZone, repeat: Infinity, ease: "linear"}}>
                <picture>
                    <source srcSet={props.photo.img} type="image/webp"/>
                    <source srcSet={props.photo.img_png} type="image/png"/>
                    <img className="img" src={props.photo.img} alt="picture"/>
                </picture>
            </motion.div>
            <ImgOnAllWindow activePool={props.setActive} active={activeModul} setActive={setActiveModul} img={props.photo.img} img_png={props.photo.img_png}/>
        </div>
    );
};

export default ImgAbout;

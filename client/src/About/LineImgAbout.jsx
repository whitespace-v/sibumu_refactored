import React, {useEffect, useState} from 'react';
import ImgAbout from "./ImgAbout";

const LineImgAbout = ({line}) => {
    const [activeImg, setActiveImg] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    window.addEventListener('resize', update);

    function update() {
        setWindowWidth(window.innerWidth);
    }

    function displacement() {
        let optimalDist = Math.ceil(windowWidth/355);
        let i = 0;
        if(line.length < optimalDist){
            let concatMas = [];
            let finalMas = [];
            while (concatMas.length < optimalDist){
                line.forEach(elem => {
                    concatMas.push(elem)
                })
            }
            while (i<2){
                finalMas.push(...concatMas);
                i++;
            }
            return finalMas;
        }

        else {
            let finalMas = [];
            while (i<2){
                finalMas.push(...line);
                i++;
            }
            finalMas.length=finalMas.length/2+optimalDist;
            return finalMas;
        }

    }

    return (
        <div className={activeImg && (window.innerWidth>800) ? "block_with_pictures_not_active" : "block_with_pictures"}>
            <div className="pool_with_img">
                {displacement().map(photo => <ImgAbout active = {activeImg} setActive = {setActiveImg} photo={photo} key={photo.id}/>)}
            </div>
        </div>
    );
};

export default LineImgAbout;

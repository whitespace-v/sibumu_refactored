import React, {useState} from 'react';
import Img from "./Img";

const LineImg = ({line}) => {

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
                {displacement().map(photo => <Img active = {activeImg} setActive = {setActiveImg} photo={photo} key={photo.id}/>)}
            </div>
        </div>
    );
};


//     const [activeImg, setActiveImg] = useState(false);
//
//     const [flag, setFlag] = useState(false);
//
//
//     const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//
//     const [startPositionX, setStartPositionX] = useState(0);
//     const [endPositionX, setEndPositionX] = useState(0);
//     const [timeStart, setTimeStart] = useState(Date.now);
//     const [timeEnd, setTimeEnd] = useState(Date.now);
//     const [move, setMove] = useState();
//
//     function touchStart(e){
//         console.log(" start")
//         setTimeStart(Date.now);
//         setStartPositionX(e.changedTouches[0].clientX);
//         setFlag(!flag);
//     }
//     function moveTouch(e) {
//         if (document.getElementsByClassName("pool_with_img")[0].scrollLeft < 2000) {
//             setTimeEnd(Date.now);
//             setEndPositionX(e.changedTouches[0].clientX);
//             let vec = endPositionX - startPositionX;
//             let time = timeEnd - timeStart;
//
//             if (vec > 0) {
//                 setMove(Math.sqrt(vec) / time);
//             }
//             if (vec < 0) {
//                 setMove((Math.sqrt(-vec) / time));
//             }
//             document.getElementsByClassName("pool_with_img")[0].scrollLeft += move * vec;
//         }
//     }
//     function touchEnd(e){
//         setFlag(!flag);
//     }
//
//
//
//
//     function mouseDown(e){
//         console.log('asdsad');
//         setFlag(true);
//         setTimeStart(Date.now);
//         setStartPositionX(e.clientX);
//     }
//
//     function moveMouse(e){
//         if(flag === true) {
//             setTimeEnd(Date.now);
//             setEndPositionX(e.clientX);
//             let vec = endPositionX - startPositionX;
//             let time = timeEnd - timeStart;
//
//             if(vec > 0){
//                 setMove(Math.sqrt(vec)/time);
//             }
//             if(vec < 0){
//                 setMove((Math.sqrt(-vec)/time));
//             }
//             document.getElementsByClassName("pool_with_img")[0].scrollLeft += move * vec;
//         }
//
//     }
//
//     function mouseUp(e){
//         setFlag(false);
//     }
//
//     return (
//         <div className={activeImg && (window.innerWidth>800) ? "block_with_pictures_not_active" : "block_with_pictures"}>
//             <div className={activeImg===true ? "pool_with_img_flag" : "pool_with_img"} onMouseDown={mouseDown} onMouseMove={moveMouse} onMouseUp={mouseUp} onTouchStart={touchStart} onTouchMove={moveTouch} onTouchEnd={touchEnd}>
//                 {line.map(photo => <Img active = {activeImg} setActive = {setActiveImg} photo={photo} key={photo.id} flag = {flag}/>)}
//             </div>
//         </div>
//     );
// };

export default LineImg;
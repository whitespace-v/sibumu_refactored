import React, {useRef} from 'react';
import {IdleTimerProvider} from 'react-idle-timer'


const IdleTimerReact = ({scroll, type}) => {
    const useRefidle = useRef(null)
    // console.log(scroll);
    const goNext = () =>{
            window.scrollBy(0, 1000);
            this.IdleTimerProvider.reset();
    }

    const goNextPageTwo = () =>{
            window.scrollBy(0, 1000);
            this.IdleTimerProvider.reset();

    }

    // const goNextPageThree = () =>{
    //     window.scrollBy(0, -1000);
    //     this.IdleTimerProvider.reset();
    //
    // }



    if((type==="firstWindow")&&(scroll < 900)) {
        return (
            <div>
                <IdleTimerProvider ref={useRefidle} onIdle={goNext} timeout={10000}/>
            </div>
        );
    }
    if((type==="secondWindow")&&(scroll > 900)&&(scroll<1050)){
        return (
            <div>
                <IdleTimerProvider ref={useRefidle} onIdle={goNextPageTwo} timeout={20000}/>
            </div>
        );
    }
};

export default IdleTimerReact;
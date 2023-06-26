import React from 'react';
import CardOnThirdWindow from "./CardOnThirdWindow";

const BlockThree = ({cards, type}) => {

    if (type === "fullScreen") {
        return (
            <div className="block3">
                <div className="block_with_card">
                    {cards.map(cardElem => <CardOnThirdWindow type={"normal"} id={cardElem.id} order={cardElem}/>)}
                </div>
            </div>
        );
    }

else
    {
        return (
            <div className="block3">
                <div className="block_with_card">

                    <CardOnThirdWindow type={"mobile"} id={cards.id} order={cards}/>
                </div>
            </div>
        );
    }
};

export default BlockThree;
import React, {useState} from 'react';
import CardElement from "./CardMenu"
import  store, {persister} from "../Pages/PersistReduxConfiguration";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
const PageWithPosition = ({variant_menu, page, cardUrl}) => {
    return (
        <div className="page_with_positionElem">
            {variant_menu.map(element=>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persister}>
                    <CardElement element={element} key={element.id} page={page} cardUrl={cardUrl}/>
                    </PersistGate>
                </Provider>)}
        </div>
    );
};

export default PageWithPosition;

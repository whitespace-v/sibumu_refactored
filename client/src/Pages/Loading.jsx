import React from 'react';
import Header from "../HeaderBlock/Header";
import PageType from "../PageType/PageType";
import Load from "../LoadElement/Loading"
import loadPicture from "../LoadElement/pictureLoad/load.jpg"

const Loading = () => {
    return (
        <div className="Loading">
            <Header bold_block={0} style_element="main_style"/>

            <div className="loading_page">
                <PageType title="СЕРВИСНАЯ СТРАНИЦА ОПЛАТЫ"/>
                <Load/>
            </div>
        </div>
    );
};

export default Loading;
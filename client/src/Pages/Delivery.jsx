import '../Delivery/css/ServicePage.css';
import React from 'react';
import ArrayOfBlocks from "../Delivery/ ArrayOfBlocks";
import '../fonts/fonts.css'
import Header from "../HeaderBlock/Header"
import PageType from "../PageType/PageType"
import Footer from "../Footer/Footer"
const Delivery = () => {
    return (
        <div className="servicePage">

            <Header bold_block={0} style_element="main_style"/>

            <div className="service_main_pool">
            <PageType title="ДОСТАВКА"/>

                <div className="mainFieldService_Service">
                <ArrayOfBlocks/>

                </div>

                <div className="footer">
                    <Footer/>
                </div>

            </div>

        </div>
    );
};

export default Delivery;
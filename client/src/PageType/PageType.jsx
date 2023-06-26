import React from 'react';
import "./css/PageType.css"
const PageType = ({title}) => {

    return (
        <div className="page_type_INTYPE">
            <div className="emitation_block_pageType"/>
            <div className="page_main_title_INTYPE">
                <div className="inside_title_block_pageType_INTYPE">
                <h1 className="page_type_title_INTYPE">{title}</h1>
                </div>
            </div>
        </div>
    );
};

export default PageType;

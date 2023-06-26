import React from 'react';
import ElementsForm from './ButtonsOrder'

const WindowWithForms = () => {
    return (
        <div className="first_form">
            <ElementsForm type="takeOrder"/>
            <ElementsForm type="timeOrder"/>
        </div>
    );
};

export default WindowWithForms;
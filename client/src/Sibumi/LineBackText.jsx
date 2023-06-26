import React from 'react';

const LineBackText = (props) => {
    return (
        <div className="line">
            <h>{props.line.signature}</h>
        </div>
    );
};

export default LineBackText;

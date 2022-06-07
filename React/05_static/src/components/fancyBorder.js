import React from 'react';

const fancyBorder = (props) => {
    return (
        <div className={"FancyBorder FancyBorder-" + props.color}>
            {props.children}
        </div>
    );
};

export default fancyBorder;
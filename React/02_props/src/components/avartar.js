import React from 'react';

const avartar = (props) => {
    return (
        <img className="Avartar"
            src={props.user.avartar}
            alt={props.user.name}
        />
    );
};

export default avartar;
import React from 'react';

const Square = ({ value, onClick }) => {
    const displayValue = value ? `${value.owner}: ${value.particles}` : '';

    return (
        <button className="square" onClick={onClick}>
            {displayValue}
        </button>
    );
};

export default Square;

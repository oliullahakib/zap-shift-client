import React from 'react';

const Mydiv = ({children,className}) => {
    return (
        <div className={`${className} max-w-7xl mx-auto`}>
            {children}
        </div>
    );
};

export default Mydiv;
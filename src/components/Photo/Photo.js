import React from 'react';

const Photo = (props) => {
    return (
        <div>
            <img src={props.photo} alt="elo"/>
        </div>
    );
};

export default Photo;
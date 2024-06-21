// src/ParentWrapper.js
import React from 'react';
import Wrapper from './wrapper';
import '../css/ParentWrapper.css'


const ParentWrapper = () => {
    return (
        <div className="parent-wrapper">
            <Wrapper>
                <h2>Item 1</h2>
                <p>This is some content for the first item.</p>
                <h2>Item 2</h2>
                <p>This is some content for the second item.</p>
            </Wrapper>
        </div>
    );
};

export default ParentWrapper;

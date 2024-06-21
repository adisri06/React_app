// src/Wrapper.js
import React from 'react';
import '../css/Wrapper.css'

const Wrapper = ({ children }) => {
    return (
        <div className="wrapper">
            {React.Children.map(children, (child, index) => (
                <div className="wrapped-child" key={index}>
                    {child}
                </div>
            ))}
        </div>
    );
};

export default Wrapper;
// React.Children.map: This is a utility function provided by React that
// is specifically designed to iterate over the children prop. The children prop can be a single child, multiple children, or an array of children.

// children: This represents the children prop passed to a component. It can be any valid React node (elements, strings, numbers, arrays, or even null).

// (child, index): This is the callback function that is executed for each child in the children collection. It takes two parameters:

// child: The current child being processed.
// index: The index of the current child in the list of children.
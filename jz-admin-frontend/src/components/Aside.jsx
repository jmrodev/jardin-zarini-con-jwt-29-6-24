import React from 'react';
import '../styles/Aside.css';


const Aside = (props) => {
    return (
        <aside className="aside">
            {props.children}
        </aside>
    );
}

export default Aside;
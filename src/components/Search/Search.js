import React, { useState } from 'react';
import './Search.css';

export default props => {
    const [value, setValue] = useState('');
    const valueChangeHandler = e => {
        setValue(e.target.value);
        props.onSearch(value);
        setValue(e.target.value)
    };

    return (
        <div className="search-wrapper">

            <input
                className="search-input"
                type="text"
                placeholder="Искать здесь..."
                onChange={valueChangeHandler}
                onKeyDown={valueChangeHandler}
                value={value}
            />
            <button
                className="search-btn"
                type="submit"
                onClick={() => props.onSearch(value)}
            >

            </button>

        </div>

    )


}

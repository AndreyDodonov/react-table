import React from 'react';
import './leftBar.css';


export default props => {
    // 32 и 1000 элементов
    return (
        <div className="left-menu">
            <h3 className="menu-title">Menu</h3>
            <ul className="menu-list">
                <li>
                    <button
                        className="button load__big"
                        onClick={() => props.getInfo(32)}
                    >
                        <span>32</span>
                    </button>
                </li>
                <li>
                    <button
                        className="button load__small"
                        onClick={() => props.getInfo(1000)}
                    ><span>1000</span>
                    </button>
                </li>

                {  // если таблица загружена показываем кнопку добавить строку, если не загружена то скрываем
                    (props.visible) ?
                        <li>
                            <button
                                className="button"
                                onClick={() => props.addRowShow()}
                            ><span>new</span></button>
                        </li>
                        : null
                }
            </ul>
        </div>
    )
}


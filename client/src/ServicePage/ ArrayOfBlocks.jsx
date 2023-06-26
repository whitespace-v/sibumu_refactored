import React from 'react';
import BlockWithText from "./BlockWithText";

const ArrayOfBlocks = ({img_title, img_title_png}) => {
    let blocks = [
        {id:1, img: img_title, img_png: img_title_png, title: "КОНТАКТНЫЕ ДАННЫЕ ОРГАНИЗАЦИИ", text: 'ООО \"БРАЗЕРИ\"\n\nИНН:	2540250591\nКПП:	254001001\nОГРН:	1192536012492\nЮридический адрес:	690091, Приморский край, Владивосток г, Пограничная ул, дом № 10, офис 2Почтовый адрес:	690091, Приморский край, Владивосток Пограничная ул., дом № 10, офис 2\nУСЛОВИЯ ОПЛАТЫ\n100% оплата заказа по банковской карте, наличными курьеру.\n'.split('\n').map(str => <p>{str}</p>)}
        // // {id:2, img: img_scooter_two, img_png: img_scooter_two_png, title: "ОПЛАТА ЗАКАЗА", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aut."},
        // {id:3, img: img_scooter_three, img_png: img_scooter_three_png, title: "ОПЛАТА ЗАКАЗА", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aut."},
        // {id:4, img: img_scooter_four, img_png: img_scooter_four_png, title: "ОПЛАТА ЗАКАЗА", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aut."}
    ]


    return (
        <div className="array_on_blocks">
            {blocks.map(block => <BlockWithText block={block} key={block.id}/>)}
        </div>
    );
};

export default ArrayOfBlocks;
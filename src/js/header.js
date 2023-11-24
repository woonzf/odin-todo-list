import { createImg, createText } from "./function";

import icon from '../img/to-do-list.png';

const header = (() => {
    function create() {
        const image = createImg(icon, "Todo List Icon");
        const date = createText(getTodayDate());
        return [image, date];
    }

    function getTodayDate() {
        const date = new Date();
        const monthList = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        
        const day = date.getDate();
        const month = monthList[date.getMonth()].toUpperCase();
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }

    return { create }
})()

export { header }

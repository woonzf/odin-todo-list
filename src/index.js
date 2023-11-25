import './css/style.css';
import './css/side-bar.css';
import './css/main.css';

import { sideBar } from '../src/js/side-bar';
import { main } from './js/main';

const page = (() => {
    const content = document.querySelector("#content");

    function init() {
        document.title = "Todo List";
        content.append(sideBar.init(), main.init());
    }

    Object.prototype.render = function(...content) {
        for (const item of [...content]) this.append(item);
    }

    return { init }
})()

page.init();

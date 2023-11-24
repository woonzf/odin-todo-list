import './css/style.css';
import './css/header-footer.css';

import { header } from '../src/js/header';

const page = (() => {
    function init() {
        document.title = "Todo List";
        render(".header", header.create());
    }

    function render(selector, content) {
        const element = document.querySelector(selector);
        if (content.length > 1) {
            for (const item of content) element.append(item);
        } else element.append(content);
    }

    return { init }
})()

page.init();

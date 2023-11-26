import './css/style.css';
import './css/side-bar.css';
import './css/main.css';

import { sideBar } from './js/side-bar';
import { main } from './js/main';

const page = (() => {
    const content = document.querySelector("#content");
    let liMenu = null;

    function init() {
        document.title = "Todo List";
        initLayout();
        setMenuIdDefault("today");

        // Event SIDE BAR
        liMenu = document.querySelectorAll("#menu > li");
        liMenu.forEach(li => {
            li.onclick = function(e) {
                e.target.toggleAndRender();
            }
        });
    }

    function initLayout() {
        content.append(sideBar.init(), main.init());
    }

    function setMenuIdDefault(text) {
        const li = document.querySelector(`#${text}`);
        li.toggleAndRender();
    }

    Object.prototype.toggleAndRender = function() {
        this.toggleClass("active");
        this.render();
    }

    Object.prototype.toggleClass = function(className) {
        const liActive = document.querySelector(`.${className}`);
        if (liActive !== null) liActive.classList.remove(className);
        this.classList.add(className);
    }

    Object.prototype.render = function() {
        const title = document.querySelector("#title");
        title.textContent = this.textContent;
        main.render(this.textContent);
    }

    return { init }
})()

page.init();

import './css/style.css';
import './css/side-bar.css';
import './css/main.css';

import { sideBar } from './js/side-bar';
import { main } from './js/main';
import { user } from './js/user';

const page = (() => {
    const content = document.querySelector("#content");
    let profile = null;
    let liMenu = null;

    function init() {
        document.title = "Todo List";
        initLayout();
        initProfile();
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

    function initProfile() {
        profile = user.init();
        const div = document.querySelector("#profile");
        const img = div.querySelector("img");
        const name = div.querySelector("div");
        img.src = profile.icon.src;
        img.alt = profile.icon.alt;
        name.textContent = profile.name;
    }

    function setMenuIdDefault(text) {
        const li = document.querySelector(`#${text}`);
        li.toggleAndRender();
    }

    Object.prototype.toggleAndRender = function() {
        this.toggleClass("active");
        main.render(this.textContent, profile.projects);
    }

    Object.prototype.toggleClass = function(className) {
        const liActive = document.querySelector(`.${className}`);
        if (liActive !== null) liActive.classList.remove(className);
        this.classList.add(className);
    }

    return { init }
})()

page.init();

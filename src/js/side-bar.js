import { createDivAndAppend, createImg, createText } from "./function";

import iconTodo from '../img/playlist-check-custom.png';
import iconToday from '../img/calendar-blank-custom.png';
import iconUpcoming from '../img/calendar-multiselect-custom.png';
import iconProject from '../img/book-multiple-outline-custom.png';

const sideBar = (() => {
    function init() {
        const menuList = [
            new MenuItem("Today", iconToday, "Calendar Icon"),
            new MenuItem("Upcoming", iconUpcoming, "Calendar with Dots Icon"),
            new MenuItem("My Projects", iconProject, "Multiple Book Icon"),
        ];

        const brand = createBrand();
        const menu = createMenu(menuList);

        const div = createDivAndAppend(brand, menu);
        div.id = "side-bar";
        return div;
    }

    function MenuItem(name, src, alt) {
        this.name = name;
        this.src = src;
        this.alt = alt;
    }
    
    function createBrand() {
        const icon = createImg(iconTodo, "Todo Icon");
        const name = createText("todo list");
        const div = createDivAndAppend(icon, name);
        div.id = "brand";
        return div;
    }

    function createMenu(list) {
        const ul = document.createElement("ul");
        ul.id = "menu";
        for (const item of list) {
            const li = createMenuItem(item.name, item.src, item.alt);
            ul.append(li);
        }
        return ul;
    }

    function createMenuItem(name, src, alt) {
        const img = createImg(src, alt);
        const li = document.createElement("li");
        const div = createText(name);
        li.append(img, div);
        li.onclick = function() {
            this.toggleClass("active");
        }
        return li;
    }

    Object.prototype.toggleClass = function(className) {
        const liActive = document.querySelector(`.${className}`);
        if (liActive !== null) liActive.classList.remove(className);
        this.classList.add(className);
    }

    return { init }
})()

export { sideBar }

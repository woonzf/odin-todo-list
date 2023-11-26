import { createEmptyDivId, createImg, createText } from "./function";

import iconTodo from '../img/playlist-check-custom.png';
import iconToday from '../img/calendar-blank-custom.png';
import iconUpcoming from '../img/calendar-multiselect-custom.png';
import iconProject from '../img/book-multiple-outline-custom.png';

const sideBar = (() => {
    function init() {
        const brand = createBrand();
        const menu = createMenu(getMenuList());
        
        const div = createEmptyDivId("side-bar");
        div.append(brand, menu);
        return div;
    }

    function getMenuList() {
        return [
            new MenuItem("Today", iconToday, "Calendar Icon"),
            new MenuItem("Upcoming", iconUpcoming, "Calendar with Dots Icon"),
            new MenuItem("My Projects", iconProject, "Multiple Book Icon"),
        ];
    }

    class MenuItem {
        constructor (name, src, alt) {
            this.name = name;
            this.src = src;
            this.alt = alt;
        }

        getId() {
            return this.name.toLowerCase().split(" ").join("-");
        }
    }
    
    function createBrand() {
        const icon = createImg(iconTodo, "Todo Icon");
        const name = createText("todo list");
        const div = createEmptyDivId("brand");
        div.append(icon, name);
        return div;
    }

    function createMenu(list) {
        const ul = document.createElement("ul");
        ul.id = "menu";
        for (const item of list) {
            const li = createMenuItem(item);
            ul.append(li);
        }
        return ul;
    }

    function createMenuItem(item) {
        const img = createImg(item.src, item.alt);
        const div = createText(item.name);
        const li = document.createElement("li");
        li.append(img, div);
        li.id = item.getId();
        return li;
    }

    return { init }
})()

export { sideBar }

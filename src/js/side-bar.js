import { createEmptyDivId, createImg, createText } from "./function";

import iconTodo from '../img/playlist-check-custom.png';
import iconToday from '../img/calendar-blank-custom.png';
import iconUpcoming from '../img/calendar-multiselect-custom.png';
import iconProject from '../img/book-multiple-outline-custom.png';

const sideBar = (() => {
    function init() {
        const brand = _createBrand();
        const user = _createProfile();
        const menu = _createMenu(_getMenuList());
        
        const div = createEmptyDivId("side-bar");
        div.append(brand, user, menu);
        return div;
    }

    function _getMenuList() {
        return [
            new _MenuItem("Today", iconToday, "Calendar Icon"),
            new _MenuItem("Upcoming", iconUpcoming, "Calendar with Dots Icon"),
            new _MenuItem("My Projects", iconProject, "Multiple Book Icon"),
        ];
    }

    class _MenuItem {
        constructor (name, src, alt) {
            this.name = name;
            this.src = src;
            this.alt = alt;
        }

        getId() {
            return this.name.toLowerCase().split(" ").join("-");
        }
    }
    
    function _createBrand() {
        const icon = createImg(iconTodo, "Todo Icon");
        const name = createText("todo list");
        const div = createEmptyDivId("brand");
        div.append(icon, name);
        return div;
    }

    function _createProfile() {
        const img = createImg("", "");
        const name = createText("");
        const div = createEmptyDivId("profile");
        div.append(img, name);
        return div;
    }

    function _createMenu(list) {
        const ul = document.createElement("ul");
        ul.id = "menu";
        for (const item of list) {
            const li = _createMenuItem(item);
            ul.append(li);
        }
        return ul;
    }

    function _createMenuItem(item) {
        const img = createImg(item.src, item.alt);
        const div = createText(item.name);
        const li = document.createElement("li");
        li.append(img, div);
        li.id = item.getId();
        return li;
    }

    function setProfile(profile) {
        const div = document.querySelector("#profile");
        const img = div.querySelector("img");
        const name = div.querySelector("div");
        img.src = profile.icon.src;
        img.alt = profile.icon.alt;
        name.textContent = profile.name;
    }

    return { init, setProfile }
})()

export { sideBar }

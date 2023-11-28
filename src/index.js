import './css/style.css';
import './css/side-bar.css';
import './css/main.css';

import { sideBar } from './js/side-bar';
import { main } from './js/main';
import { user } from './js/user';
import { Task, generateId } from './js/function';

const page = (() => {
    const content = document.querySelector("#content");
    let profile = null;
    let liMenu = null;
    let liActive = null;
    let btnAddTasks = null;

    function init() {
        document.title = "Todo List";
        initLayout();
        initProfile();
        setMenuIdDefault("today");

        // Event MENU
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
        main.render(liActive.textContent, profile);
        refreshAddTask();
    }

    Object.prototype.toggleClass = function(className) {
        if (liActive !== null) liActive.classList.remove(className);
        this.classList.add(className);
        liActive = this;
    }

    function refreshAddTask() {
        btnAddTasks = document.querySelectorAll(".add-task");
        btnAddTasks.forEach(btn => {
            btn.onclick = function() {
                const index = profile.projects.findIndex(project => project.id === parseInt(btn.id.split("-")[1]));
                const task = new Task("Code", "28/11/2023", "High", generateId(profile.projects))
                profile.projects[index].addTask(task);
                main.render(liActive.textContent, profile);
                refreshAddTask();
            }
        });
    }

    return { init }
})()

page.init();

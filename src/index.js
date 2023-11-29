import './css/style.css';
import './css/side-bar.css';
import './css/main.css';

import { sideBar } from './js/side-bar';
import { main } from './js/main';
import { user } from './js/user';
import { Task } from './js/function';

const page = (() => {
    const content = document.querySelector("#content");
    let profile = null;
    let liMenu = null;
    let liActive = null;
    let dialogAddTask = null;
    let btnAddTasks = null;

    function init() {
        document.title = "Todo List";
        initLayout();
        initProfile();
        setMenuIdDefault("today");

        liMenu = document.querySelectorAll("#menu > li");
        dialogAddTask = document.querySelector("#dialog-add-task");

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
        renderAndRefresh();
    }

    Object.prototype.toggleClass = function(className) {
        if (liActive !== null) liActive.classList.remove(className);
        this.classList.add(className);
        liActive = this;
    }

    function renderAndRefresh() {
        main.render(liActive.textContent, profile);
        refreshAddTask();
    }

    function refreshAddTask() {
        btnAddTasks = document.querySelectorAll(".add-task");
        btnAddTasks.forEach(btn => {
            btn.onclick = function() {
                dialogAddTask.showModal();
                // const index = profile.projects.findIndex(project => project.id === parseInt(btn.id.split("-")[1]));
                // const task = new Task("Code", "28/11/2023", "High", profile.projects)
                // profile.projects[index].addTask(task);
                // renderAndRefresh();
            }
        });
    }

    return { init }
})()

page.init();

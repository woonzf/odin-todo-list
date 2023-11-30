import './css/style.css';
import './css/side-bar.css';
import './css/main.css';

import { sideBar } from './js/side-bar';
import { main } from './js/main';
import { user } from './js/user';

const page = (() => {
    const content = document.querySelector("#content");
    let profile = null;
    let liActive = null;
    let dialogAddTask = null;
    let btnAddTasks = null;
    let projectId = null;

    function init() {
        document.title = "Todo List";
        initLayout();
        initProfile();
        setMenuIdDefault("today");

        // Event SIDE BAR
        const liMenu = document.querySelectorAll("#menu > li");
        liMenu.forEach(li => {
            li.onclick = function(e) {
                toggleAndRender(e.target);
            }
        });

        // Event DIALOG CLOSE
        const btnTaskClose = document.querySelector("#btn-task-close");
        dialogAddTask = document.querySelector("#dialog-add-task");
        const formTask = document.querySelector("#form-add-task");

        btnTaskClose.onclick = function() {
            dialogAddTask.close();
            formTask.reset();
        }

        // Event TASK ADD
        const btnAdd = document.querySelector("#btn-task-add");
        const inputDesc = document.querySelector("#description");
        const inputDueDate = document.querySelector("#due-date");
        const selectPriority = document.querySelector("#priority");

        btnAdd.onclick = function(e) {
            if (inputDesc.value === "" || inputDueDate.value === "") return;
            e.preventDefault();
            user.addNewTask(inputDesc.value, inputDueDate.value, selectPriority.value, projectId);
            dialogAddTask.close();
            formTask.reset();
            profile = user.refresh();
            renderAndRefresh();
        }
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
        toggleAndRender(li);
    }

    function toggleAndRender(target) {
        toggleClass(target, "active");
        renderAndRefresh();
    }

    function toggleClass(target, className) {
        if (liActive !== null) liActive.classList.remove(className);
        target.classList.add(className);
        liActive = target;
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
                projectId = btn.id;
            }
        });
    }

    return { init }
})()

page.init();

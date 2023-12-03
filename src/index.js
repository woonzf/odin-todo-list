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
    let dialogAddProject = null;
    let btnId = null;

    function init() {
        document.title = "Todo List";
        initLayout();
        initProfile();
        setMenuIdDefault("today");

        // Event SIDE BAR
        const liMenu = document.querySelectorAll("#menu > li");
        liMenu.forEach(li => {
            li.onclick = function() {
                toggleAndRender(li);
            }
        });

        // Event DIALOG CLOSE
        const btnTaskClose = document.querySelector("#btn-task-close");
        const btnProjectClose = document.querySelector("#btn-project-close");
        dialogAddTask = document.querySelector("#dialog-add-task");
        dialogAddProject = document.querySelector("#dialog-add-project");
        const formTask = document.querySelector("#form-add-task");
        const formProject = document.querySelector("#form-add-project");

        btnTaskClose.onclick = function() {
            dialogAddTask.close();
            formTask.reset();
        }

        btnProjectClose.onclick = function() {
            dialogAddProject.close();
            formProject.reset();
        }

        // Event TASK ADD
        const btnAddTaskConfirm = document.querySelector("#btn-task-add");
        const inputDesc = document.querySelector("#description");
        const inputDueDate = document.querySelector("#due-date");
        const selectPriority = document.querySelector("#priority");

        btnAddTaskConfirm.onclick = function(e) {
            if (inputDesc.value === "" || inputDueDate.value === "") return;
            e.preventDefault();
            user.addTask(inputDesc.value, inputDueDate.value, selectPriority.value, btnId);
            refresh(dialogAddTask, formTask);
        }

        // Event PROJECT ADD
        const btnAddProjectConfirm = document.querySelector("#btn-project-add");
        const inputTitle = document.querySelector("#title");

        btnAddProjectConfirm.onclick = function(e) {
            if (inputTitle.value === "") return;
            e.preventDefault();
            user.addProject(inputTitle.value);
            refresh(dialogAddProject, formProject);
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

    function toggleAndRender(el) {
        toggleClass(el, "active");
        renderAndRefreshListener();
    }

    function toggleClass(target, className) {
        if (liActive !== null) liActive.classList.remove(className);
        target.classList.add(className);
        liActive = target;
    }

    function refresh(dialog, form) {
        dialog.close();
        form.reset();
        profile = user.refresh();
        renderAndRefreshListener();
    }

    function renderAndRefreshListener() {
        main.render(liActive.textContent, profile);
        refreshAddTaskListener();
        refreshAddProjectListener();
        refreshDeleteTaskListener();
        refreshStatusListener();
    }

    function refreshAddTaskListener() {
        const btnAddTasks = document.querySelectorAll(".add-task");
        btnAddTasks.forEach(btn => {
            btn.onclick = function() {
                dialogAddTask.showModal();
                btnId = btn.id;
            }
        });
    }

    function refreshAddProjectListener() {
        const btnAddProject = document.querySelector("#add-project");
        if (btnAddProject !== null) {
            btnAddProject.onclick = function() {
                dialogAddProject.showModal();
            }
        }
    }

    function refreshDeleteTaskListener() {
        const btnDeleteTasks = document.querySelectorAll(".delete-task");
        btnDeleteTasks.forEach(btn => {
            btn.onclick = function() {
                user.deleteTask(btn.id);
                profile = user.refresh();
                renderAndRefreshListener();
            }
        });
    }

    function refreshStatusListener() {
        const checkBoxesStatus = document.querySelectorAll(".status");
        checkBoxesStatus.forEach(box => {
            box.onclick = function() {
                user.setTaskStatus(box.id, box.checked);
                profile = user.refresh();
                renderAndRefreshListener();
            }
        });
    }

    return { init }
})()

page.init();

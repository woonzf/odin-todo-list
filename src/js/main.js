import { createButton, createEmptyDivClass, createEmptyDivId, createImg, 
    createInputWithLabel, createSelectWithLabel, createText } from './function';

import iconOption from '../img/dots-horizontal-custom.png';

const main = (() => {
    let title = null;
    let mainContent = null;
    const priority = ["Low", "Medium", "High"];

    function init() {
        title = createEmptyDivId("title");
        mainContent = createEmptyDivId("main-content");
        const dialogAddTask = createDialogAddTask();
        const div = createEmptyDivId("main");
        div.append(title, mainContent, dialogAddTask);
        return div;
    }

    function createDialogAddTask() {
        const inputDesc = createInputWithLabel("Description", "text", "first");
        const inputDueDate = createInputWithLabel("Due Date", "date");
        const inputPriority = createSelectWithLabel("Priority", priority);
        const btnAdd = createButton("Add", "btn-task-add");
        btnAdd.type = "submit";
        
        const form = document.createElement("form");
        form.method = "dialog";
        form.id = "form-add-task";
        form.append(inputDesc, inputDueDate, inputPriority, btnAdd);
        
        const text = createText("Add a Task");
        const btnClose = createButton("X", "btn-task-close");
        const closeWrapper = createEmptyDivId("close-wrapper");
        closeWrapper.append(text, btnClose);

        const dialog = document.createElement("dialog");
        dialog.id = "dialog-add-task";
        dialog.append(closeWrapper, form);
        return dialog;
    }

    function render(category, profile) {
        title.textContent = category;
        mainContent.clear();
        const info = getInfo(category, profile);
        for (const item of info) mainContent.append(item);
    }

    Object.prototype.clear = function() {
        while (this.children.length > 0) this.removeChild(this.lastChild);
    }

    function getInfo(category, profile) {
        switch(category) {
            case "Today":
                return [createText("</>")];
            case "Upcoming":
                return [createText("</>")];
            case "My Projects":
                return getProjects(profile);
        }
    }

    function getProjects(profile) {
        let list = [];
        for (const project of profile.projects) {
            const divProject = createProject(project.title);
            const divTasks = createEmptyDivClass("project-task");
            if (project.tasks.length === 0) divTasks.append(createText("No task found."));
            else for (const task of project.tasks) divTasks.append(createTask(task));
            divProject.append(divTasks, createAddTask(project.id));
            list.push(divProject);
        }
        return list;
    }

    function createProject(title) {
        const divTitle = createEmptyDivClass("project-title");
        divTitle.textContent = title;
        const divider = createEmptyDivClass("divider");
        const div = createEmptyDivClass("project");
        div.append(divTitle, divider);
        return div;
    }

    function createTask(task) {
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked = task.status;

        // days left

        const desc = createEmptyDivClass("desc");
        desc.textContent = task.description;
        
        const divInfo = createEmptyDivClass("task-info");
        divInfo.append(checkBox, desc);
        
        const dueDate = createEmptyDivClass("due-date");
        dueDate.textContent = "Due: " + task.dueDate;
        
        const signOption = createImg(iconOption, "Option Icon");
        const btnOption = createButton(signOption, `ot-${task.id}`);
        btnOption.classList.add("option");

        const divEnd = createEmptyDivClass("task-end");
        divEnd.append(dueDate, btnOption);

        const divTask = createEmptyDivClass("task");
        divTask.append(divInfo, divEnd);
        divTask.classList.add(getPriorityClass(task.priority));
        divTask.id = `t-${task.id}`;
        return divTask;
    }

    function getPriorityClass(priority) {
        return priority.toLowerCase();
    }

    function createAddTask(id) {
        const button = createButton("+ Add Task", `p-${id}`);
        button.classList.add ("add-task");
        const div = createEmptyDivClass("add-task-wrapper");
        div.append(button);
        return div;
    }

    return { init, render }
})()

export { main }

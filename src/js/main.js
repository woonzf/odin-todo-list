import { createButtonId, createEmptyDivClass, createEmptyDivId, createImg, 
    createInputWithLabel, createSelectWithLabel, createText, displayDaysLeft, 
    getDaysLeft } from './function';

import iconDelete from '../img/delete-outline-custom.png';
import iconDeleteHover from '../img/delete-empty-outline-custom.png';

const main = (() => {
    let title = null;
    let mainContent = null;
    const priority = ["Low", "Medium", "High"];

    function init() {
        title = createEmptyDivClass("title");
        mainContent = createEmptyDivId("main-content");
        const dialogAddTask = createDialogAddTask();
        const dialogAddProject = createDialogAddProject();
        const div = createEmptyDivId("main");
        div.append(title, mainContent, dialogAddTask, dialogAddProject);
        return div;
    }

    function createDialogAddTask() {
        const inputDesc = createInputWithLabel("Description", "text", "first");
        const inputDueDate = createInputWithLabel("Due Date", "date");
        const inputPriority = createSelectWithLabel("Priority", priority);
        const btnAdd = createButtonId("Add", "btn-task-add");
        btnAdd.type = "submit";
        
        const form = document.createElement("form");
        form.method = "dialog";
        form.id = "form-add-task";
        form.append(inputDesc, inputDueDate, inputPriority, btnAdd);
        
        const text = createText("New Task");
        const btnClose = createButtonId("X", "btn-task-close");
        const closeWrapper = createEmptyDivClass("close-wrapper");
        closeWrapper.append(text, btnClose);

        const dialog = document.createElement("dialog");
        dialog.id = "dialog-add-task";
        dialog.append(closeWrapper, form);
        return dialog;
    }

    function createDialogAddProject() {
        const inputTitle = createInputWithLabel("Title", "text", "first");
        const btnAdd = createButtonId("Add", "btn-project-add");
        btnAdd.type = "submit";
        
        const form = document.createElement("form");
        form.method = "dialog";
        form.id = "form-add-project";
        form.append(inputTitle, btnAdd);
        
        const text = createText("New Project");
        const btnClose = createButtonId("X", "btn-project-close");
        const closeWrapper = createEmptyDivClass("close-wrapper");
        closeWrapper.append(text, btnClose);

        const dialog = document.createElement("dialog");
        dialog.id = "dialog-add-project";
        dialog.append(closeWrapper, form);
        return dialog;
    }

    function render(category, profile) {
        title.textContent = category;
        clear(mainContent);
        const info = getInfo(category, profile);
        for (const item of info) mainContent.append(item);
        if (category === "My Projects") mainContent.append(createAddProject());
    }

    function clear(el) {
        while (el.children.length > 0) el.removeChild(el.lastChild);
    }

    function getInfo(category, profile) {
        switch(category) {
            case "Today":
                return getTasksAll("today", profile);
            case "Upcoming":
                return getTasksAll("upcoming", profile);
            case "My Projects":
                return getProjectsAll(profile);
        }
    }

    function getTasksAll(type, profile) {
        const div = createEmptyDivClass("project");
        for (const project of profile.projects) {
            for (const task of project.tasks) {
                switch(type) {
                    case "today":
                        if (getDaysLeft(task.dueDate) === 0) div.append(createTask(task, project.title));
                        break;
                    case "upcoming":
                        if (getDaysLeft(task.dueDate) > 0) div.append(createTask(task, project.title));
                        break;
                    default:
                        break;
                }
            }
        }
        if (div.children.length === 0) {
            switch(type) {
                case "today":
                    div.textContent = "No task today!";
                    break;
                case "upcoming":
                    div.textContent = "No upcoming task!";
                    break;
                default:
                    break;
            }
        }
        return [div];
    }

    function getProjectsAll(profile) {
        let list = [];
        for (const project of profile.projects) {
            const divProject = createProject(project.title, project.id);
            const divTasks = createEmptyDivClass("project-task");
            if (project.tasks.length === 0) divTasks.append(createText("No task found."));
            else for (const task of project.tasks) divTasks.append(createTask(task, null));
            divProject.append(divTasks, createAddTask(project.id));
            list.push(divProject);
        }
        return list;
    }

    function createProject(titleName, id) {
        const title = createText(titleName);
        const btnDelete = createDeleteButton(`p-${id}`, "delete-project");
        const divTitle = createEmptyDivClass("project-title");
        divTitle.append(title, btnDelete);

        const divider = createEmptyDivClass("divider");
        const div = createEmptyDivClass("project");
        div.append(divTitle, divider);
        return div;
    }

    function createTask(task, title) {
        // Status
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.name = "status";
        checkBox.classList.add("status");
        checkBox.id = `s-${task.projectId}-${task.id}`;
        checkBox.checked = task.status;

        // Description
        const desc = createEmptyDivClass("desc");
        desc.textContent = task.description;
        
        // Info
        const divInfo = createEmptyDivClass("task-info");
        divInfo.append(checkBox, desc);
        
        // Delete
        const btnDelete = createDeleteButton(`t-${task.projectId}-${task.id}`, "delete-task");

        // End
        const divEnd = createEmptyDivClass("task-end");

        if (title === null) {
            // Days Left
            const daysLeft = createEmptyDivClass("days-left");
            const intDaysLeft = getDaysLeft(task.dueDate);
            daysLeft.textContent = displayDaysLeft(intDaysLeft);

            // Due date
            const dueDate = createEmptyDivClass("due-date");
            dueDate.textContent = "Due: " + task.dueDate;

            // Check for Status
            if (task.status === false) {
                if (intDaysLeft < 0) daysLeft.classList.add("overdue");
            } else {
                daysLeft.classList.add("hidden");
                dueDate.classList.add("hidden");
                desc.classList.add("cross");
                const div = createEmptyDivClass("done");
                div.textContent = "DONE";
                divInfo.append(div);
            }

            divEnd.append(daysLeft, dueDate, btnDelete);
        } else {
            const project = createEmptyDivClass("from");
            project.textContent = `~ ${title}`;

            // Check for Status
            if (task.status === true) {
                desc.classList.add("cross");
                const div = createEmptyDivClass("done");
                div.textContent = "DONE";
                divInfo.append(div);
            }

            divEnd.append(project, btnDelete);
        }

        // Task
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
        const button = createButtonId("+ Add Task", `tp-${id}`);
        button.classList.add("add-task");
        const div = createEmptyDivClass("add-task-wrapper");
        div.append(button);
        return div;
    }

    function createAddProject() {
        const button = createButtonId("+ Add Project", "add-project");
        const div = createEmptyDivClass("add-project-wrapper");
        div.append(button);
        return div;
    }

    function createDeleteButton(id, className) {
        const signDelete = createImg(iconDelete, "Delete Icon");
        const btnDelete = createButtonId(signDelete, id);
        btnDelete.classList.add(className);

        signDelete.onmouseover = function() { signDelete.src = iconDeleteHover; }
        signDelete.onmouseout = function() { signDelete.src = iconDelete; }

        return btnDelete;
    }

    return { init, render }
})()

export { main }

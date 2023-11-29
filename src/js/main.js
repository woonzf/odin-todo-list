import { createEmptyDivClass, createEmptyDivId, createInputWithLabel, 
    createSelectWithLabel, createText } from './function';

const main = (() => {
    let title = null;
    let display = null;
    const priority = ["Low", "Medium", "High"];

    function init() {
        title = createEmptyDivId("title");
        const mainContent = createEmptyDivId("main-content");
        display = createEmptyDivId("display");
        mainContent.append(display);
        const dialogAddTask = createDialogAddTask();

        const div = createEmptyDivId("main");
        div.append(title, mainContent, dialogAddTask);
        return div;
    }

    function createDialogAddTask() {
        const inputDesc = createInputWithLabel("Description", "text");
        const inputDueDate = createInputWithLabel("Due Date", "date");
        const inputPriority = createSelectWithLabel("Priority", priority);
        // close button
        // add button
        
        const form = document.createElement("form");
        form.method = "dialog";
        form.id = "add-task";
        form.append(inputDesc, inputDueDate, inputPriority);

        const dialog = document.createElement("dialog");
        dialog.id = "dialog-add-task";
        dialog.append(form);
        return dialog;
    }

    function render(text, profile) {
        title.textContent = text;
        display.clear();
        const info = getInfo(text, profile);
        for (const item of info) display.append(item);
    }

    Object.prototype.clear = function() {
        while (this.children.length > 0) this.removeChild(this.lastChild);
    }

    function getInfo(text, profile) {
        switch(text) {
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
        const desc = createEmptyDivClass("desc");
        desc.textContent = task.description;
        const divTask = createEmptyDivClass("task");
        divTask.append(desc);
        divTask.classList.add(getPriorityClass(task.priority));
        return divTask;
    }

    function getPriorityClass(priority) {
        return priority.toLowerCase();
    }

    function createAddTask(id) {
        const button = document.createElement("button");
        button.textContent = "+ Add Task";
        button.classList.add ("add-task");
        button.id = `p-${id}`;
        const div = createEmptyDivClass("add-task-wrapper");
        div.append(button);
        return div;
    }

    return { init, render }
})()

export { main }

import { createEmptyDivClass, createEmptyDivId, createText } from './function';

const main = (() => {
    let title = null;
    let display = null;

    function init() {
        title = createEmptyDivId("title");
        const mainContent = createEmptyDivId("main-content");
        display = createEmptyDivId("display");
        mainContent.append(display);

        const div = createEmptyDivId("main");
        div.append(title, mainContent);
        return div;
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
        return divTask;
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

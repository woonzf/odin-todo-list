function createText(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div;
}

function createImg(src, alt) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    return img;
}

function createEmptyDivId(text) {
    const div = document.createElement("div");
    div.id = text;
    return div;
}

function createEmptyDivClass(text) {
    const div = document.createElement("div");
    div.classList.add(text);
    return div;
}

class User {
    constructor(name) {
        this.name = name;
    }
    icon = {
        src: null,
        alt: null,
    };
    projects = [];
    addProject(project) {
        this.projects.push(project);
    }
}

class Project {
    constructor(title, list) {
        this.title = title;
        this.id = generateId(list);
    }
    tasks = [];
    addTask(task) {
        this.tasks.push(task);
    }

    // Optional
    notes;
    checklist;
}

class Task {
    constructor(description, dueDate, priority, list) {
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = generateId(list);
    }
    status = false;
}

function generateId(list) {
    if (list.length === 0) return 1;
    let idList = [];
    for (const item of list) idList.push(item.id);
    return Math.max(...idList) + 1;
}

function createInputWithLabel(text, type) {
    const label = createLabel(text);
    const input = document.createElement("input");
    input.type = type;
    input.id = text.toLowerCase();
    input.name = input.id;
    const div = createEmptyDivClass("input");
    div.append(label, input);
    return div;
}

function createSelectWithLabel(text, option) {
    const label = createLabel(text);
    const select = document.createElement("select");
    select.id = text.toLowerCase();
    select.name = select.id;
    for (const item of option) select.add(new Option(item, item.toLowerCase()), undefined);
    const div = createEmptyDivClass("select");
    div.append(label, select);
    return div;
}

function createLabel(text) {
    const label = document.createElement("label");
    label.textContent = text;
    label.htmlFor = text.toLowerCase();
    return label;
};

function getTodayDate() {
    const date = new Date();
    const monthList = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    
    const day = date.getDate();
    const month = monthList[date.getMonth()].toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

export { createText, createImg, createEmptyDivId, createEmptyDivClass, User, 
    Project, Task, createInputWithLabel, createSelectWithLabel }

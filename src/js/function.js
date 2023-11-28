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

class Project {
    constructor(title, id) {
        this.title = title;
        this.id = id;
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
    constructor(description, dueDate, priority, id) {
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = id;
    }
    status = false;
}

function generateId(list) {
    if (list.length === 0) return 1;
    let idList = [];
    for (const item of list) idList.push(item.id);
    return Math.max(...idList) + 1;
}

function getTodayDate() {
    const date = new Date();
    const monthList = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    
    const day = date.getDate();
    const month = monthList[date.getMonth()].toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

export { createText, createImg, createEmptyDivId, createEmptyDivClass, Project,
    Task, generateId }

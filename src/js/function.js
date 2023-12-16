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

function createInputWithLabel(text, type, ...arg) {
    const label = createLabel(text);
    const input = document.createElement("input");
    input.type = type;
    input.id = createInputId(text);
    input.name = input.id;
    input.required = true;
    if ([...arg][0] === "first") input.autofocus = "on";
    const div = createEmptyDivClass("input");
    div.append(label, input);
    return div;
}

function createSelectWithLabel(text, option) {
    const label = createLabel(text);
    const select = document.createElement("select");
    select.id = text.toLowerCase();
    select.name = select.id;
    select.required = true;
    for (const item of option) select.add(new Option(item, item.toLowerCase()), undefined);
    const div = createEmptyDivClass("select");
    div.append(label, select);
    return div;
}

function createLabel(text) {
    const label = document.createElement("label");
    label.textContent = text;
    label.htmlFor = createInputId(text);
    return label;
};

function createButtonId(text, id) {
    const btn = document.createElement("button");
    btn.append(text);
    btn.id = id;
    return btn;
}

function createInputId(text) {
    let id = "";
    if (text.split(" ").length > 1) id = text.toLowerCase().split(" ").join("-");
    else id = text.toLowerCase();
    return id;
}

function getDaysLeft(due) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const dueArr = due.split("-");
    const todayArr = getTodayArr().split("-");
    const dueDate = new Date(dueArr[0], dueArr[1], dueArr[2]);
    const today = new Date(todayArr[0], todayArr[1], todayArr[2]);
    return Math.round((dueDate - today) / oneDay);
    // Source: https://stackoverflow.com/questions/2627473/how-to-calculate-the-number-of-days-between-two-dates
}

function displayDaysLeft(i) {
    if (i >= 0) {
        if (i > 1) return `${i} days left`;
        return `${i} day left`;
    } else {
        const iAbs = Math.abs(i);
        if (i === -1) return `${iAbs} day overdue`;
        return `${iAbs} days overdue`;
    }
}

function getTodayArr() {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `${year}-${month}-${date}`;
}

export { createText, createImg, createEmptyDivId, createEmptyDivClass, 
    createInputWithLabel, createSelectWithLabel, createButtonId, getDaysLeft, 
    displayDaysLeft }

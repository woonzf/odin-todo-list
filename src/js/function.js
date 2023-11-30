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

function createButton(text, id) {
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

function getTodayDate() {
    const date = new Date();
    const monthList = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    
    const day = date.getDate();
    const month = monthList[date.getMonth()].toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

export { createText, createImg, createEmptyDivId, createEmptyDivClass, 
    createInputWithLabel, createSelectWithLabel, createButton }

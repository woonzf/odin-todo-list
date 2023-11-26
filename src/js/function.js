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

function getTodayDate() {
    const date = new Date();
    const monthList = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    
    const day = date.getDate();
    const month = monthList[date.getMonth()].toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

export { createText, createImg, createEmptyDivId }

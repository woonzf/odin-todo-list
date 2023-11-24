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

function createDivAndAppend(...content) {
    const div = document.createElement("div");
    for (const item of [...content]) div.append(item);
    return div;
}

export { createText, createImg, createDivAndAppend }

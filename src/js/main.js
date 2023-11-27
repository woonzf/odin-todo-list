import { createEmptyDivId, createText } from './function';

const main = (() => {
    let title = null;
    let mainContent = null;

    function init() {
        title = createEmptyDivId("title");
        const divider = createEmptyDivClass("divider");
        mainContent = createEmptyDivId("main-content");

        const div = createEmptyDivId("main");
        div.append(title, divider, mainContent);
        return div;
    }

    function createAddProject() {
        const div = createText("+ Add Project");
    }

    function render(text, list) {
        title.textContent = text;
        mainContent.clear();
        mainContent.append(createText(list));
    }

    Object.prototype.clear = function() {
        while (this.children.length > 0) this.removeChild(this.lastChild);
    }

    function createEmptyDivClass(text) {
        const div = document.createElement("div");
        div.classList.add(text);
        return div;
    }

    return { init, render }
})()

export { main }

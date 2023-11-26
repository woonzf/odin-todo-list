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

    function render(text) {
        title.textContent = text;
        mainContent.clear();
        mainContent.append(createText(text + "'s items"));
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

import { createText } from "./function";

const main = (() => {
    function init() {
        const div = createText("MAIN");
        div.id = "main";
        return div;
    }

    return { init }
})()

export { main }

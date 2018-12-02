"use strict";
class ProjectObject {
    constructor() { }
    helloWorld() {
        const element = document.createElement('h1');
        let text = document.createTextNode('Hello, World!');
        element.appendChild(text);
        document.body.appendChild(element);
    }
}
Window.prototype.project = (() => {
    return new ProjectObject();
})();
window.onload = () => {
    window.project.helloWorld();
};

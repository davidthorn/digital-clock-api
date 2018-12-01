"use strict";
exports.__esModule = true;
var ProjectObject = /** @class */ (function () {
    function ProjectObject() {
        this.message = 'Hello, World!';
    }
    ProjectObject.prototype.helloWorld = function () {
        var element = document.createElement('h1');
        var text = document.createTextNode(this.message);
        element.appendChild(text);
        document.body.appendChild(element);
    };
    return ProjectObject;
}());
exports.ProjectObject = ProjectObject;

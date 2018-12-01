"use strict";
exports.__esModule = true;
var tester_framework_1 = require("../tester.framework");
var assert = require("assert");
var main_1 = require("../src/main");
tester_framework_1.describe("Project Object", function () {
    var project = new main_1.ProjectObject();
    tester_framework_1.it('message should output', function () {
        assert.strictEqual(project.message, 'Hi there', "should equal Hello world but equals " + project.message);
    });
});

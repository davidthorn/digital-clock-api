"use strict";
exports.__esModule = true;
var itCallbacks = [];
exports.it = function (testDescription, testScript) {
    var contains = itCallbacks.filter(function (i, index, items) {
        if (i.description === testDescription) {
            return items[index];
        }
    }).length === 1;
    if (contains) {
        throw new Error("Test with description [" + testDescription + "] already exists");
    }
    var testError = undefined;
    try {
        testScript();
    }
    catch (error) {
        testError = error;
        console.log("Failed: " + testDescription + " " + error.message);
        console.log('==========================================');
    }
    itCallbacks.push({
        test: testScript,
        description: testDescription,
        passed: testError === undefined,
        error: testError
    });
};
exports.describe = function (moduleTestDescription, testScript) {
    console.log("TEST:");
    console.log(moduleTestDescription);
    testScript();
    var failed = itCallbacks.filter(function (i) {
        if (!i.passed)
            return i;
    }).length;
    var passed = itCallbacks.filter(function (i) {
        if (i.passed)
            return i;
    }).length;
    console.log("Totals tests " + itCallbacks.length + ",  passed: " + passed + " , failed: " + failed);
};

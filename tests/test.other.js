"use strict";
exports.__esModule = true;
var tester_framework_1 = require("../tester.framework");
var assert = require("assert");
tester_framework_1.describe("Testing other works too", function () {
    tester_framework_1.it('multiplying 5 by 5', function () {
        assert.strictEqual(5 * 5, 25, 'should equal 25');
    });
    tester_framework_1.it('multiplying 2 by 2', function () {
        assert.strictEqual(2 * 2, 4, 'should equal 4');
    });
    tester_framework_1.it('multiplying 3 by 3', function () {
        assert.strictEqual(3 * 3, 9, 'should equal 9');
    });
    tester_framework_1.it('multiplying 4 by 4', function () {
        assert.strictEqual(4 * 4, 16, 'should equal 16');
    });
    tester_framework_1.it('multiplying 6 by 6', function () {
        assert.strictEqual(6 * 6, 36, 'should equal 36');
    });
});

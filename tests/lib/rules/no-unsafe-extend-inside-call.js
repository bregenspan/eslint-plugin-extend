/**
 * @fileoverview Test for rule to flag potentially unsafe use of _.extend() or $.extend()
 * @author Ben Regenspan <https://github.com/bregenspan>
 */
"use strict";

var linter = require("eslint").linter,
    ESLintTester = require("eslint-tester");

var eslintTester = new ESLintTester(linter);

eslintTester.addRuleTest("lib/rules/no-unsafe-extend-inside-call", {

    valid: [
        {
            code: "var objectC = _.extend(objectA, objectB)",
            args: [2, { "libraryNames": ["_"] } ]
        },
        {
            code: "_.extend(object1, object2)",
            args: [2, { "libraryNames": ["_"] } ]
        },
        {
            code: "doSomethingWithoutASideEffect(_.extend({}, object1, object2))",
            args: [2, { "libraryNames": ["_"] } ]
        },

        // Issue #1
        {
            code: "doSomethingWithoutASideEffect(function () { _.extend(object1, object2); })",
            args: [2, { "libraryNames": ["_"] } ]
        }
    ],

    invalid: [
        {
            code: "doSomethingWithASideEffect(_.extend(objectA, objectB))",
            args: [2, { "libraryNames": ["_"] } ],
            errors: [{
                message: "Unsafe use of '_.extend' within a function call."
            }]
        }
    ]
});

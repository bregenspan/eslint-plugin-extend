/**
 * @fileoverview Test for rule to flag potentially unsafe use of _.extend() or $.extend()
 * @author Ben Regenspan <https://github.com/bregenspan>
 */
"use strict";

var linter = require("eslint").linter,
    ESLintTester = require("eslint-tester");

var eslintTester = new ESLintTester(linter);

eslintTester.addRuleTest("lib/rules/no-unsafe-extend-inside-assignment", {

    valid: [
        {
            code: "_.extend(object1, object2)",
            args: [2, { "libraryNames": ["_"] } ]
        },
        {
            code: "foo(_.extend(object1, object2))",
            args: [2, { "libraryNames": ["_"] } ]
        },
        {
            code: "var objectC = _.extend({}, objectA, objectB)",
            args: [2, { "libraryNames": ["_"] } ]
        }
    ],

    invalid: [
        {
            code: "var objectC = _.extend(objectA, objectB)",
            args: [2, { "libraryNames": ["_"] } ],
            errors: [{
                message: "Unsafe use of '_.extend' within an assignment or variable declaration."
            }]
        }
    ]
});

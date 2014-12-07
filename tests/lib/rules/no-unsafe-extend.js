/**
 * @fileoverview Rule to flag potentially unsafe use of _.extend() or $.extend()
 * @author Ben Regenspan <https://github.com/bregenspan>
 */
"use strict";

var linter = require("eslint").linter,
    ESLintTester = require("eslint-tester");

var eslintTester = new ESLintTester(linter);

eslintTester.addRuleTest("lib/rules/no-unsafe-extend", {

    valid: [
        {
            code: "_.extend(object1, object2)",
            args: [2, { "objects": ["_"] } ]
        },
        {
            code: "$.extend(object1, object2)",
            args: [2, { "objects": ["$"] } ]
        },
        {
            code: "foo(_.extend({}, object1, object2))",
            args: [2, { "objects": ["_"] } ]
        }
    ],

    invalid: [
        {
            code: "foo(_.extend(object1, object2))",
            args: [2, { "objects": ["_"] } ],
            errors: [{
                message: "Unsafe use of '_.extend'"
            }]
        }
    ]
});

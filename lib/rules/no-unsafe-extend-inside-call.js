/**
 * @fileoverview Rule to flag unsafe use of _.extend() or $.extend() within a function call.
 * @author Ben Regenspan <https://github.com/bregenspan>
 */
"use strict";

module.exports = function(context) {

    var util = require("../util");
    var configuration = context.options[0],
        libraryNames = configuration.libraryNames || util.DEFAULT_LIBRARY_NAMES;

    return {
        "CallExpression": function(node) {
            if (util.isUnsafeExtendCall(node, libraryNames) && util.descendsFrom(context, "CallExpression")) {
                context.report(node, "Unsafe use of '{{object}}.{{property}}' within a function call.", {
                    object: node.callee.object.name, property: node.callee.property.name
                });
            }
        }
    };

};

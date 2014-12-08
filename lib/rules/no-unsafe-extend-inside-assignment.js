/**
 * @fileoverview Rule to flag unsafe use of _.extend() or $.extend() within an assignment statement or variable declaration.
 * @author Ben Regenspan <https://github.com/bregenspan>
 */
"use strict";

module.exports = function(context) {

    var util = require("../util");
    var configuration = context.options[0],
        libraryNames = configuration.libraryNames || util.DEFAULT_LIBRARY_NAMES;

    return {
        "CallExpression": function(node) {
            if (util.isUnsafeExtendCall(node, libraryNames) &&
                util.descendsFrom(context, ["AssignmentExpression", "VariableDeclaration"])) {
                    context.report(node, "Unsafe use of '{{object}}.{{property}}' within an assignment or variable declaration.", {
                        object: node.callee.object.name, property: node.callee.property.name
                    });
            }
        }
    };

};

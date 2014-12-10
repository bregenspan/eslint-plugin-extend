/**
 * @fileoverview Rule to flag unsafe use of _.extend() or $.extend() within an assignment statement or variable declaration.
 * @author Ben Regenspan <https://github.com/bregenspan>
 */
"use strict";

module.exports = function(context) {

    var util = require("../util");
    var configuration = context.options[0],
        libraryNames = configuration.libraryNames || util.DEFAULT_LIBRARY_NAMES;

    // If any of these are the more immediate parents, extend call should be treated as unsafe
    // (The call is passed directly to an assignment or variable declaration).
    var badParents = ["AssignmentExpression", "VariableDeclaration"];

    // But if the closest parent is a block or a call, consider the usage safe.
    // (The call is within a block or another call, not direct right-hand side of an assignment
    var goodParents = ["BlockStatement", "CallExpression"];

    return {
        "CallExpression": function(node) {
            if (!util.isExtendCallWithSideEffects(node, libraryNames)) {
                return;
            }
            var closestRelevantParent = util.closestParentOfType(context, badParents.concat(goodParents));
            if (badParents.indexOf(closestRelevantParent.type) > -1) {
                context.report(node, "Unsafe use of '{{object}}.{{property}}' within an assignment or variable declaration.", {
                    object: node.callee.object.name, property: node.callee.property.name
                });
            }
        }
    };

};

/**
 * @fileoverview Rule to flag unsafe use of _.extend() or $.extend() within a function call.
 * @author Ben Regenspan <https://github.com/bregenspan>
 */
"use strict";

module.exports = function(context) {

    var util = require("../util");
    var configuration = context.options[0],
        libraryNames = configuration.libraryNames || util.DEFAULT_LIBRARY_NAMES;

    // If a call expression is the most immediate parent, extend call should be treated as unsafe
    // (The call is within the arguments being passed to a function).
    var badParents = ["CallExpression"];

    // But if the closer parent is a block, consider the usage safe.
    // (The call is within a block, not an argument to a function).
    var goodParents = ["BlockStatement"];

    return {
        "CallExpression": function(node) {
            if (!util.isExtendCallWithSideEffects(node, libraryNames)) {
                return;
            }
            var closestRelevantParent = util.closestParentOfType(context, badParents.concat(goodParents));
            if (badParents.indexOf(closestRelevantParent.type) > -1) {
                context.report(node, "Unsafe use of '{{object}}.{{property}}' within a function call.", {
                    object: node.callee.object.name, property: node.callee.property.name
                });
            }
        }
    };

};

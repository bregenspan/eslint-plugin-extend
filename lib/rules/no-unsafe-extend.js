/**
 * @fileoverview Rule to flag potentially unsafe use of _.extend() or $.extend()
 * @author Ben Regenspan <https://github.com/bregenspan>
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var configuration = context.options[0],
        watchObjects = configuration.objects || ["$", "_", "jQuery"];

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    function isDescendentOfCallExpression() {
        var ancestors = context.getAncestors(),
            ancestor = ancestors.pop();
        while (ancestor) {
            if (ancestor.type === "CallExpression") {
                return true;
            }
            ancestor = ancestors.pop();
        }
        return false;
    }

    function firstArgumentIsIdentifier(node) {
        return node.arguments.length && node.arguments[0].type === "Identifier";
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function(node) {
            var objectName, propertyName;
            if (node.callee.type === "MemberExpression") {
                objectName = node.callee.object.name;
                propertyName = node.callee.property.name;
                if (propertyName === "extend" && watchObjects.indexOf(objectName) > -1) {
                    if (isDescendentOfCallExpression() && firstArgumentIsIdentifier(node)) {
                        context.report(node, "Unsafe use of '{{object}}.{{property}}'", {
                            object: objectName, property: propertyName
                        });
                    }
                }
            }
        }
    };

};

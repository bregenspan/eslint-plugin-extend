/**
 * @fileoverview Common utilities.
 */
"use strict";


// Private helpers

function firstArgumentIsIdentifier(node) {
    return node.arguments.length && node.arguments[0].type === "Identifier";
}


// Public API

/**
 * The default names of library objects whose extend() functions we should apply rules to.
 */
exports.DEFAULT_LIBRARY_NAMES = ["$", "_", "jQuery"];

/**
 * Checks whether an ancestor of the current context descends from
 * a node of one of the specified types.
 * @param {RuleContext} context the current context of the rule
 * @param {string|string[]} nodeTypes types of the ancestor nodes to check for
 * @returns {boolean} true if `context` has an ancestor matching any of the specified `nodeTypes`
 */
exports.descendsFrom = function(context, nodeTypes) {
    nodeTypes = Array.isArray(nodeTypes) ? nodeTypes : [nodeTypes];

    var ancestors = context.getAncestors(),
        ancestor = ancestors.pop();

    while (ancestor) {
        if (nodeTypes.indexOf(ancestor.type) > -1) {
            return true;
        }
        ancestor = ancestors.pop();
    }
    return false;
};

/**
 * Checks whether the given call expression consists of an "unsafe" call to an `extend()`
 * function, where "unsafe" means that the call appears to mutate an existing object identified
 * in the first argument to `extend()`.
 * @param {Node} node Esprima node of the CallExpression
 * @param {string[]} libraryNames Names of library objects containing extend() functions
 * @returns {boolean} True if `node` is an unsafe call to an extend function
 */
exports.isUnsafeExtendCall = function(node, libraryNames) {
    var objectName, propertyName;
    if (node.callee.type === "MemberExpression") {
        objectName = node.callee.object.name;
        propertyName = node.callee.property.name;
        if (propertyName === "extend" && libraryNames.indexOf(objectName) > -1) {
            return firstArgumentIsIdentifier(node);
        }
    }
    return false;
};

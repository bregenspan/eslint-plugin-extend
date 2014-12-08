"use strict";

module.exports = {
    rules: {
        "no-unsafe-extend-inside-assignment": require("./lib/rules/no-unsafe-extend-inside-assignment"),
        "no-unsafe-extend-inside-call": require("./lib/rules/no-unsafe-extend-inside-call")
    }
};

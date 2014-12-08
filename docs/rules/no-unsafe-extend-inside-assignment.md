# Rule to flag unsafe use of `extend()` functions within assignment expressions or variable declarations (no-unsafe-extend-inside-assignment)

## Why use it?

See [the README](../../README.md).

## Rule Details

This rule disallows usage of `extend()` functions in cases that meet all of the following criteria:

 * The first argument to the `extend()` function is an identifier (rather than, e.g., an object literal).
 * The use happens as part of an assignment expression OR a variable declaration, e.g. `var objectC = _.extend(objectA, objectB)`.

This is an example configuration which enables the rule and looks for unsafe uses of _.extend(), jQuery.extend(), and _.extend():
```js
...
"extend/no-unsafe-extend-inside-assignment": [2, { "libraryNames": ["_", "jQuery", "$"] }]
...
```

The following patterns are considered warnings:

```js

// Cases where first argument is an identifier whose object will get mutated
var objectC = _.extend(objectA, objectB);
objectC = _.extend(objectA, objectB);
```

The following patterns are not warnings:

```js

// Cases where an object literal, rather than an identifier, is the first argument to `extend()`
var objectC = _.extend({}, objectA, objectB);
var objectC = _.extend({"itDoesntHaveToBeEmpty": true}, objectA, objectB);
```

### Options

The (optional) `libraryNames` option specifies the names of objects on which `extend()` calls should be subjected to the rule, and defaults to the following, which ensures that the rule will be applied to `_.extend(...)`, `$.extend(...)`, and `jQuery.extend(...)`:

```js
["_", "$", "jQuery"]
```


## When Not To Use It

If you really like to use the following verbose syntax for copying properties of `objectB` to `objectA`, you won't want to use this rule:

```js
var objectA = _.extend(objectA, objectB);
```

With the rule in place, you'd need to rewrite that to either:
```js
_.extend(objectA, objectB);
```

Or:
```js
var objectA = _.extend({}, objectA, objectB);
```



## Further Reading

* http://api.jquery.com/jquery.extend/

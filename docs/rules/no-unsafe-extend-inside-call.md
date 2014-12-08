# Rule to flag unsafe use of `extend()` functions within function calls (no-unsafe-extend-inside-call)

## Why use it?

See [the README](../../README.md).

## Rule Details

This rule disallows usage of `extend()` functions in cases that meet all of the following criteria:

 * The first argument to the `extend()` function is an identifier (rather than, e.g., an object literal).
 * The use happens within a call expression, e.g. `someCallWithSideEffects(_.extend(objectA, objectB))`.

This is an example configuration which enables the rule and looks for unsafe uses of _.extend(), jQuery.extend(), and _.extend():
```js
...
"extend/no-unsafe-extend-inside-call": [2, { "libraryNames": ["_", "jQuery", "$"] }]
...
```

The following patterns are considered warnings:

```js

aFunction(_.extend(anObject, anotherObject));
```

The following patterns are not warnings:

```js

// Cases where the side effect of modifying `anObject` is likely to be intentional
_.extend(anObject, anotherObject);

// Cases where an object literal, rather than an identifier, is the first argument to `extend()`
aFunction(_.extend({}, anObject, anotherObject));
```

### Options

The (optional) `libraryNames` option specifies the names of objects on which `extend()` calls should be subjected to the rule, and defaults to the following, which ensures that the rule will be applied to `_.extend(...)`, `$.extend(...)`, and `jQuery.extend(...)`:

```js
["_", "$", "jQuery"]
```


## When Not To Use It

It is likely that anything caught by this rule is a genuine mistake in your code that is worth cleaning up.


## Further Reading

* http://api.jquery.com/jquery.extend/

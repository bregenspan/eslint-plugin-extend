# Rule to flag potentially unsafe use of `_.extend()` functions supplied by third-party libraries (no-unsafe-extend)

The Underscore library's <a href="http://underscorejs.org/#extend">`_.extend()`</a> function and jQuery's <a href="http://api.jquery.com/jQuery.extend/">`$.extend()`</a> are both used to copy properties of one or more source objects to a specified destination object; they also return the destination object.

Both `extend()` implementations modify the specified destination object. Consider the following statement:

```js
var newObject = _.extend(objectA, objectB);
```

In this case, the properties of `objectB` are copied into `objectA`. `newObject` is simply a reference to `objectA`; both `newObject` and `objectA` point to the same, modified, object.

It is often the desire of the developer to create a whole new object into which the properties of source objects are copied. To do so, it is necessary to pass an object literal as the first argument to `extend()`:

```js
var newObject = _.extend({}, objectA, objectB);
```

Here, `newObject` now points to a third object: the object literal that we passed in, extended with the properties of `objectA` and `objectB`. And `objectA` is unmolested.

Forgetting to pass in an object literal as the first argument is a common mistake that leads to undesired side effects. Consider the following statement from a dinosaur genome management application built on a fictional MVC framework:

```js
var DinosaurCapableOfReproduction = ModelFactory(_.extend(Dinosaur, {
    fillGapsWithIffyFrogDNASequence: true
}));
```

Here, the goal was clearly to create a subset of Dinosaur with the specified `fillGapsWithIffyFrogDNASequence` property defined on it, but we inadvertently modified the Dinosaur itself and are in for a nasty surprise.


## Rule Details

This rule aims to make it harder to use _.extend() and $.extend() in contexts that trigger unexpected side effects, by disallowing usage that meets all of the following criteria:

 * The use happens inside of a function call, e.g. `Foo(_.extend(options, defaults))`.
 * The first argument to the `extend()` function is an identifier (rather than, e.g., an object literal).

This is an example configuration which enables the rule and looks for unsafe uses of _.extend(), jQuery.extend(), and _.extend():
```js
...
"no-unsafe-extend": [2, { "objects": ["_", "jQuery", "$"] }]
...
```

The following patterns are considered warnings:

```js

aFunction(_.extend(anObject, anotherObject));

aFunction($.extend(anObject, anotherObject));
```

The following patterns are not warnings:

```js

// Cases where the side effect of modifying `anObject` is likely to be intentional
_.extend(anObject, anotherObject);

var anotherNameForSameObject = _.extend(anObject, anotherObject); 


// Cases where an object literal, rather than an identifier, is the first argument to `extend()`
aFunction(_.extend({}, anObject, anotherObject));

aFunction($.extend({}, anObject, anotherObject));

aFunction(_.extend({"itDoesntHaveToBeEmpty": true}, anObject, anotherObject));
```

### Options

The (optional) `objects` option specifies the names of objects on which `extend()` calls should be subjected to the rule, and defaults to the following, which ensures that the rule will be applied to `_.extend(...)`, `$.extend(...)`, and `jQuery.extend(...)`:

```js
["_", "$", "jQuery"]
```

## When Not To Use It

The default behavior of this rule is quite conservative and is unlikely to impact cases in which a clear error is not present in the code.

## Further Reading

* http://api.jquery.com/jquery.extend/

[![Build Status](https://travis-ci.org/bregenspan/eslint-plugin-extend.svg)](https://travis-ci.org/bregenspan/eslint-plugin-extend)

# eslint-plugin-extend

ESLint rules for enforcing safe use of Underscore's [_.extend()](http://underscorejs.org/#extend), jQuery's [$.extend()](http://api.jquery.com/jquery.extend/), and compatible implementations.

## Why Use It

### TLDR

If you or someone else on your team (despite being utterly brilliant, knowledgeable, and near-perfect) sometimes gets confused by the signature of _.extend() / $.extend() and accidentally modifies a source object rather than the destination object.

### The full, wildly exciting details

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
var HerbivorousDinosaurWeAreNotTooAfraidOf = _.extend(Model.Dinosaur, {
    fillGapsWithIffyFrogDNASequence: true
});
```

Here, the goal was clearly to create a subset of `Dinosaur` with the specified `fillGapsWithIffyFrogDNASequence` property defined on it, but we inadvertently modified the Dinosaur itself and are in for a nasty surprise.

The [rules](docs/rules) added by this plugin allow you to catch this kind of dumb use of `_.extend` early on, hopefully preventing the need for a lot of future debugging and reducing the number of lawsuits aimed at your live dinosaur theme park.


## Getting Started

Documentation for each rule can be found in [docs/rules](docs/rules).



## Further Reading

* http://api.jquery.com/jquery.extend/


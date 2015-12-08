# JS Immutability Helper for merging objects

See https://facebook.github.io/react/docs/update.html for the backstory on why this is helpful.


## Why?

The `update()` function from React can be really helpful when dealing with immutable state trees in Redux. I found the syntax of mongo style `$` prefixed operation keys to be confusing though and thought there must be a better way.

You can think of this library as very similar to React's `update()` but the only possible transform is `$apply`. Wherever you need a computed value, you provide a function instead and that function will be called with the current value at that point in the state tree, the function's return value becomes the new value placed back into the state tree. Simple but powerful and composable.


## The API

    // import the package
    import transform from 'immutable-transform'

    // apply some changes to a state...
    transform(state, changes)

    // if you only pass one argument then is is assumed to be changes and you get a curried function back which can be used to apply the changes to a given state...
    transformer = transform(changes)
    transformer(state)


## Examples

Simple value merging...

    const state = {name: 'Andy', age: 30}
    transform(state, {name: 'Josh'})
    // => {name: 'Josh', age: 30}

Updating simple values...

    const state = {name: 'Andy'}
    transform(state, {
      name: (name) => name + ' Kent'
    })
    // => {name: 'Andy Kent'}

A counter implementation...

    const state = {count: 0}
    const increment = transform({count: (n) => n + 1})
    increment(state)
    increment(state)
    // => {count: 2}

Updating arrays...
_the mutation here looks scary but modifiers always receive a shallow clone of the value so mutations are 'safe'_

    const state = {people: ['Andy', 'Ashley']}
    transform(state, {
      people: (people) => people.splice(0, 1)
    })
    // => {people: ['Andy']}

Updating nested objects...

    const state = {name: {first: 'Andy', last: 'Kent'}}
    transform(state, {
      name: {
        first: 'Gareth',
        last: (old) => old.replace(/K/, 'L')
      }
    })
    // => {name: {first: 'Gareth', last: 'Lent'}}

Using currying for applying nested transforms...

    const state = {person: {name: {first: 'Andy', last: 'Kent'}}}
    transform(state, {
      person: {
        name: transform({first: 'Nick'})
        email: 'nick@example.com'
    })
    // => {person: {name: {first: 'Nick', last: 'Kent'}, email: 'nick@example.com'}}



## Pro Mode

**OK so that's nice and all but now things get awesome!**

There are some optional helper functions that make common operations much clearer.

For example, adding to a list...

    import transform, { push } from 'immutable-transform'

    const state = {people: ['Andy']}
    transform(state, {
      people: push('Ashley')
    })
    // => {people: ['Andy', 'Ashley']}

removing a key...

    import transform, { remove } from 'immutable-transform'

    const state = {people: {andy: 'Andy Kent', ashley: 'Ashley St Pier'}}
    transform(state, {
      people: remove('ashley')
    })
    // => {people: {andy: 'Andy Kent'}}

inserting a key/value...

    import transform, { insert } from 'immutable-transform'

    const state = {people: {andy: 'Andy Kent'}}
    transform(state, {
      people: insert('ashley', 'Ashley St Pier')
    })
    // => {people: {andy: 'Andy Kent', ashley: 'Ashley St Pier'}}
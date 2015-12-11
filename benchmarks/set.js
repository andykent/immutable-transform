/* global add */

var transform = require('../lib/index').default
var set = require('../lib/index').set
var update = require('react-addons-update')

add('immutable-transform', function () {
  const source = {nested: {test: {foo: 'bar'}}}
  const changes = {nested: {test: set({yin: 'yan'})}}
  transform(source, changes)
})

add('react-addons-update', function () {
  const source = {nested: {test: {foo: 'bar'}}}
  const changes = {nested: {test: {$set: {yin: 'yan'}}}}
  update(source, changes)
})

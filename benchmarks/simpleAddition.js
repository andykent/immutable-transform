/* global add */

var transform = require('../lib/index').default
var update = require('react-addons-update')

add('immutable-transform', function () {
  const source = {nested: {test: 1}}
  const changes = {nested: {test: (old) => old + 1}}
  transform(source, changes)
})

add('react-addons-update', function () {
  const source = {nested: {test: 1}}
  const changes = {nested: {test: {$apply: (old) => old + 1}}}
  update(source, changes)
})

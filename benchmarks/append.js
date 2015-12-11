/* global add */

var transform = require('../lib/index').default
var push = require('../lib/index').push
var update = require('react-addons-update')

add('immutable-transform', function () {
  const source = {nested: {test: [1, 2, 3]}}
  const changes = {nested: {test: push(4)}}
  transform(source, changes)
})

add('react-addons-update', function () {
  const source = {nested: {test: [1, 2, 3]}}
  const changes = {nested: {test: {$push: [4]}}}
  update(source, changes)
})

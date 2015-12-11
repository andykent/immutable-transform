/* global add */

var transform = require('../lib/index').default
var update = require('react-addons-update')

const source = {
  todos: {
    todo1: {
      title: 'optimize things',
      completed: false,
      completedBy: null,
      tags: [0]
    },
    todo2: {
      title: 'add tests',
      completed: true,
      completedBy: 'sunny',
      tags: [1, 2]
    },
    todo3: {
      title: 'write code',
      completed: true,
      completedBy: 'andy',
      tags: [1, 2]
    }
  },

  people: {
    andy: {
      name: {
        first: 'Andy',
        last: 'Kent'
      },
      email: 'andy@example.com'
    },
    sunny: {
      name: {
        first: 'Andy',
        last: 'Kent'
      },
      email: 'andy@example.com'
    }
  },

  tags: [ 'priority', 'assigned', 'code' ]
}

add('immutable-transform', function () {
  const changes = {
    todos: {
      todo4: {
        title: 'new task',
        completed: false,
        completedBy: null,
        tags: []
      }
    }
  }
  transform(source, changes)
})

add('react-addons-update', function () {
  const changes = {
    todos: {
      $merge: {
        todo4: {
          title: 'new task',
          completed: false,
          completedBy: null,
          tags: []
        }
      }
    }
  }
  update(source, changes)
})

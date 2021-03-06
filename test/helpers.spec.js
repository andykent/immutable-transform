import expect from 'unexpected'

import { push, remove, insert, set } from '../src/index'

describe('push()', () => {
  it('pushes onto an array', () => {
    const pusher = push(2)
    expect(pusher([1]), 'to equal', [1, 2])
  })

  it('pushes multiple arguments onto an array', () => {
    const pusher = push(2, 3, 4)
    expect(pusher([1]), 'to equal', [1, 2, 3, 4])
  })
})

describe('remove()', () => {
  it('removes a key from an array', () => {
    const remover = remove('bar')
    expect(remover({foo: 1, bar: 2}), 'to equal', {foo: 1})
  })
})

describe('insert()', () => {
  it('adds a key/value to an object', () => {
    const inserter = insert('bar', 2)
    expect(inserter({foo: 1}), 'to equal', {foo: 1, bar: 2})
  })
})

describe('set()', () => {
  it('completly replaces the object', () => {
    const setter = set(['a'])
    expect(setter([1]), 'to equal', ['a'])
  })
})

import expect from 'unexpected'

import transform from '../src/index'

describe('transform()', () => {
  it('returns the source object when the merged object has no changes', () => {
    const source = {test: 1}
    const changes = {}
    const result = transform(source, changes)
    expect(result, 'to be', source)
  })

  it('returns a curried function when only one argument is given', () => {
    const source = {test: 1}
    const changes = {test: 2}
    const updater = transform(changes)
    const result = updater(source)
    expect(result, 'to equal', {test: 2})
  })

  describe('root level object changes', () => {
    it('returns the source object merged with change when the changes are non-function values', () => {
      const source = {test: 1}
      const changes = {test: 2, foo: 'bar', list: [1, 2]}
      const result = transform(source, changes)
      expect(result, 'to equal', {
        test: 2,
        foo: 'bar',
        list: [1, 2]
      })
    })

    it('calls functions and inserts their return value into the result', () => {
      const source = {test: 1}
      const changes = {test: () => 2}
      const result = transform(source, changes)
      expect(result, 'to equal', { test: 2 })
    })

    it('calls functions and passes the old value as an argument', () => {
      const source = {test: 1}
      const changes = {test: (old) => old + 1}
      const result = transform(source, changes)
      expect(result, 'to equal', { test: 2 })
    })

    it('shallow clones the original value when passing old values in', () => {
      var old
      const source = {test: {cloneMe: true}}
      const changes = {test: (x) => old = x}
      transform(source, changes)
      expect(old, 'not to be', source.test)
    })

    it("calls a function if it's the root level change", () => {
      const source = {}
      const changes = (x) => {
        x['foo'] = 1
        return x
      }
      const result = transform(source, changes)
      expect(result, 'to equal', {foo: 1})
    })
  })

  describe('root level array changes', () => {
    it('returns the source array merged with change when the changes are non-function values', () => {
      const source = [{test: 1}]
      const changes = {0: {test: 2, foo: 'bar', list: [1, 2]}}
      const result = transform(source, changes)
      expect(source, 'not to be', result)
      expect(source[0], 'not to be', result[0])
      expect(result, 'to equal', [{
        test: 2,
        foo: 'bar',
        list: [1, 2]
      }])
    })

    it('calls functions and inserts their return value into the result', () => {
      const source = [{test: 1}]
      const changes = {0: {test: (v) => v + 1}}
      const result = transform(source, changes)
      expect(result, 'to equal', [{ test: 2 }])
    })
  })

  describe('nested changes', () => {
    it('returns the source object merged with change when the changes are non-function values', () => {
      const source = {nested: {test: 1, notUpdated: 'same'}}
      const changes = {nested: {test: 2, foo: 'bar', list: [1, 2]}}
      const result = transform(source, changes)
      expect(result, 'to equal', {
        nested: {
          test: 2,
          foo: 'bar',
          list: [1, 2],
          notUpdated: 'same'
        }
      })
    })

    it('calls functions and inserts their return value into the result', () => {
      const source = {nested: {test: 1}}
      const changes = {nested: {test: () => 2}}
      const result = transform(source, changes)
      expect(result, 'to equal', {nested: { test: 2 }})
    })

    it('calls functions and passes the old value as an argument', () => {
      const source = {nested: {test: 1}}
      const changes = {nested: {test: (old) => old + 1}}
      const result = transform(source, changes)
      expect(result, 'to equal', {nested: { test: 2 }})
    })
  })
})

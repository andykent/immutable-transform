function shallowCopy (x) {
  if (Array.isArray(x)) return x.concat()
  if (x && typeof x === 'object') return Object.assign(new x.constructor(), x)
  return x
}

function computeChange (change, source) {
  switch (typeof change) {
    case 'function':
      if (change.length === 0) return change()
      return change(shallowCopy(source))
    case 'object':
      return computeChanges(change, source)
    default:
      return change
  }
}

function computeChanges (changes, source) {
  if (typeof source !== 'object') return changes
  if (typeof changes !== 'object') return source
  let newSource = shallowCopy(source)
  for (var key in changes) {
    newSource[key] = computeChange(changes[key], source[key])
  }
  return newSource
}

export default function update (source, changes) {
  if (arguments.length === 1) return (s) => update(s, source)
  if (typeof changes === 'object' && Object.keys(changes).length === 0) return source
  return computeChange(changes, source)
}

export function push (...values) {
  return (x) => {
    x.push(...values)
    return x
  }
}

export function remove (key) {
  return (x) => {
    delete x[key]
    return x
  }
}

export function insert (key, value) {
  return (x) => {
    x[key] = value
    return x
  }
}

export function set (value) {
  return () => value
}

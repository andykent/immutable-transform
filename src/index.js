function union (a, b) {
  return a.concat(b.filter((item) => a.indexOf(item) < 0))
}

function computeChange (change, source) {
  switch (typeof change) {
    case 'function':
      const oldValue = (typeof source === 'object' ? Object.assign({}, source) : source)
      const newValue = change.length === 0 ? change() : change(oldValue)
      return newValue
    case 'object':
      return computeChanges(change, source)
    default:
      return change
  }
}

function computeChanges (changes, source) {
  if (typeof source !== 'object') return changes
  if (typeof changes !== 'object') return source
  const keys = union(Object.keys(source), Object.keys(changes))
  return keys.reduce((s, key) => {
    const value = source[key]
    const change = changes[key]
    if (change === undefined) {
      s[key] = value
    } else {
      s[key] = computeChange(change, value)
    }
    return s
  }, {})
}

export default function update (source, changes) {
  if (arguments.length === 1) return (s) => update(s, source)
  if (typeof changes === 'object' && Object.keys(changes).length === 0) return source
  return computeChange(changes, source)
}

export function push (value) {
  return (x) => {
    x.push(value)
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

const stack = []
const EMPTY_CHILDREN = []

export function h(tag, data) {
  let children = EMPTY_CHILDREN
  let lastSimple
  let child
  let simple
  let i
  for (i = arguments.length; i-- > 2; ) {
    stack.push(arguments[i])
  }
  while (stack.length) {
    if ((child = stack.pop()) && child.pop !== undefined) {
      for (i = child.length; i--; ) stack.push(child[i])
    } else {
      if (typeof child === 'boolean') child = null

      // Currently all tag are simple
      if ((simple = typeof tag === 'string')) {
        if (child == null) child = ''
        else if (typeof child === 'number') child = String(child)
        else if (typeof child !== 'string') simple = false
      }

      if (simple && lastSimple) {
        children[children.length - 1] += child
      } else if (children === EMPTY_CHILDREN) {
        children = [child]
      } else {
        children.push(child)
      }

      lastSimple = simple
    }
  }

  return {
    tag,
    data,
    children
  }
}

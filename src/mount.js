import { createElement } from './create-element'

export function mount(node, root) {
  let el

  if (typeof node === 'function') {
    el = createElement(node())
  } else if (typeof node.render === 'function') {
    el = createElement(node.render())
  } else {
    el = createElement(node)
  }

  if (root) {
    root.parentNode.replaceChild(el, root)
  }

  return el
}

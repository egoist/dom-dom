import { createElement } from './create-element'

export { h } from './h'

export function mount(node, root) {
  const el = createElement(node)

  root && root.parentNode.replaceChild(el, root)

  return el
}

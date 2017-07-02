import { createElement } from './create-element'
import { addHooks, runHooks } from './utils'

export function mount(node, root) {
  const hooks = {
    componentWillMount: [],
    componentDidMount: []
  }

  let el

  if (node.render) {
    // Add hooks for root component only
    // Hooks in child components will be added in `createElement`
    addHooks(hooks, node, false)
    el = createElement(node.render(), hooks)
  } else {
    el = createElement(node, hooks)
  }

  if (root) {
    runHooks(hooks, 'componentWillMount')
    root.parentNode.replaceChild(el, root)
    runHooks(hooks, 'componentDidMount')
  }

  return el
}

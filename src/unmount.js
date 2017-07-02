import { runHooks, addHooks } from './utils'

export function unmount(node, root) {
  const hooks = {
    componentWillUnmount: []
  }

  addHooks(hooks, node)
  runHooks(hooks, 'componentWillUnmount')
  root && root.parentNode.removeChild(root)
}

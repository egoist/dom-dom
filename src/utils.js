export function setClassName(el, className) {
  if (typeof className === 'string') {
    el.className = className
  } else if (Array.isArray(className)) {
    el.className = className.join(' ')
  } else if (typeof className === 'object') {
    el.className = Object.keys(className)
      .filter(name => className[name])
      .join(' ')
  }
}

// Copied from Preact
const IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i

export function setStyle(el, style) {
  if (typeof style === 'string') {
    el.setAttribute('style', style)
  }

  if (typeof style === 'object') {
    for (const key in style) {
      const value = style[key]
      if (typeof value === 'number' && !IS_NON_DIMENSIONAL.test(key)) {
        el.style[key] = `${value}px`
      } else {
        el.style[key] = value
      }
    }
  }
}

export function recordLicecycleHooks(hooks, component) {
  for (const key in component) {
    if (hooks[key]) {
      hooks[key].push(component[key].bind(component))
    }
  }
}

export function runHooks(hooks, name) {
  for (const hook of hooks[name]) {
    hook()
  }
}

export function addHooks(hooks, component, deep = true) {
  if (component.render) {
    recordLicecycleHooks(hooks, component)
    const node = component.render(component)
    if (deep && node && node.children) {
      for (const child of node.children) {
        addHooks(hooks, child)
      }
    }
  }
}

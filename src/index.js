import { setClassName, setStyle, isSVG } from './utils'

export function h(tag, attrs, ...children) {
  const el = isSVG(tag)
    ? document.createElementNS('http://www.w3.org/2000/svg', tag)
    : document.createElement(tag)

  if (attrs) {
    for (const key in attrs) {
      const value = attrs[key]

      // Ignore `key`
      if (key === 'key') {
        continue
      }

      if (key === 'class' || key === 'className') {
        setClassName(el, value)
      } else if (key === 'style') {
        setStyle(el, value)
      } else if (key === 'dangerouslySetInnerHTML') {
        if (value && value.__html) {
          el.innerHTML = value.__html
        }
      } else if (key.slice(0, 2) === 'on') {
        el.addEventListener(key.slice(2).toLocaleLowerCase(), value)
      } else {
        el.setAttribute(key, value)
      }
    }
  }

  for (const child of children) {
    if (child instanceof Element) {
      el.appendChild(child.cloneNode(true))
    } else if (typeof child === 'boolean' || child === null) {
      el.appendChild('')
    } else {
      // TODO: group multiple sibling text nodes into a single node
      el.appendChild(document.createTextNode(String(child)))
    }
  }

  return el
}

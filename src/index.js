import { setClassName, setStyle } from './utils'

let isSvgMode = false

function createElement({ tag, data, children }) {
  const prevSvgMode = isSvgMode

  isSvgMode = tag === 'svg' ? true : tag === 'foreignObject' ? false : isSvgMode

  const el = isSvgMode
    ? document.createElementNS('http://www.w3.org/2000/svg', tag)
    : document.createElement(tag)

  if (data) {
    for (const key in data) {
      const value = data[key]

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
      } else if (key.substring(0, 2) === 'on') {
        el.addEventListener(key.substring(2).toLocaleLowerCase(), value)
      } else {
        el.setAttribute(key, value)
      }
    }
  }

  for (const child of children) {
    if (typeof child === 'object') {
      el.appendChild(createElement(child))
    } else if (child instanceof Element) {
      el.appendChild(child.cloneNode(true))
    } else {
      el.appendChild(document.createTextNode(child))
    }
  }

  // restore previous SVG mode: (in case we're exiting an SVG namespace)
  isSvgMode = prevSvgMode

  return el
}

export function mount(node, mountTo) {
  const el = createElement(node)
  mountTo && mountTo.appendChild(el)
  return el
}

export { h } from './h'

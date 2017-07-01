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
      if (typeof value === 'number' && !IS_NON_DIMENSIONAL.test(value)) {
        el.style[key] = `${style[key]}px`
      } else {
        el.style[key] = value
      }
    }
  }
}

const svgTags = [
  'animate',
  'circle',
  'defs',
  'ellipse',
  'g',
  'line',
  'linearGradient',
  'mask',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'stop',
  'svg',
  'text',
  'tspan'
]

export function isSVG(tagName) {
  return svgTags.indexOf(tagName) >= 0
}

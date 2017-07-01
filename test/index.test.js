import { spy } from 'sinon'
// eslint-disable-next-line no-unused-vars
import { h } from '../src'

describe('basic', () => {
  it('has empty content', () => {
    const el = <div />

    expect(el.outerHTML).toBe('<div></div>')
  })

  it('has attr', () => {
    const el = <div class="foo" id="bar" />
    expect(el.outerHTML).toBe('<div class="foo" id="bar"></div>')
  })
})

describe('children', () => {
  it('has text node', () => {
    const el = (
      <div>
        hello <span>123</span> world
      </div>
    )
    expect(el.outerHTML).toBe('<div>hello <span>123</span> world</div>')
  })
})

describe('className', () => {
  it('allows both class and className', () => {
    const el = (
      <div class="foo">
        <span className="bar" />
      </div>
    )

    expect(el.outerHTML).toBe(
      '<div class="foo"><span class="bar"></span></div>'
    )
  })

  it('allows array', () => {
    const el = <div class={['foo', 'bar']} />

    expect(el.outerHTML).toBe('<div class="foo bar"></div>')
  })

  it('allows object', () => {
    const el = <div class={{ foo: true, bar: false }} />

    expect(el.outerHTML).toBe('<div class="foo"></div>')
  })
})

describe('style', () => {
  it('allows string', () => {
    const el = <div style="color: red" />

    expect(el.outerHTML).toBe('<div style="color: red"></div>')
  })

  it('allows object', () => {
    const el = (
      <div
        style={{ color: 'red', fontSize: '14px', 'background-color': 'blue' }}
      />
    )

    expect(el.outerHTML).toBe(
      '<div style="color: red; font-size: 14px; background-color: blue;"></div>'
    )
  })

  it('sets default unit for number value', () => {
    const el = <div style={{ height: 40 }} />

    expect(el.outerHTML).toBe('<div style="height: 40px;"></div>')
  })
})

describe('event', () => {
  it('add click event', () => {
    const handleClick = spy()

    const el = <div onClick={handleClick} />
    el.dispatchEvent(new MouseEvent('click'))

    expect(handleClick.calledOnce).toBe(true)
  })
})

describe('svg', () => {
  it('renders', () => {
    spy(document, 'createElementNS')

    const el = (
      <svg>
        <text x="20" y="20">
          Test
        </text>
      </svg>
    )

    expect(document.createElementNS.calledTwice).toBe(true)
    expect(el.outerHTML).toBe('<svg><text x="20" y="20">Test</text></svg>')

    const xmlns = 'http://www.w3.org/2000/svg'
    expect(document.createElementNS.firstCall.args).toEqual([xmlns, 'text'])
    expect(document.createElementNS.secondCall.args).toEqual([xmlns, 'svg'])
  })
})

describe('xss', () => {
  it('escapes', () => {
    const el = (
      <div>
        {'<script>alert();</script>'}
      </div>
    )

    expect(el.outerHTML).toBe(
      '<div>&lt;script&gt;alert();&lt;/script&gt;</div>'
    )
  })
})

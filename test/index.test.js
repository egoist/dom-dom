import { spy } from 'sinon'
// eslint-disable-next-line no-unused-vars
import { h, mount, unmount } from '../src'

describe('basic', () => {
  it('has empty content', () => {
    const el = mount(<div />)

    expect(el.outerHTML).toBe('<div></div>')
  })

  it('has attr', () => {
    const el = mount(<div class="foo" id="bar" />)
    expect(el.outerHTML).toBe('<div class="foo" id="bar"></div>')
  })
})

describe('children', () => {
  it('has text node', () => {
    const el = mount(
      <div>
        hello <span>123</span> world
      </div>
    )
    expect(el.outerHTML).toBe('<div>hello <span>123</span> world</div>')
  })
})

describe('className', () => {
  it('allows both class and className', () => {
    const el = mount(
      <div class="foo">
        <span className="bar" />
      </div>
    )

    expect(el.outerHTML).toBe(
      '<div class="foo"><span class="bar"></span></div>'
    )
  })

  it('allows array', () => {
    const el = mount(<div class={['foo', 'bar']} />)

    expect(el.outerHTML).toBe('<div class="foo bar"></div>')
  })

  it('allows object', () => {
    const el = mount(<div class={{ foo: true, bar: false }} />)

    expect(el.outerHTML).toBe('<div class="foo"></div>')
  })
})

describe('style', () => {
  it('allows string', () => {
    const el = mount(<div style="color: red" />)

    expect(el.outerHTML).toBe('<div style="color: red"></div>')
  })

  it('allows object', () => {
    const el = mount(
      <div
        style={{ color: 'red', fontSize: '14px', 'background-color': 'blue' }}
      />
    )

    expect(el.outerHTML).toBe(
      '<div style="color: red; font-size: 14px; background-color: blue;"></div>'
    )
  })

  it('sets default unit for number value', () => {
    const el = mount(<div style={{ height: 40 }} />)

    expect(el.outerHTML).toBe('<div style="height: 40px;"></div>')
  })
})

describe('event', () => {
  it('add click event', () => {
    const handleClick = spy()

    const el = mount(<div onClick={handleClick} />)
    el.dispatchEvent(new MouseEvent('click'))

    expect(handleClick.calledOnce).toBe(true)
  })
})

describe('svg', () => {
  it('renders', () => {
    spy(document, 'createElementNS')

    const el = mount(
      <svg>
        <text x="20" y="20">
          Test
        </text>
      </svg>
    )

    expect(document.createElementNS.calledTwice).toBe(true)
    expect(el.outerHTML).toBe('<svg><text x="20" y="20">Test</text></svg>')

    const xmlns = 'http://www.w3.org/2000/svg'
    expect(document.createElementNS.firstCall.args).toEqual([xmlns, 'svg'])
    expect(document.createElementNS.secondCall.args).toEqual([xmlns, 'text'])

    // Reset svg mode
    mount(<div />)
    expect(document.createElementNS.calledTwice).toBe(true)
  })
})

describe('xss', () => {
  it('escapes', () => {
    const el = mount(
      <div>
        {'<script>alert();</script>'}
      </div>
    )

    expect(el.outerHTML).toBe(
      '<div>&lt;script&gt;alert();&lt;/script&gt;</div>'
    )
  })
})

describe('mount', () => {
  it('mounts to dom', () => {
    document.body.innerHTML = '<div id="root"></div>'

    mount(<div>hi</div>, document.getElementById('root'))
    expect(document.body.innerHTML).toBe('<div>hi</div>')
  })
})

describe('lifecycle', () => {
  it('mounts and root is component', () => {
    document.body.innerHTML = '<div id="root"></div>'
    let called = false

    const child = {
      render() {
        return <span>hi</span>
      },
      componentDidMount() {
        called = true
      }
    }

    const root = {
      render() {
        return (
          <div>
            {child}
          </div>
        )
      }
    }

    mount(root, document.getElementById('root'))
    expect(document.body.innerHTML).toBe('<div><span>hi</span></div>')
    expect(called).toBe(true)
  })

  it('mounts and root is not component', () => {
    document.body.innerHTML = '<div id="root"></div>'
    let called = false

    const child = {
      render() {
        return <span>hi</span>
      },
      componentDidMount() {
        called = true
      }
    }

    const root = (
      <div>
        {child}
      </div>
    )

    mount(root, document.getElementById('root'))
    expect(document.body.innerHTML).toBe('<div><span>hi</span></div>')
    expect(called).toBe(true)
  })

  it('mounts class instance', () => {
    document.body.innerHTML = '<div id="root"></div>'
    let called = false

    const Child = class {
      render() {
        return <span>hi</span>
      }
      componentDidMount() {
        called = true
      }
    }

    const Root = class {
      render() {
        return (
          <div>
            {new Child()}
          </div>
        )
      }
    }

    mount(new Root(), document.getElementById('root'))
    expect(document.body.innerHTML).toBe('<div><span>hi</span></div>')
    expect(called).toBe(true)
  })

  it('unmounts', () => {
    document.body.innerHTML = '<div id="root"></div>'
    let called = false

    const app = {
      render() {
        return <div>app</div>
      },
      componentWillUnmount() {
        called = true
      }
    }

    const root = mount(app, document.getElementById('root'))
    unmount(app, root)
    expect(called).toBe(true)
  })
})

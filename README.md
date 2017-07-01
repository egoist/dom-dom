# dom-dom

[![NPM version](https://img.shields.io/npm/v/dom-dom.svg?style=flat)](https://npmjs.com/package/dom-dom) [![NPM downloads](https://img.shields.io/npm/dm/dom-dom.svg?style=flat)](https://npmjs.com/package/dom-dom) [![CircleCI](https://circleci.com/gh/egoist/dom-dom/tree/master.svg?style=shield&circle-token=1b6201de2b133f5b995fe2730a24b497768d85c6)](https://circleci.com/gh/egoist/dom-dom/tree/master)  [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate)

## Features

- [x] Insanely small: 1.4kB minified
- [x] No API: JSX is transformed to actual DOM under the hood
- [x] SVG support
- [x] Protection from XSS injections
- [x] Automatically joining classNames, styles

## Install

```bash
yarn add dom-dom
```

## Usage

With `babel-plugin-transform-react-jsx`:

```js
/* @jsx h */
import { h } from 'dom-dom'

document.body.appendChild(
  <h1 style={{fontSize: 20}}>Hello World!</h1>
)
```

### className

`className` can be `string` `Array` or `Object`:

```js
<div className="foo"></div>
<div className={['foo', 'bar']}></div>
<div className={{foo: false, [`bar-${index}`]: true}}></div>
```

You can also directly use `class` instead of react-specific `className` as you please:

```js
<div class="foo"></div>
```

### style

`style` supports `string` and `Object`:

```js
<div style="color: red"></div>
// both kebab-case and camelCase are supported here
// default unit is `px`
<div style={{ fontSize: 14, 'background-color': 'red' }}></div>
```

### innerHTML

```js
<div dangerouslySetInnerHTML={{__html: '<strong>hey</strong>'}}></div>
```

### Events

React-like events are supports:

```js
<button onClick={handleClick}></button>
```

## Prior Art

This project is heavily inspired by [dom-chef](https://github.com/vadimdemedes/dom-chef).

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**dom-dom** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/dom-dom/contributors)).

> [egoistian.com](https://egoistian.com) · GitHub [@egoist](https://github.com/egoist) · Twitter [@rem_rin_rin](https://twitter.com/rem_rin_rin)

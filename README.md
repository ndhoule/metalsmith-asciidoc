# metalsmith-asciidoc

A Metalsmith plugin to convert asciidoc files.


## Installation

```sh
$ npm install metalsmith-asciidoc
```


## CLI Usage

Install via `npm`, then add `metalsmith-asciidoc` key to your `metalsmith.json` plugins section:

```json
{
  "plugins": {
    "metalsmith-asciidoc": {}
  }
}
```


## API Usage

Install via `npm` and require `metalsmith-asciidoc`, then pass to Metalsmith using the `use` method:

```js
var asciidoc = require('metalsmith-asciidoc');

metalsmith.use(asciidoc());
```

## Development

Clone the repo and install dependencies:

```sh
git clone https://github.com/ndhoule/metalsmith-asciidoc.git
npm install
```

Running tests:

```sh
make test
```


## License

Code copyright 2014 [Nathan Houle](mailto:nathan+github@nathanhoule.com). Released under the [MIT license](LICENSE.md).

# LiterateJS

LiterateJS is essentially a [Markdown](
http://daringfireball.net/projects/markdown/) code block extractor for NodeJS.
Its main use case is extraction of code for literate programming for
single-file scripts. It is currently not suitable for writing complex projects
in literate style.

LiterateJS is written on top of the [Remarkable](
https://github.com/jonschlinkert/remarkable) Markdown parser.

LiterateJS features are currently quite limited, but it is our intention to
expand it with more JavaScript-specific features in future (e.g., ES6
compilation with [Babel](http://babeljs.io/)).

## Installation

You will need to install NodeJS and NPM. The `literatejs` package is then
installed with:

    npm install literatejs

## Example

To extract the source code from a markdown file, run:

    literatejs FILENAME

This outputs the extracted code to console. If you want to save the file run:

    literatejs FILENAME -o OUTPUT

For example, this README file contains the following code block:

```
console.log('test')
```

Now when you run:

    literatejs README.md

You will get:

    console.log('test')

## API

LiterateJS exposes a simple public API. To use the API, require the
`literatejs` module:

    var literatejs = require('literatejs')

### literatejs.convert(souce)

This function takes a markdown source, and returns the extracted code.

For example:

    var src = [
      '# My example code',
      '',
      '```',
      'console.log("Hello world!")',
      '```'
    ].join('\n')
    literatejs.convert('src')
    // => console.log("Hello world!")

### literatejs.extract(path)

This asynchronous function takes a path to a file, and returns a promise. The
promise callback will be passed the extracted code.

    literatejs.extract('hello.md')
      .then(function (code) {
        console.log(code)
        // => console.log("Hello world!")  
      })

## Fenced vs indented code blocks

Only the fenced code blocks (GitHub-style code-blocks using triple-backticks)
are extracted. If you wish to include code blocks that should not be extracted,
use the indented blocks. Here is an example:

    # My Markdown document

    This code block is not extracted:

        console.log('Where am I?')

    But this one is:

    ```
    console.log('Here we go!')
    ```

## License

LiterateJS is licensed under the MIT license.

Copyright (c) 2016 Hajime Yamasaki Vukelic

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Reporting issues

Please report issues and feature requests to the [issue tracker](
https://github.com/foxbunny/literatejs/issues).

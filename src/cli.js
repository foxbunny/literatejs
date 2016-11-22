#!/usr/bin/env node

var argparse = require('argparse')
var literatejs = require('./literate')

function main() {
  var parser
  var args
  var conversion

  parser = new argparse.ArgumentParser({
    version: '0.0.2',
    addHelp: true,
    description: 'Extract code blocks from markdown documents'
  })

  parser.addArgument(['file'], {
    metavar: 'SOURCE',
    help: 'source markdown file'
  })

  parser.addArgument(['-o'], {
    metavar: 'PATH',
    help: 'output path (default to original filename but with .js extension)'
  })

  args = parser.parseArgs()

  literatejs.extract(args.file)
    .then(function (code) {
      console.log(code)
    })
    .catch(function (err) {
      console.error('Could not write output: ' + err)
    })
}

if (require.main === module) {
  main()
}

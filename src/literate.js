var fs = require('fs')
var path = require('path')
var Remarkable = require('remarkable')

var literatejs = module.exports

var parse = function (txt, onCode) {
  var parser
  // In this code, the parser is only used to extract code blocks.
  onCode = onCode || function () { return '' }
  parser = new Remarkable({highlight: onCode})
  parser.render(txt)
}

var read = literatejs.read = function (p) {
   return new Promise(function (resolve, reject) {
     fs.readFile(p, {encoding: 'utf-8'}, function (err, txt) {
       if (err) {
         reject(err)
       } else {
         resolve(txt)
       }
     })
   })
}

var write = literatejs.write = function (p, txt) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(p, txt, {encoding: 'utf-8'}, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve(p)
      }
    })
  })
}

var collector = function () {
  var collected = [];
  return {
    collect: function (block) {
      collected.push(block)
    },
    collected: function () {
      return collected.concat([]);
    }
  }
}

var firstLine = function (block) {
  return block.split(/\n\r?/g)[0]
}

var convert = literatejs.convert = function (source) {
  var c = collector()
  parse(source, c.collect)
  return c.collected().join('\n')
}

literatejs.extract = function (p) {
  return read(p)
    .then(function (source) {
      return convert(source)
    })
}

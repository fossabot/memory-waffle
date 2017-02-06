
'use strict'

var readline = require('readline')

function resume() {
  this.resume()
  this.prompt()
}

function init(app, pstr) {
  var apptype = typeof app
  if (apptype !== 'object') {
    throw new Error('expected object definition containing functions but got ' + apptype)
  }
  var cmdnames = Object.keys(app)
  cmdnames.forEach(function(cmdname) {
    var cmd = app[cmdname]
    var cmdtype = typeof cmd
    if (cmdtype !== 'function') {
      throw new Error('expected function for ' + cmdname + ' but got ' + cmdtype)
    }
    if (cmd.length === 0) {
      throw new Error('expected callback parameter for ' + cmdname)
    }
  })
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    completer: function(line) {
      var hits = cmdnames.filter(function(c) {
        return c.indexOf(line) === 0
      })
      return [
        (hits.length ? hits : cmdnames),
        line
      ]
    }
  }).on('line', function(line) {

    // the user's function has to resume the interface
    rl.pause()

    var usercmd = line.split(' ')
    if (!(usercmd[0] in app)) {
      console.log('command not found:', usercmd[0])
      return resume.call(rl)
    }
    
    var cmd = app[usercmd[0]]
    var arity = cmd.length - 1
    if (usercmd.length - 1 !== arity) {
      console.log(
        'expected',
        arity,
        'argument(s), got',
        usercmd.length - 1
      )
      return resume.call(rl)
    }
    return cmd.apply(
      // resume the prompt in place of the `done` callback
      cmd, usercmd.slice(1).concat([resume.bind(rl)])
    )
  })
  rl.setPrompt(pstr || '> ')
  return rl.prompt()
}

module.exports = function(app, prompt, start) {
  return typeof start === 'function' ? start(init.bind(init, app, prompt)) : init(app, prompt)
}

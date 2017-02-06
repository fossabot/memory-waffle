
'use strict'

var readline = require('readline')

function resume() {
  this.resume()
  this.prompt()
}

function init(app) {
  if (!(app && 'commands' in app)) {
    throw new Error('provide some commands to run, else there\'s nothing to do!')
  }
  var cmdnames = Object.keys(app.commands)
  cmdnames.forEach(function(cmdname) {
    var cmd = app.commands[cmdname]
    var cmdtype = typeof cmd
    if (cmdtype !== 'function') {
      throw new Error('expected function for ' + cmdname + ' but got ' + cmdtype)
    }
    if (cmd.length < 1) {
      throw new Error('expected callback parameter for ' + cmdname)
    }
  })
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    completer: function(line) {
      var cmds = Object.keys(app.commands)
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
    if (!(usercmd[0] in app.commands)) {
      console.log('command not found:', usercmd[0])
      return resume.call(rl)
    }
    
    var cmd = app.commands[usercmd[0]]
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
  if (app.prompt) rl.setPrompt(app.prompt)
  return rl.prompt()
}

module.exports = function(app, start) {
  return typeof start === 'function' ? start(init.bind(init, app)) : init(app)
}

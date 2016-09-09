
'use strict'

var readline = require('readline')

function resume() {
  this.resume()
  this.prompt()
}

module.exports = function(app, showtime) {

  if (!('commands' in app)) {
    throw 'provide some commands to run, else there\'s nothing to do!'
  }

  var cmdnames = Object.keys(app.commands)

  cmdnames.forEach(function(cmdname) {
    if (typeof app.commands[cmdname].arity !== 'number') {
      throw 'provide the number of arguments for your command'
    }
    if (typeof app.commands[cmdname].body !== 'function') {
      throw 'provide a function for your command'
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
    var command = app.commands[usercmd[0]]

    if (!(usercmd[0] in app.commands)) {
      console.log('command not found:', usercmd[0])
      return resume.call(rl)
    }

    if (usercmd.length - 1 !== command.arity) {
      console.log(
        'expected',
        command.arity,
        'argument(s), got',
        usercmd.length - 1
      )
      return resume.call(rl)
    }

    return command.body.apply(
      command.body, usercmd.slice(1).concat([resume.bind(rl)])
    )
  })

  if (app.prompt) rl.setPrompt(app.prompt)

  return typeof showtime === 'function' ? showtime(rl.prompt.bind(rl)) : rl.prompt()
}

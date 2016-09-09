
var memorywaffle = require('../')

describe('memorywaffle', function() {
  it('should invoke the showtime callback if provided when the interface is ready', function(done) {
    memorywaffle({
      commands: {
        testing: {arity: 0, body: function() {}}
      }
    }, done.bind(done, null))
  })

  it('should throw if the arity of a function is not specified as a number', function(done) {
    try {
      memorywaffle({
        commands: {
          testing: {arity: 'a', body: function() {}}
        }
      })
    } catch (e) {
      done()
    }
  })

  it('should throw if the body of a function is not specified as a function', function(done) {
    try {
      memorywaffle({
        commands: {
          testing: {arity: 0, body: 'a'}
        }
      })
    } catch (e) {
      done()
    }
  })
})

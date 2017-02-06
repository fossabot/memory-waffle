
var mw = require('../')

describe('memorywaffle', function() {
  it('should invoke the start callback if provided when the interface is ready', function(done) {
    mw({
      commands: {
        foo: function(bar) {}
      }
    }, done.bind(done, null))
  })

  it('should throw if no commands have been given', function(done) {
    try {
      mw()
    } catch (e) {
      return done()
    }
    done(new Error('should not have been called')
  })
  
    it('should throw if no parameters are defined in a function', function(done) {
    try {
      mw({commands: {foo: function() {})
    } catch (e) {
      return done()
    }
    done(new Error('should not have been called')
  })

  it('should throw if the body of a function is not specified as a function', function(done) {
    try {
      mw({
        commands: {
          baz: 'qux'
        }
      })
    } catch (e) {
      return done()
    }
    done(new Error('should not have been called'))
  })
})

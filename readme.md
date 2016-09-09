
# memory-waffle

`memorywaffle` accepts a `ready` callback of the signature `function(prompt) {}`. omitting this callback will call [`interface#prompt`](http://devdocs.io/node/readline#readline_rl_prompt_preservecursor) for you.

```javascript
var memorywaffle = require('memory-waffle')

memorywaffle({
  prompt: '$ ',
  commands: {
    testing: {
      arity: 2,
      body: function(a, b, done) {
        console.log(a + b)
        done()
      }
    },
    another: {
      arity: 2,
      body: function(c, d, done) {
        console.log(c * d)
        done()
      }
    }
  }
}, function(prompt) {
  // maybe you need to do something to set up?
  // invoke `prompt` when you're ready to begin
})
```
